/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// BrightTextRichLinesScroll.tsx
// Scroll-driven, line-by-line reveal with snap modes that still animate.

import * as React from "react";
import { chakra, type TextProps, useToken } from "@chakra-ui/react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const MotionSpan = motion(chakra.span);

type Props = {
  text: string; // supports <i>, <b>, <br>
  offset?: [string, string]; // useScroll window, e.g. ["start 85%","end 15%"]
  spread?: number; // frontier softness in LINES
  dimColor?: string;
  brightColor?: string;
  glow?: string;
  italicFontFamily?: string;

  hideUntilStart?: boolean;
  strictHideMode?: "css" | "unmount";

  /** Snap logic that still animates */
  snapMode?: "none" | "enter" | "fully";

  /** snapMode="enter": keep hidden until progress > enterEpsilon, then animate */
  enterEpsilon?: number; // default 0.04 (4% into offset path)
} & Omit<TextProps, "children">;

/* ───────── tokenizer for <i>, <b>, <br> ───────── */

type Node =
  | { type: "text"; value: string }
  | { type: "br" }
  | { type: "i"; children: Node[] }
  | { type: "b"; children: Node[] };

function parseMiniHTML(input: string): Node[] {
  const tagRe = /<(\/?)(i|b|br)\s*>/gi;
  const root: Node[] = [];
  const stack: Array<{ tag: "i" | "b"; children: Node[] }> = [];
  let lastIdx = 0;

  const pushText = (txt: string) => {
    if (!txt) return;
    (stack[stack.length - 1]?.children ?? root).push({
      type: "text",
      value: txt,
    });
  };

  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(input))) {
    const [full, slash, raw] = m;
    const name = raw.toLowerCase() as "i" | "b" | "br";
    pushText(input.slice(lastIdx, m.index));
    lastIdx = m.index + full.length;

    if (name === "br") {
      (stack[stack.length - 1]?.children ?? root).push({ type: "br" });
      continue;
    }
    if (!slash) {
      stack.push({ tag: name, children: [] });
    } else {
      let idx = stack.length - 1;
      while (idx >= 0 && stack[idx].tag !== name) idx--;
      if (idx >= 0) {
        const group = stack.splice(idx)[0];
        (stack[stack.length - 1]?.children ?? root).push({
          type: name,
          children: group.children,
        } as Node);
      }
    }
  }

  pushText(input.slice(lastIdx));
  while (stack.length) {
    const group = stack.pop()!;
    (stack[stack.length - 1]?.children ?? root).push({
      type: group.tag,
      children: group.children,
    } as Node);
  }
  return root;
}

function splitIntoLines(nodes: Node[]): Node[][] {
  const lines: Node[][] = [[]];
  const pushToCurrent = (n: Node) => lines[lines.length - 1].push(n);

  const walk = (n: Node) => {
    if (n.type === "br") {
      lines.push([]);
      return;
    }
    if (n.type === "i" || n.type === "b") {
      const clone: Node = { type: n.type, children: [] } as Node;
      const collected: Node[] = [];
      n.children.forEach((c) => {
        if (c.type === "br") lines.push([]);
        else collected.push(c);
      });
      (clone as any).children = collected;
      pushToCurrent(clone);
      return;
    }
    pushToCurrent(n);
  };

  nodes.forEach(walk);
  return lines;
}

/* ───────── component ───────── */

export default function BrightTextRichLinesScroll({
  text,
  offset = ["start 85%", "end 15%"],
  spread = 0.85,
  dimColor = "whiteAlpha.400",
  brightColor = "whiteAlpha.900",
  glow = "0 0 18px rgba(255,255,255,.18)",
  italicFontFamily,
  hideUntilStart = true,
  strictHideMode = "css",
  snapMode = "none",
  enterEpsilon = 0.04,
  ...textProps
}: Props) {
  const [dimTok, brightTok] = useToken("colors", [dimColor, brightColor]);
  const dim = dimTok ?? dimColor;
  const bright = brightTok ?? brightColor;

  const containerRef = React.useRef<HTMLSpanElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset as any,
  });

  // ── snapMode="fully": detect when element is completely inside the viewport
  const fullStartRef = React.useRef<number | null>(null); // progress at the moment of full visibility
  const [isFully, setIsFully] = React.useState(false);

  React.useEffect(() => {
    if (snapMode !== "fully") return;

    const check = () => {
      const el = containerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const fully = r.top >= 0 && r.bottom <= vh;
      if (fully && !isFully) {
        setIsFully(true);
        if (fullStartRef.current == null) {
          fullStartRef.current = scrollYProgress.get(); // capture the pb where "fully" begins
        }
      } else if (!fully && isFully) {
        setIsFully(false);
      }
    };

    check();
    const onScroll = () => requestAnimationFrame(check);
    const onResize = () => requestAnimationFrame(check);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(() => check());
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [snapMode, isFully, scrollYProgress]);

  // ── Effective progress mapping (still 0..1, but gated by snap mode)
  const effectiveProgress: MotionValue<number> = useTransform(
    scrollYProgress,
    (p) => {
      if (snapMode === "none") {
        // From very start, fully smooth (0..1)
        return p;
      }

      if (snapMode === "enter") {
        // Hidden until p > enterEpsilon, then remap [enterEpsilon..1] -> [0..1]
        if (p <= enterEpsilon) return 0;
        const span = Math.max(1e-6, 1 - enterEpsilon);
        return (p - enterEpsilon) / span;
      }

      // snapMode === "fully"
      const start = fullStartRef.current;
      if (start == null || !isFully) {
        // haven't been fully in view yet → stay hidden
        return 0;
      }
      // Once fully in view, animate with scroll:
      // remap [start..1] -> [0..1], clamped
      if (p <= start) return 0;
      const span = Math.max(1e-6, 1 - start);
      return Math.max(0, Math.min(1, (p - start) / span));
    }
  );

  // Started: once effective progress rises above 0
  const [started, setStarted] = React.useState(false);
  React.useEffect(() => {
    const unsub = effectiveProgress.on("change", (v) => {
      if (!started && v > 0) setStarted(true);
    });
    if (!started && effectiveProgress.get() > 0) setStarted(true);
    return () => unsub();
  }, [effectiveProgress, started]);

  const tree = React.useMemo(() => parseMiniHTML(text), [text]);
  const lines = React.useMemo(() => splitIntoLines(tree), [tree]);
  const total = lines.length;

  const renderInline = (node: Node, key: React.Key): React.ReactNode => {
    if (node.type === "text")
      return <React.Fragment key={key}>{node.value}</React.Fragment>;
    if (node.type === "i" || node.type === "b") {
      const Span = chakra.span;
      return (
        <Span
          key={key}
          fontStyle={node.type === "i" ? "italic" : undefined}
          fontFamily={
            node.type === "i" && italicFontFamily ? italicFontFamily : undefined
          }
          fontWeight={node.type === "b" ? "bold" : undefined}
        >
          {node.children.map((c, i) => renderInline(c, `${key}-${i}`))}
        </Span>
      );
    }
    return null;
  };

  // Hard pre-hide if requested
  if (hideUntilStart && !started && strictHideMode === "unmount") {
    return (
      <chakra.span
        ref={containerRef as any}
        aria-hidden='true'
        {...textProps}
        // @ts-ignore
        sx={{
          whiteSpace: "pre-wrap",
          textRendering: "optimizeLegibility",
          fontKerning: "normal",
          // @ts-ignore
          ...textProps.sx,
        }}
      />
    );
  }

  return (
    <chakra.span
      ref={containerRef as any}
      className={hideUntilStart && !started ? "bt-no-prepaint" : undefined}
      style={
        hideUntilStart && !started
          ? { visibility: "hidden", opacity: 0 }
          : undefined
      }
      {...textProps}
      // @ts-ignore
      sx={{
        whiteSpace: "pre-wrap",
        textRendering: "optimizeLegibility",
        fontKerning: "normal",
        // @ts-ignore
        ...textProps.sx,
      }}
    >
      {lines.map((lineNodes, i) => (
        <AnimatedLine
          key={`line-${i}`}
          index={i}
          total={total}
          progress={effectiveProgress}
          spread={spread}
          dim={dim}
          bright={bright}
          glow={glow}
        >
          {lineNodes.map((n, j) => renderInline(n, `n-${i}-${j}`))}
        </AnimatedLine>
      ))}
    </chakra.span>
  );
}

/* ───────── per-line animation (smooth frontier) ───────── */

function AnimatedLine({
  children,
  index,
  total,
  progress,
  spread,
  dim,
  bright,
  glow,
}: React.PropsWithChildren<{
  index: number;
  total: number;
  progress: MotionValue<number>;
  spread: number;
  dim: string;
  bright: string;
  glow: string;
}>) {
  // frontier measured in lines
  const t = useTransform(progress, (p) => {
    const ahead = p * total - index;
    const w = Math.max(0.25, spread);
    return Math.max(0, Math.min(1, (ahead / w) * 0.5 + 0.5));
  });

  const color = useTransform(t, [0, 1], [dim, bright]);
  const shadow = useTransform(t, (v) => (v > 0.75 ? glow : "none"));

  return (
    <>
      <MotionSpan
        style={{
          color,
          textShadow: shadow,
          display: "inline",
          willChange: "color, text-shadow",
        }}
      >
        {children}
      </MotionSpan>
      <br />
    </>
  );
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// BrightTextRichLines.tsx (strict no-prepaint version)

import * as React from "react";
import { chakra, useToken } from "@chakra-ui/react";
import type { TextProps } from "@chakra-ui/react";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";

const MotionSpan = motion(chakra.span);

type BrightTextRichLinesProps = {
  text: string;
  progress?: MotionValue<number>;
  spread?: number;
  dimColor?: string;
  brightColor?: string;
  glow?: string;
  autoplay?: boolean;
  duration?: number;
  delay?: number;
  hideUntilStart?: boolean;
  loop?: boolean | number;
  yoyo?: boolean;
  italicFontFamily?: string;

  /** "css" = hide via CSS (keeps layout). "unmount" = render nothing until start (no ghosting ever). */
  strictHideMode?: "css" | "unmount";
} & Omit<TextProps, "children">;

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
    const node: Node = { type: "text", value: txt };
    (stack[stack.length - 1]?.children ?? root).push(node);
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

    const closing = !!slash;
    if (!closing) stack.push({ tag: name, children: [] });
    else {
      let idx = stack.length - 1;
      while (idx >= 0 && stack[idx].tag !== name) idx--;
      if (idx >= 0) {
        const group = stack.splice(idx)[0];
        const node: Node = { type: name, children: group.children } as Node;
        (stack[stack.length - 1]?.children ?? root).push(node);
      }
    }
  }

  pushText(input.slice(lastIdx));
  while (stack.length) {
    const group = stack.pop()!;
    const node: Node = { type: group.tag, children: group.children } as Node;
    (stack[stack.length - 1]?.children ?? root).push(node);
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

export function BrightTextRichLines({
  text,
  progress: externalProgress,
  spread = 0.85,
  dimColor = "whiteAlpha.400",
  brightColor = "whiteAlpha.900",
  glow = "0 0 18px rgba(255,255,255,.18)",
  autoplay = true,
  duration = 2.2,
  delay = 0,
  hideUntilStart = true,
  loop = false,
  yoyo = false,
  italicFontFamily,
  strictHideMode = "css",
  ...textProps
}: BrightTextRichLinesProps) {
  const [dimTok, brightTok] = useToken("colors", [dimColor, brightColor]);
  const dim = dimTok ?? dimColor;
  const bright = brightTok ?? brightColor;

  const progress = useMotionValue(0);
  const [started, setStarted] = React.useState<boolean>(false);

  // external progress → mirror and flip started only when it moves
  React.useEffect(() => {
    if (!externalProgress) return;
    const unsub = externalProgress.on("change", (v) => {
      progress.set(v);
      if (!started && v > 0) setStarted(true);
    });
    return () => unsub();
  }, [externalProgress, started, progress]);

  // autoplay path
  React.useEffect(() => {
    if (externalProgress || !autoplay) return;

    const repeats =
      loop === true
        ? Infinity
        : typeof loop === "number"
        ? Math.max(0, loop)
        : 0;

    const controls = animate(progress, yoyo ? [0, 1, 0] : 1, {
      duration,
      delay,
      ease: "easeInOut",
      repeat: repeats,
      repeatType: yoyo ? "mirror" : "loop",
      onPlay: () => setStarted(true),
    });

    return () => controls.stop();
  }, [externalProgress, autoplay, duration, delay, loop, yoyo, progress]);

  const wrapperOpacity = useTransform(progress, () =>
    hideUntilStart && !started ? 0 : 1
  );

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

  // ── STRICT: unmount content entirely until started ──
  if (hideUntilStart && !started && strictHideMode === "unmount") {
    return (
      <chakra.span
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

  // ── CSS mode: keep layout but fully hidden until start ──
  return (
    <chakra.span
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
      <motion.span
        style={{
          opacity: wrapperOpacity,
          visibility: hideUntilStart && !started ? "hidden" : "visible",
        }}
      >
        {lines.map((lineNodes, i) => (
          <AnimatedLine
            key={`line-${i}`}
            index={i}
            total={total}
            progress={progress}
            spread={spread}
            dim={dim}
            bright={bright}
            glow={glow}
          >
            {lineNodes.map((n, j) => renderInline(n, `n-${i}-${j}`))}
          </AnimatedLine>
        ))}
      </motion.span>
    </chakra.span>
  );
}

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

export default BrightTextRichLines;

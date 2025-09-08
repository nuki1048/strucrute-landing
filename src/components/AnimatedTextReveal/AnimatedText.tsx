/* eslint-disable @typescript-eslint/ban-ts-comment */
// BrightTextRich.tsx  (final: zero prepaint + stable hooks)
import * as React from "react";
import { chakra, type TextProps, useToken } from "@chakra-ui/react";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";

const MotionSpan = motion.create(chakra.span);

type BrightTextRichProps = {
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
  reserveLayoutPx?: number;
} & Omit<TextProps, "children">;

type Node =
  | { type: "text"; value: string }
  | { type: "br" }
  | { type: "i"; children: Node[] }
  | { type: "b"; children: Node[] };

function parseMiniHTML(input: string): Node[] {
  const tagRe = /<(\/?)(i|b|br)\s*>/gi,
    root: Node[] = [];
  const stack: Array<{ tag: "i" | "b"; children: Node[] }> = [];
  let lastIdx = 0;
  const pushText = (t: string) => {
    if (t)
      (stack[stack.length - 1]?.children ?? root).push({
        type: "text",
        value: t,
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
    if (!slash) stack.push({ tag: name, children: [] });
    else {
      let i = stack.length - 1;
      while (i >= 0 && stack[i].tag !== name) i--;
      if (i >= 0) {
        const g = stack.splice(i)[0];
        (stack[stack.length - 1]?.children ?? root).push({
          type: name,
          children: g.children,
        } as Node);
      }
    }
  }
  pushText(input.slice(lastIdx));
  while (stack.length) {
    const g = stack.pop()!;
    (stack[stack.length - 1]?.children ?? root).push({
      type: g.tag,
      children: g.children,
    } as Node);
  }
  return root;
}

export default function BrightTextRich({
  text,
  progress: externalProgress,
  spread = 1.6,
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
  reserveLayoutPx,
  ...textProps
}: BrightTextRichProps) {
  const [dimTok, brightTok] = useToken("colors", [dimColor, brightColor]);
  const dim = dimTok ?? dimColor;
  const bright = brightTok ?? brightColor;

  const progress = useMotionValue(0);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    if (!externalProgress) return;
    const unsub = externalProgress.on("change", (v) => {
      progress.set(v);
      if (!started && v > 0) setStarted(true);
    });
    return () => unsub();
  }, [externalProgress, started, progress]);

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

  const wrapperOpacity = useTransform(progress, () => 1);
  const tree = React.useMemo(() => parseMiniHTML(text), [text]);

  const total = React.useMemo(() => {
    const count = (n: Node | Node[]): number =>
      Array.isArray(n)
        ? n.reduce((s, x) => s + count(x), 0)
        : n.type === "text"
        ? Array.from(n.value).filter((ch) => !/\s/.test(ch)).length
        : n.type === "br"
        ? 0
        : count(n.children);
    return count(tree);
  }, [tree]);

  const idxRef = React.useRef(0);
  idxRef.current = 0;

  const renderNode = (node: Node, key: React.Key): React.ReactNode => {
    if (node.type === "br") return <br key={key} />;
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
          {node.children.map((c, i) => renderNode(c, `${key}-${i}`))}
        </Span>
      );
    }
    if (node.type === "text") {
      return Array.from(node.value).map((ch, i) => {
        if (ch === "\n") return <br key={`${key}-br-${i}`} />;
        if (ch === " " || ch === "\t") return " ";
        const idx = idxRef.current++;
        return (
          <AnimatedChar
            key={`${key}-c-${i}`}
            index={idx}
            total={total}
            progress={progress}
            spread={spread}
            dim={dim}
            bright={bright}
            glow={glow}
          >
            {ch}
          </AnimatedChar>
        );
      });
    }
    return null;
  };

  // HARD GATE: nothing renders until `started` (prevents any ghosting)
  if (hideUntilStart && !started) {
    if (reserveLayoutPx) {
      return (
        <chakra.span
          aria-hidden
          {...textProps}
          style={{
            display: "inline-block",
            width: reserveLayoutPx,
            height: reserveLayoutPx,
          }}
        />
      );
    }
    return null;
  }

  return (
    <chakra.span
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
      <motion.span style={{ opacity: wrapperOpacity }}>
        {tree.map((n, i) => renderNode(n, i))}
      </motion.span>
    </chakra.span>
  );
}

function AnimatedChar({
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
  );
}

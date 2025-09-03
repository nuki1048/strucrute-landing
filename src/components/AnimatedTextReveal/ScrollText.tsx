/* eslint-disable @typescript-eslint/ban-ts-comment */
// RevealText.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { chakra, useToken, type HTMLChakraProps } from "@chakra-ui/react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ---------- Motion-enabled Chakra wrappers ---------- */
const MotionSpan = chakra(motion.span);
const MotionDiv = chakra(motion.div);

/* ---------- Types ---------- */
type Token = {
  type: "text" | "br";
  html: string;
  // custom <c> support (from previous step)
  mark?: boolean;
  markId?: string;
  markIndex?: number;
};

export type RevealTextProps = HTMLChakraProps<"div"> & {
  /** You may include <i>, <b>, <em>, <strong>, <br/>, and <c>…</c> inside `text` */
  text: string;
  mode?: "line" | "word" | "letter";
  direction?: "up" | "down" | "left" | "right";
  /** In-view: seconds before group starts */
  delay?: number;
  /** In-view: seconds per item | Scroll: progress window (0..1) per item */
  duration?: number;
  /** In-view: seconds between items | Scroll: progress offset (0..1) between items */
  stagger?: number;
  ease?: any;
  /** false → replay again when re-entering viewport */
  once?: boolean;
  amount?: number;
  trigger?: "inView" | "scroll";
  offset?: [string, string];

  /** Color specific <c>…</c> segments */
  id?: string | number;
  colorText?: string;

  /** NEW: font for <i>/<em> segments */
  italicFontFamily?: string;
};

/* ---------- Tokenizer (preserves <br>, <i>/<b>/<em>/<strong>, and <c>) ---------- */
function tokenizeHtml(html: string, mode: "line" | "word" | "letter"): Token[] {
  const withBreaks = html.replace(/<br\s*\/?>/gi, "\n");
  const container = document.createElement("div");
  container.innerHTML = withBreaks;

  const base: Token[] = [];
  let cOrder = 0;

  const walk = (
    node: Node,
    active: { i: boolean; b: boolean; c: boolean; cId?: string; cIdx?: number }
  ) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const raw = node.nodeValue || "";
      const parts = raw.split("\n");
      const pushText = (text: string) => {
        let inner = text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        if (active.i) inner = `<i>${inner}</i>`;
        if (active.b) inner = `<b>${inner}</b>`;
        base.push({
          type: "text",
          html: inner,
          mark: active.c || undefined,
          markId: active.c ? active.cId : undefined,
          markIndex: active.c ? active.cIdx : undefined,
        });
      };
      parts.forEach((p, i) => {
        if (p.length) pushText(p);
        if (i < parts.length - 1) base.push({ type: "br", html: "" });
      });
      return;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      const tag = el.tagName.toLowerCase();
      if (tag === "br") {
        base.push({ type: "br", html: "" });
        return;
      }
      const next = { ...active };
      if (tag === "i" || tag === "em") next.i = true;
      if (tag === "b" || tag === "strong") next.b = true;
      if (tag === "c") {
        next.c = true;
        next.cId = el.getAttribute("id") ?? undefined;
        next.cIdx = ++cOrder;
      }
      for (let c = el.firstChild; c; c = c.nextSibling) walk(c, next);
    }
  };

  for (let c = container.firstChild; c; c = c.nextSibling)
    walk(c, { i: false, b: false, c: false });

  if (mode === "line") {
    const out: Token[] = [];
    let bufHtml: string[] = [];
    let bufMark = false;
    let bufMarkId: string | undefined;
    let bufMarkIdx: number | undefined;
    const flush = () => {
      if (!bufHtml.length) return;
      out.push({
        type: "text",
        html: bufHtml.join(" "),
        mark: bufMark || undefined,
        markId: bufMarkId,
        markIndex: bufMarkIdx,
      });
      bufHtml = [];
      bufMark = false;
      bufMarkId = undefined;
      bufMarkIdx = undefined;
    };
    base.forEach((t) => {
      if (t.type === "br") flush();
      else {
        bufHtml.push(t.html);
        if (t.mark) {
          bufMark = true;
          bufMarkId ??= t.markId;
          bufMarkIdx ??= t.markIndex;
        }
      }
    });
    flush();
    return out;
  }

  if (mode === "word") {
    const out: Token[] = [];
    base.forEach((t) => {
      if (t.type === "br") {
        out.push(t);
        return;
      }
      const hasI = /<i>/.test(t.html);
      const hasB = /<b>/.test(t.html);
      const plain = t.html.replace(/<\/?(i|b)>/g, "");
      plain.split(/\s+/).forEach((w) => {
        if (!w) return;
        let h = w;
        if (hasI) h = `<i>${h}</i>`;
        if (hasB) h = `<b>${h}</b>`;
        out.push({
          type: "text",
          html: h,
          mark: t.mark,
          markId: t.markId,
          markIndex: t.markIndex,
        });
      });
    });
    return out;
  }

  // letter
  const out: Token[] = [];
  base.forEach((t) => {
    if (t.type === "br") {
      out.push(t);
      return;
    }
    const hasI = /<i>/.test(t.html);
    const hasB = /<b>/.test(t.html);
    const plain = t.html.replace(/<\/?(i|b)>/g, "");
    for (let i = 0; i < plain.length; i++) {
      const ch = plain[i];
      let h = ch === " " ? "&nbsp;" : ch;
      if (hasI) h = `<i>${h}</i>`;
      if (hasB) h = `<b>${h}</b>`;
      out.push({
        type: "text",
        html: h,
        mark: t.mark,
        markId: t.markId,
        markIndex: t.markIndex,
      });
    }
  });
  return out;
}

/* ---------- Scroll item (keeps hooks order) ---------- */
const ScrollItem: React.FC<{
  index: number;
  axis: "x" | "y";
  from: number;
  progress: MotionValue<number>;
  staggerProg: number;
  durProg: number;
  children: React.ReactNode;
}> = ({ index, axis, from, progress, staggerProg, durProg, children }) => {
  const start = Math.max(0, index * staggerProg);
  const end = Math.min(1, start + durProg);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const translate = useTransform(opacity, (v) => (1 - v) * from);
  return (
    <MotionSpan
      style={{ opacity, [axis]: translate } as any}
      display='inline-block'
      aria-hidden='true'
    >
      {children}
    </MotionSpan>
  );
};

/* ---------- Root component ---------- */
export const RevealText: React.FC<RevealTextProps> = ({
  text,
  mode = "word",
  direction = "up",
  delay = 0,
  duration = 0.6,
  stagger = 0.06,
  ease = [0.22, 1, 0.36, 1],
  once = false, // replay on re-entry
  amount = 0.4,
  trigger = "inView",
  offset = ["start 0.9", "end 0.1"],
  colorText,
  id,
  italicFontFamily, // <-- NEW
  className,
  ...chakraProps
}) => {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(rootRef, { amount, once });
  const newTextColor = useToken("colors", colorText ?? "");
  const [tokens, setTokens] = React.useState<Token[]>([]);
  React.useEffect(() => {
    setTokens(tokenizeHtml(text, mode));
  }, [text, mode]);

  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const from = direction === "up" || direction === "left" ? 20 : -20;

  // @ts-ignore
  const { scrollYProgress } = useScroll({ target: rootRef, offset });

  const shouldColor = (t: Token) => {
    if (!t.mark || !colorText) return false;
    if (id == null) return true;
    if (typeof id === "number") return t.markIndex === id;
    const idStr = String(id);
    if (/^\d+$/.test(idStr)) return t.markIndex === Number(idStr);
    return t.markId === idStr;
  };

  return (
    <MotionDiv
      ref={rootRef}
      className={className}
      position='relative'
      display='inline-block'
      whiteSpace='pre-wrap'
      suppressHydrationWarning
      // Apply italic font to <i>/<em> inside this component
      // @ts-ignore
      sx={{
        "& i, & em": {
          fontStyle: "italic",
          ...(italicFontFamily ? { fontFamily: italicFontFamily } : {}),
        },
      }}
      {...chakraProps}
      initial='hidden'
      animate={trigger === "inView" ? (inView ? "show" : "hidden") : undefined}
      variants={
        trigger === "inView"
          ? {
              hidden: { transition: { staggerChildren: 0 } },
              show: {
                transition: { staggerChildren: stagger, delayChildren: delay },
              },
            }
          : undefined
      }
    >
      {tokens.map((seg, idx) => {
        if (seg.type === "br") return <br key={`br-${idx}`} />;

        const inner = (
          <span
            // @ts-ignore
            style={shouldColor(seg) ? { color: newTextColor } : undefined}
            dangerouslySetInnerHTML={{ __html: seg.html }}
          />
        );

        return (
          <chakra.span
            key={idx}
            display={mode === "line" ? "block" : "inline-block"}
            overflow='hidden'
          >
            {trigger === "inView" ? (
              <MotionSpan
                display='inline-block'
                aria-hidden='true'
                variants={{
                  // @ts-ignore
                  hidden: { opacity: 0, [axis]: from },
                  // @ts-ignore
                  show: {
                    opacity: 1,
                    [axis]: 0,
                    transition: { duration, ease },
                  },
                }}
              >
                {inner}
              </MotionSpan>
            ) : (
              <ScrollItem
                index={idx}
                axis={axis as "x" | "y"}
                from={from}
                progress={scrollYProgress}
                staggerProg={stagger ?? 0.06}
                durProg={duration ?? 0.25}
              >
                {inner}
              </ScrollItem>
            )}
            {mode === "word" && idx < tokens.length - 1 ? "\u00A0" : null}
          </chakra.span>
        );
      })}
    </MotionDiv>
  );
};

export default RevealText;

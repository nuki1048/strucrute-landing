/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from "react";
import {
  chakra,
  Separator,
  useToken,
  type HTMLChakraProps,
} from "@chakra-ui/react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const MotionSpan = chakra(motion.span);
const MotionDiv = chakra(motion.div);

type Token = {
  type: "text" | "br";
  html: string;
  italic?: boolean;
  bold?: boolean;

  mark?: boolean;
  markId?: string;
  markIndex?: number;
};

export type RevealTextProps = HTMLChakraProps<"div"> & {
  text: string;
  mode?: "line" | "word" | "letter";
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  stagger?: number;
  ease?: any;
  once?: boolean;
  amount?: number;
  trigger?: "inView" | "scroll";
  offset?: [string, string];
  id?: string | number;
  colorText?: string;

  italicFontFamily?: string;
};

function escapeHTML(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function tokenizeHtml(html: string, mode: "line" | "word" | "letter"): Token[] {
  const withBreaks = html.replace(/<br\s*\/?>/gi, "\n");
  const container = document.createElement("div");
  container.innerHTML = withBreaks;

  const base: Array<Omit<Token, "type"> & { type: "text" | "br" }> = [];
  let cOrder = 0;

  const walk = (
    node: Node,
    active: { i: boolean; b: boolean; c: boolean; cId?: string; cIdx?: number }
  ) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const raw = node.nodeValue || "";
      const parts = raw.split("\n");
      parts.forEach((p, i) => {
        if (p.length) {
          base.push({
            type: "text",
            html: escapeHTML(p),
            italic: active.i || undefined,
            bold: active.b || undefined,
            mark: active.c || undefined,
            markId: active.c ? active.cId : undefined,
            markIndex: active.c ? active.cIdx : undefined,
          });
        }
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
    let buf: string[] = [];
    let bufMark = false;
    let bufMarkId: string | undefined;
    let bufMarkIdx: number | undefined;

    const flush = () => {
      if (!buf.length) return;
      out.push({
        type: "text",
        html: buf.join(" "),
        mark: bufMark || undefined,
        markId: bufMarkId,
        markIndex: bufMarkIdx,
      });
      buf = [];
      bufMark = false;
      bufMarkId = undefined;
      bufMarkIdx = undefined;
    };

    base.forEach((t) => {
      if (t.type === "br") flush();
      else {
        buf.push(t.html);
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
        out.push({ type: "br", html: "" });
        return;
      }
      t.html.split(/\s+/).forEach((w) => {
        if (!w) return;
        out.push({
          type: "text",
          html: w,
          italic: t.italic,
          bold: t.bold,
          mark: t.mark,
          markId: t.markId,
          markIndex: t.markIndex,
        });
      });
    });
    return out;
  }

  const out: Token[] = [];
  base.forEach((t) => {
    if (t.type === "br") {
      out.push({ type: "br", html: "" });
      return;
    }
    const plain = t.html;
    for (let i = 0; i < plain.length; i++) {
      const ch = plain[i];
      out.push({
        type: "text",
        html: ch === " " ? "&nbsp;" : ch,
        italic: t.italic,
        bold: t.bold,
        mark: t.mark,
        markId: t.markId,
        markIndex: t.markIndex,
      });
    }
  });
  return out;
}

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

export const RevealText: React.FC<RevealTextProps> = ({
  text,
  mode = "word",
  direction = "up",
  delay = 0,
  duration = 0.6,
  stagger = 0.06,
  ease = [0.22, 1, 0.36, 1],
  once = false,
  amount = 0.4,
  trigger = "inView",
  offset = ["start 0.9", "end 0.1"],
  colorText,
  id,
  italicFontFamily,
  className,
  ...chakraProps
}) => {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(rootRef, { amount, once });

  const [tokens, setTokens] = React.useState<Token[]>([]);
  React.useEffect(() => {
    setTokens(tokenizeHtml(text, mode));
  }, [text, mode]);

  const [resolvedColor] = useToken("colors", [colorText ?? ""]);
  const colorResolved = resolvedColor || colorText || undefined;

  const [italicTok] = useToken("fonts", [italicFontFamily ?? ""]);
  const italicResolved = italicTok || italicFontFamily;

  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const from = direction === "up" || direction === "left" ? 20 : -20;

  // @ts-ignore
  const { scrollYProgress } = useScroll({ target: rootRef, offset });

  const shouldColor = (t: Token) => {
    if (!t.mark || !colorResolved) return false;
    if (id == null) return true;
    if (typeof id === "number") return t.markIndex === id;
    const idStr = String(id);
    if (/^\d+$/.test(idStr)) return t.markIndex === Number(idStr);
    return t.markId === idStr;
  };

  return (
    // @ts-ignore
    <MotionDiv
      ref={rootRef}
      className={className}
      position='relative'
      display='inline-block'
      whiteSpace='pre-wrap'
      suppressHydrationWarning
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
        if (seg.type === "br")
          return (
            <Separator
              style={{
                height: "1px",
                margin: "-15px",
                padding: 0,
                border: "none",
              }}
            />
          );

        const inner = (
          <span
            style={{
              ...(shouldColor(seg) ? { color: colorResolved } : null),
              ...(seg.italic ? { fontStyle: "italic" } : null),
              ...(seg.italic && italicResolved
                ? { fontFamily: italicResolved }
                : null),
              ...(seg.bold ? { fontWeight: 700 } : null),
            }}
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

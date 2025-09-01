/* eslint-disable @typescript-eslint/no-explicit-any */
// ScrollRevealTextChakra.tsx
import * as React from "react";
import { type SystemStyleObject, useToken } from "@chakra-ui/react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const MotionDiv = motion.div;

type OwnProps = {
  text: string;
  offset?: [string, string];
  spread?: number;
  dimColor?: string;
  brightColor?: string;
  glow?: string;
  mode?: "char" | "word";
  sx?: SystemStyleObject;
  id?: string;
};

export type ScrollRevealTextProps = OwnProps;

export const ScrollRevealText = React.forwardRef<
  HTMLDivElement,
  ScrollRevealTextProps
>((props, ref) => {
  const {
    text,
    offset = ["start 85%", "end 15%"],
    spread = 1.6,
    dimColor = "whiteAlpha.400",
    brightColor = "whiteAlpha.900",
    glow = "0 0 18px rgba(255,255,255,.18)",
    mode = "char",
    sx,
    id,
  } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset as any,
  });

  const [dimToken] = useToken("colors", [dimColor, dimColor]);
  const [brightToken] = useToken("colors", [brightColor, brightColor]);

  const units = React.useMemo(() => {
    if (mode === "word") {
      return text.split(/(\s+)/).map((p: string) => (p === "" ? " " : p));
    }
    return Array.from(text);
  }, [text, mode]);

  const total = units.length;

  return (
    <MotionDiv
      ref={(node: any) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      id={id}
      style={
        {
          lineHeight: "1.1",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          ...sx,
        } as any
      }
    >
      {units.map((unit, i) => (
        <Char
          key={i}
          index={i}
          total={total}
          progress={scrollYProgress}
          spread={spread}
          dimColor={dimToken}
          brightColor={brightToken}
          glow={glow}
        >
          {unit}
        </Char>
      ))}
    </MotionDiv>
  );
});

function Char({
  children,
  index,
  total,
  progress,
  spread,
  dimColor,
  brightColor,
  glow,
}: React.PropsWithChildren<{
  index: number;
  total: number;
  progress: MotionValue<number>;
  spread: number;
  dimColor: string;
  brightColor: string;
  glow: string;
}>) {
  const t = useTransform(progress, (p) => {
    const ahead = p * total - index;
    const w = Math.max(0.25, spread);
    const x = ahead / w;
    return Math.max(0, Math.min(1, x * 0.5 + 0.5));
  });

  const color = useTransform(t, [0, 1], [dimColor, brightColor]);
  const shadow = useTransform(t, (v) => (v > 0.75 ? glow : "none"));

  return (
    <motion.span
      style={{
        color,
        textShadow: shadow,
        display: "inline-block",
        willChange: "color, text-shadow",
      }}
    >
      {children}
    </motion.span>
  );
}

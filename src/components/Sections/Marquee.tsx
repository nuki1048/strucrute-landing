import { Box } from "@chakra-ui/react";
import { Strip } from "../Strip";
import React from "react";
import { motion } from "framer-motion";
const MotionRow = motion.div;
export const Marquee = ({
  items,
  gapPx = 60,
  speedPxPerSec = 80, // smaller = slower; tune per design
}: {
  items: string[];
  gapPx?: number;
  speedPxPerSec?: number;
}) => {
  const firstRef = React.useRef<HTMLDivElement | null>(null);
  const [w, setW] = React.useState(0);

  // Measure width of one strip (one copy of the items)
  React.useLayoutEffect(() => {
    const measure = () => {
      if (firstRef.current) setW(firstRef.current.scrollWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Duration based on pixels to travel (for constant speed)
  const duration = w > 0 ? w / speedPxPerSec : 20;

  return (
    <MotionRow
      style={{
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        gap: `${gapPx}px`,
      }}
      animate={{ x: [-w, 0] }}
      transition={{
        duration,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      {/* copy #1 (measured) */}
      <Box ref={firstRef as React.RefObject<HTMLDivElement>}>
        <Strip items={items} gapPx={gapPx} />
      </Box>

      <Strip items={items} gapPx={gapPx} />

      <Strip items={items} gapPx={gapPx} />
    </MotionRow>
  );
};

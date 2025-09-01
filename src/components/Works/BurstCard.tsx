import type { WorkItem } from "../../types/types";
import { motion, MotionValue, useTransform } from "framer-motion";
import { clamp01, lerp } from "../../utils/animationUtils";
import { Box, chakra, useMediaQuery } from "@chakra-ui/react";

type BurstCardProps = {
  item: WorkItem;
  w: number;
  h: number;
  baseLeft: number;
  baseTop: number;
  offX: number;
  offY: number;
  start: number;
  end: number;
  isHero: boolean;
  scrollYProgress: MotionValue<number>;
  introGate: MotionValue<number>;
};

const MotionBox = chakra(motion.div);
const MotionImg = chakra(motion.img);

export function BurstCard({
  item,
  w,
  h,
  baseLeft,
  baseTop,
  offX,
  offY,
  start,
  end,
  isHero,
  scrollYProgress,
  introGate,
}: BurstCardProps) {
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]);
  const p = useTransform(scrollYProgress, (v) => {
    const span = Math.max(1e-5, end - start);
    return clamp01((v - start) / span);
  });

  const translateX = useTransform(p, (t) => (isHero ? 0 : lerp(0, offX, t)));
  const translateY = useTransform(p, (t) => (isHero ? 0 : lerp(0, offY, t)));

  const scale = useTransform(p, (t) =>
    isHero ? lerp(0.2, 1.0, t) : lerp(0.2, isMobile ? 1.5 : 3.5, t)
  );

  const opacityLocal = useTransform(p, (t) => (t < 0.05 ? t / 0.05 : 1));
  const opacity = useTransform(
    [opacityLocal, introGate],
    ([o, g]) => (o as number) * (g as number)
  );

  return (
    <MotionBox
      position='absolute'
      style={{
        left: baseLeft,
        top: baseTop,
        translateX,
        translateY,
        scale,
        opacity,
      }}
      w={`${w}px`}
      h={`${h}px`}
      rounded='xl'
      overflow='hidden'
      boxShadow='0 24px 80px rgba(0,0,0,.35)'
      zIndex={isHero ? 5 : 2}
      bg='black'
    >
      {item.node ? (
        <Box w='100%' h='100%'>
          {item.node}
        </Box>
      ) : (
        <MotionImg
          src={item.image}
          alt={item.title}
          w='100%'
          h='100%'
          objectFit='cover'
          draggable={false}
        />
      )}
    </MotionBox>
  );
}

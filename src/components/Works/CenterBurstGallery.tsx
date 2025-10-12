/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Flex, chakra, useMediaQuery } from "@chakra-ui/react";
import { useScroll, useTransform } from "framer-motion";
import { useSizeRef } from "../../hooks/useSizeRef";
import type { WorkItem } from "../../types/types";
import {
  HOLD_FRAC,
  HOLD_PX,
  PX_PER_CARD,
  VISIBLE_COUNT,
  WINDOW_FACTOR,
} from "../../constants";
import { lerp, seeded } from "../../utils/animationUtils";
import { BurstCard } from "./BurstCard";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const MotionText = chakra(motion.h2);

const useImageDimensions = (src: string) => {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      setLoaded(true);
    };
    img.src = src;
  }, [src]);

  return { ...dimensions, loaded };
};

const DynamicCard = ({
  item,
  index,
  vp,
  step,
  windowLen,
  usableSpan,
  cardsProgress,
  introGate,
}: {
  item: WorkItem;
  index: number;
  vp: { w: number; h: number };
  step: number;
  windowLen: number;
  usableSpan: number;
  cardsProgress: any;
  introGate: any;
}) => {
  const imageDimensions = useImageDimensions(item.image || "");
  const { width: imgWidth, height: imgHeight, loaded } = imageDimensions;

  const corners = [
    { x: -1, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: 1, y: 1 },
  ];

  const cx = (vp.w || 1) / 2;
  const cy = (vp.h || 1) / 2;
  const r = seeded(index);

  let w, h;
  if (loaded && imgWidth && imgHeight) {
    const aspectRatio = imgWidth / imgHeight;
    const baseWidth = Math.round(lerp(380, 620, seeded(index + 5)));
    const baseHeight = Math.round(lerp(240, 380, seeded(index + 9)));

    if (aspectRatio > 1.5) {
      w = Math.round(baseWidth * 1.2);
      h = Math.round(w / aspectRatio);
    } else if (aspectRatio < 0.8) {
      h = Math.round(baseHeight * 1.2);
      w = Math.round(h * aspectRatio);
    } else {
      w = baseWidth;
      h = baseHeight;
    }
  } else {
    w = Math.round(lerp(380, 620, seeded(index + 5)));
    h = Math.round(lerp(240, 380, seeded(index + 9)));
  }

  const baseLeft = cx - w / 2;
  const baseTop = cy - h / 2;

  const c = corners[index % corners.length];
  const jx = lerp(-0.25, 0.25, r);
  const jy = lerp(-0.25, 0.25, seeded(index + 11));

  const offX = (vp.w || 1200) * (1.3 + 0.6 * seeded(index + 2)) * (c.x + jx);
  const offY = (vp.h || 800) * (1.3 + 0.6 * seeded(index + 3)) * (c.y + jy);

  const start = index * step;
  const end = Math.min(usableSpan, start + windowLen);

  return (
    <BurstCard
      key={index}
      item={item}
      w={w}
      h={h}
      baseLeft={baseLeft}
      baseTop={baseTop}
      offX={offX}
      offY={offY}
      start={start}
      end={end}
      scrollYProgress={cardsProgress}
      introGate={introGate}
    />
  );
};

export function CenterBurstGallery({ items }: { items: WorkItem[] }) {
  const { t } = useTranslation();
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]);
  const safe = React.useMemo(
    () => (Array.isArray(items) ? items : []),
    [items]
  );
  const N = safe.length;

  const pinRef = React.useRef<HTMLDivElement | null>(null);
  const { ref: vpRef, size: vp } = useSizeRef<HTMLDivElement>();

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  const TITLE_PORTION = 0.1;
  const titleStart = 0.0;
  const titleMid = TITLE_PORTION * 0.6;
  const titleEnd = TITLE_PORTION;

  const titleScale = useTransform(
    scrollYProgress,
    [titleStart, titleMid, titleEnd],
    isMobile ? [1, 1.5, 2.5] : [0.65, 1.0, 2.5]
  );

  const titleOpacity = useTransform(
    scrollYProgress,
    [titleStart, titleMid, titleEnd],
    [0, 1, 0]
  );

  const titleY = useTransform(
    scrollYProgress,
    [titleStart, titleEnd],
    [20, -10]
  );

  const introGate = useTransform(
    scrollYProgress,
    [0, titleEnd, titleEnd + 0.02, 1],
    [0, 0, 1, 1]
  );

  const cardsProgress = useTransform(scrollYProgress, (v) => {
    const t = Math.max(0, v - titleEnd) / Math.max(1e-5, 1 - titleEnd);
    return Math.min(1, t);
  });

  const sectionHeight = Math.max(
    1400,
    Math.max(0, N - 1) * PX_PER_CARD + HOLD_PX
  );

  const usableSpan = Math.max(0.0001, 1 - HOLD_FRAC);
  const step = N > 1 ? usableSpan / (N - 1) : usableSpan;
  const windowLen = step * (VISIBLE_COUNT * WINDOW_FACTOR);

  return (
    <Box as='section'>
      <Box ref={pinRef} position='relative' h={`${sectionHeight}px`}>
        <Flex
          ref={vpRef}
          position='sticky'
          top={0}
          h='100vh'
          overflow='hidden'
          align='center'
          justify='center'
          bg='#09090A'
          color='white'
        >
          <MotionText
            position='absolute'
            zIndex={3}
            pointerEvents='none'
            textAlign='center'
            fontWeight={800}
            letterSpacing='widest'
            textTransform='uppercase'
            style={{ scale: titleScale, opacity: titleOpacity, y: titleY }}
            fontSize={{ base: "3xl", md: "7xl" }}
            id='projects'
          >
            {t("works.title")}
          </MotionText>

          {safe.map((it, i) => (
            <DynamicCard
              key={i}
              item={it}
              index={i}
              vp={vp}
              step={step}
              windowLen={windowLen}
              usableSpan={usableSpan}
              cardsProgress={cardsProgress}
              introGate={introGate}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
}

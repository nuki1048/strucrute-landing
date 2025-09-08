import React from "react";
import { Box, Flex, chakra, useMediaQuery } from "@chakra-ui/react";
import { useScroll, useTransform } from "framer-motion";
import { useSizeRef } from "../../hooks/useSizeRef";
import type { WorkItem } from "../../types/types";
import {
  HERO_PORTION,
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

export function CenterBurstGallery({ items }: { items: WorkItem[] }) {
  const { t } = useTranslation();
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]);
  const safe = React.useMemo(
    () => (Array.isArray(items) ? items : []),
    [items]
  );
  const N = safe.length;
  const heroIndex = Math.max(0, N - 1);

  const pinRef = React.useRef<HTMLDivElement | null>(null);
  const { ref: vpRef, size: vp } = useSizeRef<HTMLDivElement>();

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  const TITLE_PORTION = 0.4;
  const titleStart = 0.0;
  const titleMid = TITLE_PORTION * 0.55;
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

  const heroStart = usableSpan + (HOLD_FRAC * (1 - HERO_PORTION)) / 2;
  const heroEnd = heroStart + HOLD_FRAC * HERO_PORTION;

  const cards = React.useMemo(() => {
    const cx = (vp.w || 1) / 2;
    const cy = (vp.h || 1) / 2;

    const corners = [
      { x: -1, y: -1 },
      { x: 1, y: -1 },
      { x: -1, y: 1 },
      { x: 1, y: 1 },
    ];

    return safe.map((it, i) => {
      const isHero = i === heroIndex;
      const r = seeded(i);

      let w = Math.round(lerp(380, 620, seeded(i + 5)));
      let h = Math.round(lerp(240, 380, seeded(i + 9)));
      let baseLeft = cx - w / 2;
      let baseTop = cy - h / 2;

      if (isHero) {
        w = vp.w || window.innerWidth || 1200;
        h = vp.h || window.innerHeight || 800;
        baseLeft = 0;
        baseTop = 0;
      }

      const c = corners[i % corners.length];
      const jx = lerp(-0.25, 0.25, r);
      const jy = lerp(-0.25, 0.25, seeded(i + 11));

      const offX = (vp.w || 1200) * (1.25 + 0.35 * seeded(i + 2)) * (c.x + jx);
      const offY = (vp.h || 800) * (1.25 + 0.35 * seeded(i + 3)) * (c.y + jy);

      const start = isHero ? heroStart : i * step;
      const end = isHero ? heroEnd : Math.min(usableSpan, start + windowLen);

      return { it, i, w, h, baseLeft, baseTop, offX, offY, start, end, isHero };
    });
  }, [
    safe,
    heroIndex,
    vp.w,
    vp.h,
    step,
    windowLen,
    usableSpan,
    heroStart,
    heroEnd,
  ]);

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

          {cards.map((c) => (
            <BurstCard
              key={c.i}
              item={c.it}
              w={c.w}
              h={c.h}
              baseLeft={c.baseLeft}
              baseTop={c.baseTop}
              offX={c.offX}
              offY={c.offY}
              start={c.start}
              end={c.end}
              isHero={c.isHero}
              scrollYProgress={cardsProgress}
              introGate={introGate}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
}

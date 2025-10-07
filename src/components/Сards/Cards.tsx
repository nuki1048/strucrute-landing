/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Card } from "./Card";
import { useTranslation } from "react-i18next";
import { useCommonDeviceProps } from "../../hooks/useCommonDeviceProps";
import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";

const MotionBox = motion.create(Box);

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export const Cards: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();
  const commonProps = useCommonDeviceProps();
  const [vh, setVh] = useState(0);

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight || 0);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const CARDS = 3;
  const SECTION_VH = 160 * CARDS;
  const sectionH = useBreakpointValue({
    base: `${SECTION_VH}vh`,
    md: `${SECTION_VH}vh`,
    lg: `${SECTION_VH}vh`,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const animProgress = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    { stiffness: 180, damping: 22, mass: 0.4 }
  );

  const listGap = Math.max(0.85 * vh, 560);
  const revealGap = Math.max(0.12 * vh, 72);
  const stackBase = Math.max(0.18 * vh, 120);

  const startY = [0, listGap, listGap * 2];
  const endY = [stackBase - revealGap * 2, stackBase - revealGap, stackBase];

  const overlap = 0.08;
  const seg = (p: number, i: number, n: number) => {
    const a = Math.max(0, i / n - overlap);
    const b = Math.min(1, (i + 1) / n + overlap);
    return clamp01((p - a) / (b - a));
  };

  const [p1, p2] = [0, 1, 2].map((i) =>
    useTransform(animProgress, (p) => seg(p, i, CARDS))
  );

  const SPR = { stiffness: 175, damping: 18, mass: 0.5 };

  const y1 = useSpring(
    useTransform(p1, (v) => mix(startY[1], endY[1], v)),
    SPR
  );
  const y2 = useSpring(
    useTransform(p2, (v) => mix(startY[2], endY[2], v)),
    SPR
  );

  useEffect(() => {
    track("view_cards", { ...commonProps });
  }, [commonProps]);

  return (
    <Box
      ref={sectionRef}
      mt='180px'
      px={{ base: "20px", md: "92px" }}
      h={sectionH}
      position='relative'
    >
      <Box
        position='sticky'
        top={{ base: "8vh", md: "8vh" }}
        h='120vh'
        overflow='visible'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Box position='relative' w='full' h='100%' maxW='min(1200px, 94vw)'>
          <MotionBox
            position='absolute'
            inset='0'
            zIndex={1}
            pointerEvents='none'
          >
            <Card
              title={t("cards.design-is-a-beginning")}
              description={t("cards.design-is-a-beginning-description")}
              bg='white1'
              badgeText='Design is a beginning'
              color='black1'
            />
          </MotionBox>

          <MotionBox
            position='absolute'
            inset='0'
            style={{ y: y1 }}
            zIndex={2}
            pointerEvents='none'
          >
            <Card
              title={t("cards.every-big-product")}
              description={t("cards.every-big-product-description")}
              bg='pink1'
              badgeText='Every big product'
              color='secondary'
              minHeight='560px'
            />
          </MotionBox>

          <MotionBox position='absolute' inset='0' style={{ y: y2 }} zIndex={3}>
            <Card
              title={t("cards.future-leaders")}
              description={t("cards.future-leaders-description")}
              bg='white1'
              badgeText='Future leaders'
              color='gray3'
            />
          </MotionBox>
        </Box>
      </Box>

      {/* keep a small buffer but kill the big tail */}
      <Box h={{ base: "24vh", md: "28vh" }} />
    </Box>
  );
};

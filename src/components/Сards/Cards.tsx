import * as React from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Card } from "./Card";
import { segment } from "../../utils/animationUtils";
import { useTranslation } from "react-i18next";
import { useCommonDeviceProps } from "../../hooks/useCommonDeviceProps";
import { useEffect } from "react";
import { track } from "@vercel/analytics";

const MotionBox = motion.create(Box);

export const Cards: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();
  const commonProps = useCommonDeviceProps();
  const sectionH = useBreakpointValue({
    base: "520vh",
    md: "580vh",
    lg: "640vh",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 70%"],
  });

  const HOLD_TAIL = 0.3;
  const animProgress = useTransform(
    scrollYProgress,
    [0, 1 - HOLD_TAIL, 1],
    [0, 1, 1]
  );

  const listGap = useBreakpointValue({ base: 680, md: 760, lg: 840 }) ?? 760;
  const revealGap = useBreakpointValue({ base: 80, md: 96, lg: 110 }) ?? 96;
  const stackBase = useBreakpointValue({ base: 120, md: 135, lg: 150 }) ?? 135;

  const overlap = 0.06;
  const p1 = segment(animProgress, 0.0, 0.33 + overlap);
  const p2 = segment(animProgress, 0.33 - overlap, 0.66 + overlap);
  const p3 = segment(animProgress, 0.66 - overlap, 1.0);

  const SPR = { stiffness: 175, damping: 18 };

  const y0_start = 0;
  const y1_start = listGap;
  const y2_start = listGap * 2;

  const y0_end = stackBase - revealGap * 2;
  const y1_end = stackBase - revealGap;
  const y2_end = stackBase;

  // Reorder the cards - design-is-a-beginning first
  const yCard0 = useSpring(useTransform(p1, [0, 1], [y0_start, y0_end]), SPR); // design-is-a-beginning
  const yCard1 = useSpring(useTransform(p2, [0, 1], [y1_start, y1_end]), SPR); // every-big-product
  const yCard2 = useSpring(useTransform(p3, [0, 1], [y2_start, y2_end]), SPR); // future-leaders

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
        h='155vh'
        overflow='visible'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Box position='relative' w='full' h='100%' maxW='min(1200px, 94vw)'>
          {/* First card - design-is-a-beginning */}
          <MotionBox
            position='absolute'
            inset='0'
            style={{ y: yCard0 }}
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

          {/* Second card - every-big-product */}
          <MotionBox
            position='absolute'
            inset='0'
            style={{ y: yCard1 }}
            zIndex={2}
            pointerEvents='none'
          >
            <Card
              title={t("cards.every-big-product")}
              description={t("cards.every-big-product-description")}
              bg='white1'
              badgeText='Every big product'
              color='gray3'
            />
          </MotionBox>

          {/* Third card - future-leaders */}
          <MotionBox
            position='absolute'
            inset='0'
            style={{ y: yCard2 }}
            zIndex={3}
          >
            <Card
              title={t("cards.future-leaders")}
              description={t("cards.future-leaders-description")}
              bg='pink1'
              badgeText='Future leaders'
              color='secondary'
            />
          </MotionBox>
        </Box>
      </Box>

      <Box h={{ base: "72vh", md: "84vh" }} />
    </Box>
  );
};

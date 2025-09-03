// Cards.tsx
import * as React from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Card } from "./Card";
import { segment } from "../../utils/animationUtils";

const MotionBox = motion(Box);

export const Cards: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);

  const sectionH = useBreakpointValue({
    base: "520vh",
    md: "580vh",
    lg: "640vh",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 99%", "end 72%"],
  });

  const delayed = useTransform(scrollYProgress, [0, 0.28, 1], [0, 0, 1]);

  const listGap = useBreakpointValue({ base: 700, md: 800, lg: 900 }) ?? 800;

  const revealGap = useBreakpointValue({ base: 80, md: 96, lg: 110 }) ?? 96;
  const stackBase = useBreakpointValue({ base: 110, md: 130, lg: 150 }) ?? 130;

  const p1 = segment(scrollYProgress, 0.0, 0.6);

  const p2 = segment(delayed, 0.38, 0.66);
  const p3 = segment(delayed, 0.7, 0.88);

  const SPR = { stiffness: 175, damping: 18 };

  const y0_start = 0;
  const y1_start = listGap;
  const y2_start = listGap * 2;

  const y0_end = stackBase - revealGap * 2;
  const y1_end = stackBase - revealGap * 1;
  const y2_end = stackBase - 0;

  const x2 = 0;

  const yCard0 = useSpring(useTransform(p1, [0, 1], [y0_start, y0_end]), SPR);
  const yCard1 = useSpring(useTransform(p2, [0, 1], [y1_start, y1_end]), SPR);
  const yCard2 = useSpring(useTransform(p3, [0, 1], [y2_start, y2_end]), SPR);

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
        top={{ base: "6vh", md: "6vh" }} // was 10/12vh → raise the stage
        h={{ base: "110vh", md: "110vh" }}
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Box
          position='relative'
          w='full'
          minH={{ base: "750px", md: "700px" }}
          maxW='min(1200px, 94vw)'
        >
          <MotionBox
            position='absolute'
            inset='0'
            style={{ y: yCard0 }}
            zIndex={1}
            pointerEvents='none'
          >
            <Card
              title='КОЖЕН ВЕЛИКИЙ ПРОДУКТ ГОВОРИТЬ ВІЗУАЛЬНО'
              description='ТАК НАРОДЖУЄТЬСЯ ДОВІРА'
              bg='white1'
              badgeText='Every big product'
              color='gray3'
            />
          </MotionBox>

          <MotionBox
            position='absolute'
            inset='0'
            style={{ y: yCard1 }}
            zIndex={2}
            pointerEvents='none'
          >
            <Card
              title='МАЙБУТНІ ЛІДЕРИ НЕ КОПІЮЮТЬ'
              description='ВОНА СТВОРЮЮТЬ ТРЕНДИ, ЯКІ НАСЛІДУЄ СВІТ'
              bg='pink1'
              badgeText='Future leaders'
              color='secondary'
            />
          </MotionBox>

          <MotionBox
            position='absolute'
            inset='0'
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            style={{ x: x2 as any, y: yCard2 }}
            zIndex={3}
          >
            <Card
              title='ДИЗАЙН – ЦЕ ПОЧАТОК'
              description='СПРАВЖНЯ ОСНОВА – ЦЕ КОД, ЩО ВИТРИМУЄ ЧАС І РОЗВИВАЄТЬСЯ ІЗ ТОБОЮ'
              bg='white1'
              badgeText='Design is a beginning'
              color='black1'
            />
          </MotionBox>
        </Box>
      </Box>

      <Box h={{ base: "64vh", md: "72vh" }} />
    </Box>
  );
};

/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Card } from "./Card";
import { useTranslation } from "react-i18next";
import { useCommonDeviceProps } from "../../hooks/useCommonDeviceProps";
import { useEffect, useState, useRef } from "react";
import { track } from "@vercel/analytics";

const MotionBox = motion.create(Box);

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export const Cards: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();
  const commonProps = useCommonDeviceProps();
  const [vh, setVh] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const velocityTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  // Track scroll velocity
  useEffect(() => {
    let lastTime = 0;
    let lastScrollY = 0;

    const updateVelocity = () => {
      const currentTime = performance.now();
      const currentScrollY = window.scrollY;

      if (lastTime !== 0) {
        const deltaTime = currentTime - lastTime;
        const deltaScroll = currentScrollY - lastScrollY;
        const velocity = Math.abs(deltaScroll / deltaTime) * 1000; // pixels per second

        setScrollVelocity(velocity);

        // Clear velocity after user stops scrolling
        if (velocityTimeout.current) {
          clearTimeout(velocityTimeout.current);
        }
        velocityTimeout.current = setTimeout(() => {
          setScrollVelocity(0);
        }, 150);
      }

      lastTime = currentTime;
      lastScrollY = currentScrollY;
      requestAnimationFrame(updateVelocity);
    };

    updateVelocity();

    return () => {
      if (velocityTimeout.current) {
        clearTimeout(velocityTimeout.current);
      }
    };
  }, []);

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

  // Dynamic spring configuration based on scroll velocity
  const getSpringConfig = (velocity: number) => {
    // Normalize velocity (0-1000 pixels per second)
    const normalizedVelocity = Math.min(velocity / 1000, 1);

    // Base configuration
    const baseStiffness = 180;
    const baseDamping = 22;
    const baseMass = 0.4;

    // Adjust based on velocity
    // Fast scroll = higher stiffness, lower damping (more responsive)
    // Slow scroll = lower stiffness, higher damping (smoother)
    const stiffness = baseStiffness + normalizedVelocity * 200; // 180-380
    const damping = baseDamping - normalizedVelocity * 8; // 22-14
    const mass = baseMass - normalizedVelocity * 0.1; // 0.4-0.3

    return {
      stiffness: Math.max(50, Math.min(500, stiffness)),
      damping: Math.max(5, Math.min(50, damping)),
      mass: Math.max(0.1, Math.min(1, mass)),
    };
  };

  const springConfig = getSpringConfig(scrollVelocity);

  const animProgress = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    springConfig
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

  // Dynamic spring config for individual cards
  const getCardSpringConfig = (velocity: number) => {
    const normalizedVelocity = Math.min(velocity / 1000, 1);

    const baseStiffness = 175;
    const baseDamping = 18;
    const baseMass = 0.5;

    const stiffness = baseStiffness + normalizedVelocity * 150; // 175-325
    const damping = baseDamping - normalizedVelocity * 6; // 18-12
    const mass = baseMass - normalizedVelocity * 0.15; // 0.5-0.35

    return {
      stiffness: Math.max(50, Math.min(400, stiffness)),
      damping: Math.max(5, Math.min(30, damping)),
      mass: Math.max(0.1, Math.min(1, mass)),
    };
  };

  const cardSpringConfig = getCardSpringConfig(scrollVelocity);

  const y1 = useSpring(
    useTransform(p1, (v) => mix(startY[1], endY[1], v)),
    cardSpringConfig
  );
  const y2 = useSpring(
    useTransform(p2, (v) => mix(startY[2], endY[2], v)),
    cardSpringConfig
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

// useLenisSmoothScroll.tsx (drop-in improvements)

import { useEffect, useRef, useCallback, useMemo } from "react";
import Lenis from "lenis";
import { useMediaQuery } from "@chakra-ui/react";

export function useLenisSmoothScroll(
  opts?: ConstructorParameters<typeof Lenis>[0]
) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const stoppedRef = useRef(false);
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]);

  const cleanup = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }
  }, []);

  // Make options stable so useEffect doesn't churn
  const stableOpts = useMemo(() => {
    const base = {
      duration: isMobile ? 10 : 1.1, // ⬅️ slower on mobile & desktop
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: !isMobile,
      wheelMultiplier: 1,
      smooth: isMobile ? true : false,
      touchMultiplier: isMobile ? 1.2 : 1,
      touchInertiaMultiplier: isMobile ? 14 : 20,
      infinite: false,
      gestureOrientation: "vertical" as const,
      normalizeWheel: false,
      lerp: isMobile ? 0.1 : 0,
      syncTouch: false,
    };
    return { ...base, ...(opts || {}) };
  }, [isMobile, opts]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    cleanup();

    const lenis = new Lenis(stableOpts);
    lenisRef.current = lenis;

    const raf = (time: number) => {
      if (!lenisRef.current || stoppedRef.current) return;
      lenisRef.current.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };
    rafIdRef.current = requestAnimationFrame(raf);

    const onVis = () => {
      if (!lenisRef.current) return;
      stoppedRef.current = document.visibilityState !== "visible";
      if (!stoppedRef.current && rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(raf);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    // Keep physics sane on rotate/resize
    const onResize = () => lenisRef.current?.resize();
    window.addEventListener("orientationchange", onResize);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("orientationchange", onResize);
      window.removeEventListener("resize", onResize);
      cleanup();
    };
  }, [stableOpts, cleanup]);

  useEffect(() => () => cleanup(), [cleanup]);

  return lenisRef;
}

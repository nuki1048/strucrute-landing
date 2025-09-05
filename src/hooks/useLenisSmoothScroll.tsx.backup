// useLenisSmoothScroll.tsx
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function useLenisSmoothScroll(
  opts?: ConstructorParameters<typeof Lenis>[0]
) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect users who prefer reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.4, // overall feel (0.8–1.4)
      easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      smoothWheel: true,
      wheelMultiplier: 1.0,
      ...opts,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [opts]);

  return lenisRef;
}

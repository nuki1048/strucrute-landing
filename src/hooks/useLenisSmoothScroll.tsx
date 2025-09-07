// useLenisSmoothScroll.tsx
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useMediaQuery } from "@chakra-ui/react";

export function useLenisSmoothScroll(
  opts?: ConstructorParameters<typeof Lenis>[0]
) {
  const lenisRef = useRef<Lenis | null>(null);
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]);

  useEffect(() => {
    // Respect users who prefer reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: isMobile ? 0.8 : 1, // Faster duration
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: isMobile ? 1.2 : 1.0, // Higher wheel speed
      touchMultiplier: isMobile ? 1.5 : 1, // Higher touch speed
      infinite: false,
      gestureOrientation: "vertical",
      ...(isMobile && {
        smoothTouch: true,
        touchInertiaMultiplier: 20, // Higher inertia for more momentum
        normalizeWheel: true,
        lerp: 1.2, // Higher lerp for faster response
        syncTouch: true,
      }),
      ...opts,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    if (isMobile) {
      const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length > 1) {
          lenis.stop();
        }
      };

      const handleTouchEnd = (e: TouchEvent) => {
        if (e.touches.length === 0) {
          lenis.start();
        }
      };

      document.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      document.addEventListener("touchend", handleTouchEnd, { passive: true });

      return () => {
        document.removeEventListener("touchstart", handleTouchStart);
        document.removeEventListener("touchend", handleTouchEnd);
        cancelAnimationFrame(rafId);
        lenis.destroy();
        lenisRef.current = null;
      };
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [opts, isMobile]);

  return lenisRef;
}

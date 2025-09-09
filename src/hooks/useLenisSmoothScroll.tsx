// useLenisSmoothScroll.tsx
import { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import { useMediaQuery } from "@chakra-ui/react";

export function useLenisSmoothScroll(
  opts?: ConstructorParameters<typeof Lenis>[0]
) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const isDestroyedRef = useRef(false);
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]);

  // Memoized cleanup function to prevent recreation
  const cleanup = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    if (lenisRef.current && !isDestroyedRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
      isDestroyedRef.current = true;
    }
  }, []);

  useEffect(() => {
    // Respect users who prefer reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // Cleanup any existing instance
    cleanup();

    // Reset destroyed flag
    isDestroyedRef.current = false;

    const lenis = new Lenis({
      duration: isMobile ? 0.8 : 1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: isMobile ? 1.2 : 1.0,
      touchMultiplier: isMobile ? 1.5 : 1,
      infinite: false,
      gestureOrientation: "vertical",
      ...(isMobile && {
        smoothTouch: true,
        touchInertiaMultiplier: 20,
        normalizeWheel: true,
        lerp: 1.2,
        syncTouch: true,
      }),
      ...opts,
    });

    lenisRef.current = lenis;

    // Optimized RAF loop with proper cleanup
    const raf = (time: number) => {
      if (isDestroyedRef.current || !lenisRef.current) return;

      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };
    rafIdRef.current = requestAnimationFrame(raf);

    // Mobile touch handlers with proper cleanup
    let touchStartHandler: ((e: TouchEvent) => void) | null = null;
    let touchEndHandler: ((e: TouchEvent) => void) | null = null;

    if (isMobile) {
      touchStartHandler = (e: TouchEvent) => {
        if (e.touches.length > 1 && lenisRef.current) {
          lenis.stop();
        }
      };

      touchEndHandler = (e: TouchEvent) => {
        if (e.touches.length === 0 && lenisRef.current) {
          lenis.start();
        }
      };

      document.addEventListener("touchstart", touchStartHandler, {
        passive: true,
      });
      document.addEventListener("touchend", touchEndHandler, { passive: true });
    }

    return () => {
      // Cleanup touch handlers
      if (touchStartHandler) {
        document.removeEventListener("touchstart", touchStartHandler);
      }
      if (touchEndHandler) {
        document.removeEventListener("touchend", touchEndHandler);
      }

      // Cleanup RAF and Lenis
      cleanup();
    };
  }, [opts, isMobile, cleanup]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return lenisRef;
}

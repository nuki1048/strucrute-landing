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

    // Detect if device is mobile/touch
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || 'ontouchstart' in window;

    const lenis = new Lenis({
      duration: 1.4, // overall feel (0.8–1.4)
      easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      smoothWheel: true,
      wheelMultiplier: 1.0,
      // Mobile-specific configurations
      touchMultiplier: isMobile ? 2 : 1, // Increase touch sensitivity on mobile
      infinite: false, // Prevent infinite scroll issues on mobile
      gestureOrientation: 'vertical', // Ensure vertical scrolling on mobile
      ...opts,
    });
    lenisRef.current = lenis;

    // Enhanced mobile touch handling
    if (isMobile) {
      // Add touch event listeners for better mobile experience
      const handleTouchStart = (e: TouchEvent) => {
        // Allow native touch scrolling for better mobile UX
        if (e.touches.length > 1) {
          lenis.stop();
        }
      };

      const handleTouchEnd = (e: TouchEvent) => {
        if (e.touches.length === 0) {
          lenis.start();
        }
      };

      // Add passive touch listeners
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });

      // Cleanup touch listeners
      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchend', handleTouchEnd);
        cancelAnimationFrame(rafId);
        lenis.destroy();
        lenisRef.current = null;
      };
    }

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

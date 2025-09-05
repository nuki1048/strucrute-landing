// useMobileOptimizedSmoothScroll.tsx
import { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";

export function useMobileOptimizedSmoothScroll(
  opts?: ConstructorParameters<typeof Lenis>[0]
) {
  const lenisRef = useRef<Lenis | null>(null);
  const isScrollingRef = useRef(false);
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);

  // Detect mobile device more accurately
  const isMobile = useCallback(() => {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0)
    );
  }, []);

  useEffect(() => {
    // Respect users who prefer reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const mobile = isMobile();
    
    const lenis = new Lenis({
      duration: mobile ? 1.2 : 1.4, // Slightly faster on mobile
      easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      smoothWheel: true,
      wheelMultiplier: mobile ? 0.8 : 1.0, // Reduce wheel sensitivity on mobile
      // Mobile-specific configurations
      touchMultiplier: mobile ? 1.5 : 1, // Moderate touch sensitivity
      infinite: false,
      gestureOrientation: 'vertical',
      // Additional mobile optimizations
      lerp: mobile ? 0.1 : 0.08, // Slightly more responsive on mobile
      ...opts,
    });
    
    lenisRef.current = lenis;

    // Enhanced mobile touch handling
    if (mobile) {
      const handleTouchStart = (e: TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
        touchStartTime.current = Date.now();
        isScrollingRef.current = false;
        
        // Stop lenis for multi-touch gestures
        if (e.touches.length > 1) {
          lenis.stop();
        }
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          const touchY = e.touches[0].clientY;
          const deltaY = touchY - touchStartY.current;
          
          // Only start scrolling if there's significant movement
          if (Math.abs(deltaY) > 10) {
            isScrollingRef.current = true;
            if (!lenis.isStopped) {
              lenis.start();
            }
          }
        }
      };

      const handleTouchEnd = (e: TouchEvent) => {
        const touchDuration = Date.now() - touchStartTime.current;
        
        // If it was a quick tap or very short swipe, don't interfere
        if (touchDuration < 100 && !isScrollingRef.current) {
          return;
        }
        
        if (e.touches.length === 0) {
          // Small delay to allow momentum scrolling
          setTimeout(() => {
            if (lenis.isStopped) {
              lenis.start();
            }
          }, 50);
        }
      };

      // Handle scroll events to detect momentum scrolling
      const handleScroll = () => {
        if (isScrollingRef.current) {
          lenis.start();
        }
      };

      // Add passive touch listeners
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });
      window.addEventListener('scroll', handleScroll, { passive: true });

      // Cleanup function
      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('scroll', handleScroll);
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
  }, [opts, isMobile]);

  return lenisRef;
}

// useSmoothedScrollBetween.ts - Fixed for positioning issues
import React from "react";
import { damp, clamp01 } from "../utils/animationUtils";

type Options = {
  hysteresis?: number;
  smoothness?: number;
  observeLayout?: boolean;
  scroller?: HTMLElement | Window;
  minSpanPx?: number;
  onUpdate?: () => void;
};

export function useSmoothedScrollBetween(
  selectStart: string,
  selectEnd: string,
  {
    hysteresis = 0.0005,
    smoothness = 10,
    observeLayout = true,
    scroller = typeof window !== "undefined"
      ? window
      : (undefined as unknown as HTMLElement | Window),
    minSpanPx = 64,
    onUpdate,
  }: Options = {}
) {
  const ref = React.useRef({
    startY: 0,
    endY: 1,
    span: 1,
    raw: 0,
    clamped: 0,
    overPx: 0,
    smooth: 0,
    lastTs: performance.now(),
  });

  // Track cleanup functions
  const cleanupRef = React.useRef<{
    rafId: number | null;
    resizeHandler: (() => void) | null;
    loadHandler: (() => void) | null;
    roA: ResizeObserver | null;
    roB: ResizeObserver | null;
  }>({
    rafId: null,
    resizeHandler: null,
    loadHandler: null,
    roA: null,
    roB: null,
  });

  React.useEffect(() => {
    const a = document.querySelector(selectStart) as HTMLElement | null;
    const b = document.querySelector(selectEnd) as HTMLElement | null;
    if (!a || !b || !scroller) return;

    const state = ref.current;

    const getScrollTop = () =>
      scroller === window
        ? window.scrollY || window.pageYOffset || 0
        : (scroller as HTMLElement).scrollTop;

    const getDocY = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const scrollTop =
        scroller === window
          ? window.scrollY || window.pageYOffset || 0
          : (scroller as HTMLElement).scrollTop;
      return scrollTop + rect.top;
    };

    const anchor = () => {
      let s = getDocY(a);
      let e = getDocY(b);
      if (e < s) [s, e] = [e, s];
      state.startY = s;
      state.endY = e;
      state.span = Math.max(minSpanPx, e - s);
      onUpdate?.();
    };

    anchor();

    // Create handlers
    const resizeHandler = () => anchor();
    const loadHandler = () => anchor();

    // Store handlers for cleanup
    cleanupRef.current.resizeHandler = resizeHandler;
    cleanupRef.current.loadHandler = loadHandler;

    window.addEventListener("resize", resizeHandler, { passive: true });
    window.addEventListener("load", loadHandler);

    // ResizeObserver setup
    let roA: ResizeObserver | undefined;
    let roB: ResizeObserver | undefined;
    if (observeLayout && "ResizeObserver" in window) {
      roA = new ResizeObserver(anchor);
      roB = new ResizeObserver(anchor);
      roA.observe(a);
      roB.observe(b);

      cleanupRef.current.roA = roA;
      cleanupRef.current.roB = roB;
    }

    // Optimized RAF loop with proper cleanup and error handling
    const tick = (ts: number) => {
      try {
        const dt = Math.max(0, (ts - state.lastTs) / 1000);
        state.lastTs = ts;

        const y = getScrollTop();
        const raw = (y - state.startY) / state.span;

        let clamped = clamp01(raw);
        if (clamped < hysteresis) clamped = 0;
        else if (clamped > 1 - hysteresis) clamped = 1;

        const overPx = Math.max(0, y - state.endY);

        state.smooth = damp(state.smooth, clamped, smoothness, dt);
        state.raw = raw;
        state.clamped = clamped;
        state.overPx = overPx;

        onUpdate?.();

        // Only continue if not cleaned up
        if (cleanupRef.current.rafId !== null) {
          cleanupRef.current.rafId = requestAnimationFrame(tick);
        }
      } catch (error) {
        console.error("Scroll tick error:", error);
        // Stop the RAF loop on error to prevent freezing
        if (cleanupRef.current.rafId !== null) {
          cancelAnimationFrame(cleanupRef.current.rafId);
          cleanupRef.current.rafId = null;
        }
      }
    };

    cleanupRef.current.rafId = requestAnimationFrame(tick);

    return () => {
      // Cancel RAF
      if (cleanupRef.current.rafId !== null) {
        cancelAnimationFrame(cleanupRef.current.rafId);
        cleanupRef.current.rafId = null;
      }

      // Remove event listeners
      if (cleanupRef.current.resizeHandler) {
        window.removeEventListener("resize", cleanupRef.current.resizeHandler);
        cleanupRef.current.resizeHandler = null;
      }
      if (cleanupRef.current.loadHandler) {
        window.removeEventListener("load", cleanupRef.current.loadHandler);
        cleanupRef.current.loadHandler = null;
      }

      // Disconnect ResizeObservers
      if (cleanupRef.current.roA) {
        cleanupRef.current.roA.disconnect();
        cleanupRef.current.roA = null;
      }
      if (cleanupRef.current.roB) {
        cleanupRef.current.roB.disconnect();
        cleanupRef.current.roB = null;
      }
    };
  }, [
    selectStart,
    selectEnd,
    hysteresis,
    smoothness,
    observeLayout,
    scroller,
    minSpanPx,
    onUpdate,
  ]);

  return ref;
}

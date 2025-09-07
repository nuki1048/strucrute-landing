// useSmoothedScrollBetween.ts
import React from "react";
import { damp, clamp01 } from "../utils/animationUtils";

type Options = {
  hysteresis?: number;
  smoothness?: number;
  observeLayout?: boolean;
  scroller?: HTMLElement | Window;
  minSpanPx?: number;
  /** NEW: called after each tick (state is updated) */
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
      const r = el.getBoundingClientRect().top;
      return (
        (scroller === window
          ? window.scrollY || window.pageYOffset || 0
          : (scroller as HTMLElement).scrollTop) + r
      );
    };

    const anchor = () => {
      let s = getDocY(a);
      let e = getDocY(b);
      if (e < s) [s, e] = [e, s];
      state.startY = s;
      state.endY = e;
      state.span = Math.max(minSpanPx, e - s);
      onUpdate?.(); // redraw once when anchors change
    };

    anchor();
    const onResize = () => anchor();
    window.addEventListener("resize", onResize, { passive: true });

    let roA: ResizeObserver | undefined;
    let roB: ResizeObserver | undefined;
    if (observeLayout && "ResizeObserver" in window) {
      roA = new ResizeObserver(anchor);
      roB = new ResizeObserver(anchor);
      roA.observe(a);
      roB.observe(b);
    }
    const onLoad = () => anchor();
    window.addEventListener("load", onLoad);

    let raf = 0;
    const tick = (ts: number) => {
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

      onUpdate?.(); // ⬅ notify scene to invalidate when needed
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
      roA?.disconnect?.();
      roB?.disconnect?.();
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

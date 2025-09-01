import React from "react";

export const useSizeRef = <T extends HTMLElement>() => {
  const ref = React.useRef<T | null>(null);
  const [size, set] = React.useState({ w: 0, h: 0 });
  React.useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      set({ w: r.width, h: r.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, size } as const;
};

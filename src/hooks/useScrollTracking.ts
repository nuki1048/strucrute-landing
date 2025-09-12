import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { track } from "@vercel/analytics";

export const useScrollTracking = () => {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    let maxScroll = 0;
    const milestones = [25, 50, 75, 90, 100];
    const tracked = new Set();

    const trackScroll = ({ scroll }: { scroll: number }) => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scroll / docHeight) * 100);

      maxScroll = Math.max(maxScroll, scrollPercent);

      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !tracked.has(milestone)) {
          tracked.add(milestone);

          track("scroll", {
            event_category: "engagement",
            event_label: `${milestone}%`,
            value: milestone,
          });
        }
      });
    };

    lenis.on("scroll", trackScroll);

    return () => {
      lenis.off("scroll", trackScroll);
    };
  }, [lenis]);
};

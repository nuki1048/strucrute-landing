import { useEffect } from "react";
import { track } from "@vercel/analytics";

export const useExitTracking = () => {
  useEffect(() => {
    const exitData = {
      page: window.location.pathname,
      timeOnPage: 0,
      scrollDepth: 0,
      exitElement: "",
    };

    const startTime = Date.now();

    // Track scroll depth
    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      exitData.scrollDepth = Math.round((scrollTop / docHeight) * 100);
    };

    // Track time on page
    const updateTimeOnPage = () => {
      exitData.timeOnPage = Math.round((Date.now() - startTime) / 1000);
    };

    // Before user leaves
    const handleBeforeUnload = () => {
      updateTimeOnPage();
      trackScrollDepth();

      track("exit_page", {
        page: exitData.page,
        time_on_page: exitData.timeOnPage,
        scroll_depth: exitData.scrollDepth,
        exit_element: exitData.exitElement,
      });

      // Optional: Show confirmation dialog
      // e.preventDefault();
      // e.returnValue = '';
    };

    // Track clicks on external links
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link) {
        const href = link.getAttribute("href");
        if (
          href &&
          (href.startsWith("http") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:"))
        ) {
          exitData.exitElement = `link:${href}`;
          track("exit_external_link", {
            page: exitData.page,
            external_url: href,
            time_on_page: Math.round((Date.now() - startTime) / 1000),
          });
        }
      }
    };

    // Track clicks on close buttons, back buttons, etc.
    const handleExitClicks = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches("[data-exit-trigger]")) {
        exitData.exitElement =
          target.getAttribute("data-exit-trigger") || "unknown";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("click", handleLinkClick);
    window.addEventListener("click", handleExitClicks);
    window.addEventListener("scroll", trackScrollDepth, { passive: true });

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("click", handleLinkClick);
      window.removeEventListener("click", handleExitClicks);
      window.removeEventListener("scroll", trackScrollDepth);
    };
  }, []);
};

import { useEffect, useState } from "react";

export const useLayoutReady = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for fonts to load
    const checkFonts = () => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          // Additional delay to ensure all components are rendered
          setTimeout(() => {
            setIsReady(true);
          }, 1000);
        });
      } else {
        // Fallback for browsers without font loading API
        setTimeout(() => {
          setIsReady(true);
        }, 2000);
      }
    };

    // Check if DOM is ready
    if (document.readyState === "complete") {
      checkFonts();
    } else {
      window.addEventListener("load", checkFonts);
      return () => window.removeEventListener("load", checkFonts);
    }
  }, []);

  return isReady;
};

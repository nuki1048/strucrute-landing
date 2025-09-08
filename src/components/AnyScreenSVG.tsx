/* eslint-disable @typescript-eslint/no-unused-expressions */
import svgUrl from "../assets/any-screen.svg?url";
import { useEffect, useRef } from "react";

export default function AnyScreenSVG({
  className,
  isActive,
}: {
  className?: string;
  isActive?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let abort = false;
    (async () => {
      const html = await fetch(svgUrl, { cache: "force-cache" }).then((r) =>
        r.text()
      );
      if (abort || !ref.current) return;
      ref.current.innerHTML = html;

      const root = ref.current.querySelector("svg");
      if (root) {
        const svgClass = isActive ? "active" : "";
        root.classList.remove(svgClass);
        (root as unknown as HTMLElement).offsetHeight;
        root.classList.add(svgClass);
      }
    })();
    return () => {
      abort = true;
    };
  }, [isActive]);

  return <div ref={ref} className={className} id='any-screen-svg' />;
}

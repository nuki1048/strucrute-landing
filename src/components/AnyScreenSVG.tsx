import { Suspense } from "react";
import AnyScreenSVG from "../assets/any-screen.svg";

export default function HeroVisual({
  isActive = false,
}: {
  isActive?: boolean;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <img
        src={AnyScreenSVG}
        className={`${isActive ? "active" : ""}`}
        loading='lazy'
      />
    </Suspense>
  );
}

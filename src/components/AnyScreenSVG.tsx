import AnyScreenSVG from "../assets/any-screen.svg?react";

export default function HeroVisual({
  isActive = false,
}: {
  isActive?: boolean;
}) {
  return <AnyScreenSVG className={`${isActive ? "active" : ""}`} />;
}

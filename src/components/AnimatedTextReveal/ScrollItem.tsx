import { MotionSpan } from "./ScrollText";
import { MotionValue, useTransform } from "framer-motion";

type ScrollItemProps = {
  index: number;
  axis: "x" | "y";
  from: number;
  progress: MotionValue<number>;
  staggerProg: number; // progress offset between items (0..1)
  durProg: number; // progress window for each item (0..1)
  children: React.ReactNode;
};

/** One hook-set per item, isolated so hooks order stays stable */
const ScrollItem: React.FC<ScrollItemProps> = ({
  index,
  axis,
  from,
  progress,
  staggerProg,
  durProg,
  children,
}) => {
  const start = Math.max(0, index * staggerProg);
  const end = Math.min(1, start + durProg);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const translate = useTransform(opacity, (v) => (1 - v) * from);
  return (
    <MotionSpan
      style={{ opacity, [axis]: translate } as any}
      display='inline-block'
      aria-hidden='true'
    >
      {children}
    </MotionSpan>
  );
};

export default ScrollItem;

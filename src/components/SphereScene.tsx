// Sphere.tsx - The Most Beautiful Sphere You've Ever Seen! 🌟
import { useState, useEffect, memo } from "react";
import NeonLooperR3F, { type NeonSphereProps } from "./Sphere";

// 🎭 This component is so fancy, it needs its own scene!
// 🚀 Prepare to be amazed by the power of React + Three.js
// 💫 Warning: May cause excessive "ooh" and "aah" sounds
export default memo(function SphereScene({ ...props }: NeonSphereProps) {
  // 🎯 State management so smooth, it's like butter on a hot pancake
  const [layers, setLayers] = useState(0);

  // ⚡ useEffect that's faster than your ex leaving you on read
  useEffect(() => {
    if (layers < 120) {
      const id = setInterval(() => {
        setLayers((l) => l + 1); // use functional update (because we're fancy like that)
      }, 25); // 10ms intervals - we're not playing around here!
      return () => clearInterval(id); // Cleanup like a responsible adult
    }
  }, [layers]);

  // 🎨 Return the masterpiece that will make your users go "WOW!"
  return <NeonLooperR3F {...props} layers={layers} />;
});

// Sphere.tsx - The Most Beautiful Sphere You've Ever Seen! 🌟
import { useState, useEffect, memo } from "react";
import NeonLooperR3F from "./SphereSceneR3F";
import type { SphereSceneProps } from "./SphereScene";
import { useMediaQuery } from "@chakra-ui/react";

// 🎭 This component is so fancy, it needs its own scene!
// 🚀 Prepare to be amazed by the power of React + Three.js
// 💫 Warning: May cause excessive "ooh" and "aah" sounds
export default memo(function SphereScene({
  layers: layersCount = 120,
  ...props
}: SphereSceneProps) {
  // 🎯 State management so smooth, it's like butter on a hot pancake
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]);
  const [layers, setLayers] = useState(isMobile ? 120 : 0);

  // ⚡ useEffect that's faster than your ex leaving you on read
  useEffect(() => {
    if (isMobile) {
      setLayers(120);
    }
    if (layers < layersCount) {
      const id = setInterval(() => {
        setLayers((l) => l + 1); // use functional update (because we're fancy like that)
      }, 5); // 10ms intervals - we're not playing around here!
      return () => clearInterval(id); // Cleanup like a responsible adult
    }
  }, [layers, layersCount, isMobile]);

  // 🎨 Return the masterpiece that will make your users go "WOW!"
  return <NeonLooperR3F {...props} layers={layers} />;
});

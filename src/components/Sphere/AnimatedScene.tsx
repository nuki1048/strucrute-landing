// Sphere.tsx - Debug version
import { useState, useEffect, memo } from "react";
import NeonLooperR3F from "./SphereSceneR3F";
import type { SphereSceneProps } from "./SphereScene";
import { useMediaQuery } from "@chakra-ui/react";

export default memo(function SphereScene({
  layers: layersCount = 120,
  ...props
}: SphereSceneProps) {
  const [isMobile] = useMediaQuery(["(max-width: 768px)"]);
  const [layers, setLayers] = useState(isMobile ? 80 : 120);
  const [error, setError] = useState<string | null>(null);

  // Simple layer loading
  useEffect(() => {
    if (layers < layersCount) {
      const interval = setInterval(() => {
        setLayers((l) => {
          const next = l + 2;
          if (next >= layersCount) {
            clearInterval(interval);
            return layersCount;
          }
          return next;
        });
      }, 10);

      return () => clearInterval(interval);
    }
  }, [layers, layersCount]);

  // Error boundary for debugging
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Sphere error:", event.error);
      setError(event.error?.message || "Unknown error");
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (error) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          background: "#09090A",
        }}
      >
        <div>Sphere Error: {error}</div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <NeonLooperR3F {...props} layers={layers} />
    </div>
  );
});

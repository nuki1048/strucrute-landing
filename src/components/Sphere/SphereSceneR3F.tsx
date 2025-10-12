import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { SphereScene, type SphereSceneProps } from "./SphereScene";
import { useEffect, useRef, useState } from "react";

export default function SphereSceneR3F(props: SphereSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        console.log(`Sphere visibility: ${visible ? "VISIBLE" : "HIDDEN"}`);
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={props.className}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "400px",
        position: "relative",
        ...props.style,
      }}
    >
      <Canvas
        orthographic
        frameloop={isVisible ? "always" : "demand"}
        dpr={[1, 1.4]}
        gl={{
          antialias: false,
          alpha: false,
          depth: false,
          stencil: false,
          powerPreference: "high-performance",
          premultipliedAlpha: true,
          failIfMajorPerformanceCaveat: false,
        }}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
        onError={(error) => {
          console.error("Canvas error:", error);
        }}
      >
        <color attach='background' args={["#09090A"]} />
        <SphereScene {...props} useInstancing={false} isVisible={isVisible} />
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom
            intensity={0.9}
            luminanceThreshold={0}
            luminanceSmoothing={0.1}
            radius={0.9}
            mipmapBlur
            height={360}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

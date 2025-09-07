import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { SphereScene, type SphereSceneProps } from "./SphereScene";

export default function SphereSceneR3F(props: SphereSceneProps) {
  return (
    <div
      className={props.className}
      style={{ width: "100%", height: "100%", ...props.style }}
    >
      <Canvas
        orthographic
        frameloop='always'
        dpr={[1, 1.4]}
        gl={{
          antialias: false,
          alpha: false,
          depth: false,
          stencil: false,
          powerPreference: "high-performance",
          premultipliedAlpha: true,
          failIfMajorPerformanceCaveat: true,
        }}
        style={{ display: "block" }}
      >
        <color attach='background' args={["#09090A"]} />

        <SphereScene {...props} useInstancing={false} />

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

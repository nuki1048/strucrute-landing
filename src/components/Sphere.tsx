import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

/* ---------------- Utils ---------------- */
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutExpo = (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));

/* ---------------- Scroll helpers ---------------- */
function useScrollProgressBetween(selectStart: string, selectEnd: string) {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const startEl = document.querySelector(selectStart) as HTMLElement | null;
    const endEl = document.querySelector(selectEnd) as HTMLElement | null;
    if (!startEl || !endEl) return;

    const onScroll = () => {
      const startTop = startEl.getBoundingClientRect().top + window.scrollY;
      const endTop = endEl.getBoundingClientRect().top + window.scrollY;
      const span = Math.max(1, endTop - startTop);
      const y = window.scrollY;
      setProgress(clamp01((y - startTop) / span));
    };
    onScroll();
    const opts: AddEventListenerOptions = { passive: true };
    window.addEventListener("scroll", onScroll, opts);
    window.addEventListener("resize", onScroll, opts as never);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [selectStart, selectEnd]);

  return progress;
}

/* ---------------- Optional core glow (оставил выключенным) ---------------- */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// function CoreOrb({
//   color = "#6860FF",
//   radius = 80,
//   position = [0, 0, 0],
//   speedMul = 1.0,
//   phase0 = 0.0,
//   glowStrength = 1.0,
//   glowSharpness = 3.0,
//   pulseStrength = 0.2,
//   startupRampSec = 1.2,
//   startupDelaySec = 0.0,
// }: {
//   color?: string;
//   radius?: number;
//   position?: [number, number, number];
//   speedMul?: number;
//   phase0?: number;
//   glowStrength?: number;
//   glowSharpness?: number;
//   pulseStrength?: number;
//   startupRampSec?: number;
//   startupDelaySec?: number;
// }) {
//   const matRef = React.useRef<THREE.ShaderMaterial>(null!);
//   const startRef = React.useRef(0);
//   const uniforms = React.useMemo(
//     () => ({
//       uColor: { value: new THREE.Color(color) },
//       uTime: { value: 0 },
//       uSpeedMul: { value: speedMul },
//       uPhase0: { value: phase0 },
//       uGlowStrength: { value: glowStrength },
//       uGlowSharpness: { value: glowSharpness },
//       uPulseStrength: { value: pulseStrength },
//       uRamp: { value: 0 },
//       uDelay: { value: startupDelaySec },
//       uRampDur: { value: Math.max(0.001, startupRampSec) },
//     }),
//     [
//       color,
//       speedMul,
//       phase0,
//       glowStrength,
//       glowSharpness,
//       pulseStrength,
//       startupDelaySec,
//       startupRampSec,
//     ]
//   );
//   const vertex = `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `;
//   const fragment = `
//     precision highp float;
//     varying vec2 vUv;
//     uniform float uTime;
//     uniform vec3  uColor;
//     uniform float uSpeedMul, uPhase0, uGlowStrength, uGlowSharpness, uPulseStrength, uRamp;
//     void main(){
//       vec2 p = vUv*2.0-1.0;
//       float d = length(p);
//       float wave = sin(uTime*uSpeedMul+uPhase0);
//       float pulse = 1.0 + wave*uPulseStrength;
//       float edge = pow(smoothstep(1.0, 0.0, d), uGlowSharpness);
//       float a = edge * pulse * uGlowStrength * uRamp;
//       gl_FragColor = vec4(uColor*a, a);
//     }`;
//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();
//     if (!matRef.current) return;
//     matRef.current.uniforms.uTime.value = t;
//     const elapsed = t - (startRef.current || (startRef.current = t));
//     const tAfterDelay = Math.max(0, elapsed - uniforms.uDelay.value);
//     const raw = Math.min(1, tAfterDelay / uniforms.uRampDur.value);
//     matRef.current.uniforms.uRamp.value = easeOutExpo(raw);
//   });
//   return (
//     <mesh position={position}>
//       <planeGeometry args={[radius, radius]} />
//       <shaderMaterial
//         ref={matRef}
//         vertexShader={vertex}
//         fragmentShader={fragment}
//         uniforms={uniforms}
//         transparent
//         depthWrite={false}
//         blending={THREE.AdditiveBlending}
//       />
//     </mesh>
//   );
// }

/* ---------------- Public props ---------------- */
export type NeonSphereProps = {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  layers?: number;
  sphereWidth?: number;
  sphereHeight?: number;
  pulsePeriodSec?: number;
  layerPhaseCycles?: number;
  layerSpeedJitter?: number;
  layerPhaseJitter?: number;
  scalePulseAmt?: number;
  spinSpeed?: number;

  scrollStartSelector?: string;
  scrollEndSelector?: string;
  minScale?: number;
  maxScale?: number;

  startTopPadding?: number;
  endYOffset?: number;

  /** start fading out near the end of the scroll range (0..1), default 0.85 */
  fadeOutFromProgress?: number;
  /** when fade < this, set group.visible=false to skip draws, default 0.02 */
  hideBelowAlpha?: number;
};

/* ---------------- Scene ---------------- */
function NeonLooperScene({
  color = "#6860FF",
  layers = 80,
  sphereWidth = 400,
  sphereHeight = 400,
  pulsePeriodSec = 6,
  layerPhaseCycles = 1.0,
  layerSpeedJitter = 0.15,
  layerPhaseJitter = 0.6,
  scalePulseAmt = 0.01,
  spinSpeed = 0.03,

  scrollStartSelector = "#hero",
  scrollEndSelector = "#section-2",
  minScale = 0.9,
  maxScale = 1.35,
  startTopPadding = 24,
  endYOffset = 0,

  fadeOutFromProgress = 0.85,
  hideBelowAlpha = 0.02,
}: NeonSphereProps) {
  const { gl, size, camera } = useThree();
  const rootRef = React.useRef<THREE.Group>(null!);

  /** Один общий geometry, никаких пересозданий */
  const unitCircle = React.useMemo(() => {
    const SEG = 64;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= SEG; i++) {
      const a = (i / SEG) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a), Math.sin(a), 0));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  /** Материалы оставляем индивидуальными ради анимации opacity */
  const makeMaterial = React.useCallback(() => {
    const m = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    return m;
  }, [color]);

  /** Предвычисленные параметры слоёв */
  const layersData = React.useRef<
    {
      line: THREE.Line;
      baseOpacity: number;
      baseScaleX: number;
      baseScaleY: number;
      t: number;
      phaseAcross: number;
      phase0: number;
      speedMul: number;
    }[]
  >([]);

  const progress = useScrollProgressBetween(
    scrollStartSelector,
    scrollEndSelector
  );

  /* Настройки GL + камера */
  React.useEffect(() => {
    gl.setClearColor(0x0b0b0d, 1);
    gl.info.autoReset = false;
  }, [gl]);

  React.useEffect(() => {
    const cam = camera as THREE.OrthographicCamera;
    cam.left = 0;
    cam.right = size.width;
    cam.top = size.height;
    cam.bottom = 0;
    cam.near = -500;
    cam.far = 500;
    cam.position.set(0, 0, 1);
    cam.updateProjectionMatrix();
    rootRef.current?.position.set(size.width / 2, size.height / 2, 0);
  }, [camera, size]);

  /* Хеш без аллокаций */
  const hash = React.useCallback((x: number) => {
    const s = Math.sin(x * 127.1) * 43758.5453;
    return s - Math.floor(s);
  }, []);

  /* ----- Ленивая инициализация линий партиями ----- */
  React.useEffect(() => {
    const root = rootRef.current;
    for (const it of layersData.current) {
      root.remove(it.line);
      (it.line.material as THREE.Material).dispose();
      it.line.geometry.dispose?.();
    }
    layersData.current = [];

    const rotAmp = THREE.MathUtils.degToRad(25);
    const W = -4,
      H = 1;

    const BATCH = 20;
    let created = 0;

    const createBatch = () => {
      const end = Math.min(created + BATCH, layers);
      for (let i = created; i < end; i++) {
        const t = i / Math.max(1, layers - 1);
        const w = Math.max(80, sphereWidth + W * i);
        const h = Math.max(80, sphereHeight + H * i);
        const rx = w / 2,
          ry = h / 2;

        const mat = makeMaterial();
        (mat as THREE.LineBasicMaterial).opacity = 0.6 * (1 - t * 0.4);

        const line = new THREE.Line(unitCircle, mat);
        line.rotation.z = Math.sin(t * Math.PI) * rotAmp;
        line.scale.set(rx, ry, 1);
        line.matrixAutoUpdate = true;
        line.frustumCulled = false;
        root.add(line);

        const r = hash(i + 13.37);
        const speedMul = 1 + (r * 2 - 1) * layerSpeedJitter;
        const phase0 = (r * 2 - 1) * layerPhaseJitter;

        layersData.current.push({
          line,
          baseOpacity: (mat as THREE.LineBasicMaterial).opacity,
          baseScaleX: rx,
          baseScaleY: ry,
          t,
          phaseAcross: 2 * Math.PI * layerPhaseCycles * t,
          phase0,
          speedMul,
        });
      }
      created = end;
      if (created < layers) {
        if ("requestIdleCallback" in window) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).requestIdleCallback(createBatch);
        } else {
          requestAnimationFrame(createBatch);
        }
      }
    };

    createBatch();
  }, [
    layers,
    sphereWidth,
    sphereHeight,
    layerPhaseCycles,
    layerPhaseJitter,
    layerSpeedJitter,
    hash,
    makeMaterial,
    unitCircle,
  ]);

  /* ---- Анимация ---- */
  const startRef = React.useRef<number>(performance.now());
  useFrame(() => {
    const time = (performance.now() - startRef.current) / 1000;
    const omega = (2 * Math.PI) / pulsePeriodSec;
    const root = rootRef.current;

    // Eased scroll progress (0..1)
    const p = easeOutCubic(progress);

    // Global fade multiplier: 1 → 0 over the tail from fadeOutFromProgress..1
    const fadeRange = Math.max(1e-4, 1 - clamp01(fadeOutFromProgress));
    const fadeMul = easeOutCubic(
      clamp01((1 - p) / fadeRange) // p<=start => ~1, p=1 => 0
    );

    // Per-layer pulsing/opacity/scale
    const arr = layersData.current;
    for (let i = 0; i < arr.length; i++) {
      const L = arr[i];
      const phase = omega * time * L.speedMul + L.phaseAcross + L.phase0;
      const wave = 0.5 + 0.5 * Math.sin(phase);

      const mat = L.line.material as THREE.LineBasicMaterial;
      mat.opacity = L.baseOpacity * (0.75 + 0.25 * wave) * fadeMul;

      if (scalePulseAmt > 0) {
        const s = 1 + (wave - 0.5) * 2 * scalePulseAmt;
        L.line.scale.set(L.baseScaleX * s, L.baseScaleY * s, 1);
      }
    }

    // Hide the whole group when essentially invisible (skip draw calls)
    root.visible = fadeMul > hideBelowAlpha;

    // Global rotation
    root.rotation.z = time * spinSpeed;

    // Scroll-driven position/scale
    const startY = size.height - sphereHeight * 0.5 - startTopPadding;
    const endY = size.height * 0.5 + endYOffset;
    const y = THREE.MathUtils.lerp(startY, endY, p);
    const s = THREE.MathUtils.lerp(minScale, maxScale, p);

    root.scale.set(s, s, 1);
    root.position.set(size.width / 2, y, 0);
  });

  return (
    <group ref={rootRef}>
      {/* Optionally enable soft "core" glows and they'll also honor fadeMul if you wire it in */}
      {/* <CoreOrb radius={600} position={[50, 0, 0]} glowStrength={2} glowSharpness={4.0} pulseStrength={0.17} /> */}
    </group>
  );
}

export default function NeonLooperR3F(props: NeonSphereProps) {
  return (
    <div
      className={props.className}
      style={{ width: "100%", height: "100%", ...props.style }}
    >
      <Canvas
        orthographic
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={1}
        style={{ display: "block" }}
      >
        <color attach='background' args={["#09090A"]} />
        <NeonLooperScene {...props} />
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom
            intensity={0.9}
            luminanceThreshold={0}
            luminanceSmoothing={0.35}
            radius={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

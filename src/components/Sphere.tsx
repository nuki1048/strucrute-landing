import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

/* ---------------- utils ---------------- */
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/* ---------------- scroll (with overscroll) ---------------- */
function useScrollBetweenWithOverscroll(
  selectStart: string,
  selectEnd: string
) {
  const [state, setState] = React.useState({ clamped: 0, raw: 0, overPx: 0 });

  React.useEffect(() => {
    const a = document.querySelector(selectStart) as HTMLElement | null;
    const b = document.querySelector(selectEnd) as HTMLElement | null;
    if (!a || !b) return;

    const onScroll = () => {
      const startTop = a.getBoundingClientRect().top + window.scrollY;
      const endTop = b.getBoundingClientRect().top + window.scrollY;
      const span = Math.max(1, endTop - startTop);
      const y = window.scrollY;
      const raw = (y - startTop) / span;
      const clamped = clamp01(raw);
      const overPx = Math.max(0, y - endTop);
      setState({ clamped, raw, overPx });
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

  return state;
}

/* ---------------- types ---------------- */
export type NeonSphereProps = {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  layers?: number;
  sphereWidth?: number; // base design size (px)
  sphereHeight?: number; // base design size (px)
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

  startTopPadding?: number; // <-- we keep this respected always
  endYOffset?: number;

  fadeOutFromProgress?: number;
  hideBelowAlpha?: number;
  fadeTailPx?: number;
};

/* ---------------- scene ---------------- */
function NeonLooperScene({
  color = "#6860FF",
  layers = 80,
  sphereWidth = 660,
  sphereHeight = 740,
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

  fadeOutFromProgress,
  hideBelowAlpha = 0.02,
  fadeTailPx = 600,
}: NeonSphereProps) {
  const { gl, size, camera } = useThree();
  const rootRef = React.useRef<THREE.Group>(null!);

  /* geometry */
  const unitCircle = React.useMemo(() => {
    const SEG = 64;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= SEG; i++) {
      const a = (i / SEG) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a), Math.sin(a), 0));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  /* material */
  const makeMaterial = React.useCallback(
    () =>
      new THREE.LineBasicMaterial({
        color,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [color]
  );

  /* layer state */
  type L = {
    line: THREE.Line;
    baseOpacity: number;
    baseScaleX: number;
    baseScaleY: number;
    t: number;
    phaseAcross: number;
    phase0: number;
    speedMul: number;
  };
  const layersData = React.useRef<L[]>([]);

  const { clamped: progress, overPx } = useScrollBetweenWithOverscroll(
    scrollStartSelector,
    scrollEndSelector
  );

  /* GL + camera */
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

  const hash = React.useCallback((x: number) => {
    const s = Math.sin(x * 127.1) * 43758.5453;
    return s - Math.floor(s);
  }, []);

  /* build rings (batched) */
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
        line.frustumCulled = false;
        root.add(line);

        const r = hash(i + 13.37);
        layersData.current.push({
          line,
          baseOpacity: (mat as THREE.LineBasicMaterial).opacity,
          baseScaleX: rx,
          baseScaleY: ry,
          t,
          phaseAcross: 2 * Math.PI * layerPhaseCycles * t,
          phase0: (r * 2 - 1) * layerPhaseJitter,
          speedMul: 1 + (r * 2 - 1) * layerSpeedJitter,
        });
      }
      created = end;
      if (created < layers) {
        "requestIdleCallback" in window
          ? (window as any).requestIdleCallback(createBatch)
          : requestAnimationFrame(createBatch);
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

  /* ---------- RESPONSIVE FIT: worst-case envelope ---------- */
  const viewportPadding = 32; // bump to 40–56 if bloom hits edges

  // Circle radius that bounds ALL rings at ANY rotation + pulsing.
  const computeEnvelopeRadius = React.useCallback(() => {
    // widest ring near i=0 because W = -4
    const rx0 = Math.max(80, sphereWidth) * 0.5;
    // tallest ring at i=layers-1 because H = 1
    const hLast = Math.max(80, sphereHeight + 1 * Math.max(0, layers - 1));
    const ryLast = hLast * 0.5;

    let R = Math.max(rx0, ryLast);
    if (scalePulseAmt > 0) R *= 1 + scalePulseAmt; // include per-ring pulsing
    return R; // world units (ortho == pixels)
  }, [sphereWidth, sphereHeight, layers, scalePulseAmt]);

  // Per-frame cap so sphere always fits viewport (never upscale beyond base)
  const fitCap = React.useCallback(
    (vw: number, vh: number) => {
      const R = computeEnvelopeRadius();
      const availW = Math.max(1, vw - viewportPadding * 2);
      const availH = Math.max(1, vh - viewportPadding * 2);
      const cap = Math.min(availW / (2 * R), availH / (2 * R));
      return Math.min(1, cap);
    },
    [computeEnvelopeRadius]
  );

  /* animate */
  const startRef = React.useRef<number>(performance.now());
  useFrame(() => {
    const time = (performance.now() - startRef.current) / 1000;
    const omega = (2 * Math.PI) / pulsePeriodSec;
    const root = rootRef.current;

    // fades
    const p = easeOutCubic(progress);
    let fadeMul = 1;
    if (typeof fadeOutFromProgress === "number") {
      const fadeRange = Math.max(1e-4, 1 - clamp01(fadeOutFromProgress));
      const preEndMul = easeOutCubic(clamp01((1 - p) / fadeRange));
      fadeMul *= preEndMul;
    }
    if (overPx > 0) {
      const postMul =
        1 - easeOutCubic(clamp01(overPx / Math.max(1, fadeTailPx)));
      fadeMul *= postMul;
    }

    // per-layer anim
    for (let i = 0; i < layersData.current.length; i++) {
      const L = layersData.current[i];
      const phase = omega * time * L.speedMul + L.phaseAcross + L.phase0;
      const wave = 0.5 + 0.5 * Math.sin(phase);
      const mat = L.line.material as THREE.LineBasicMaterial;
      mat.opacity = L.baseOpacity * (0.75 + 0.25 * wave) * fadeMul;

      if (scalePulseAmt > 0) {
        const sWave = 1 + (wave - 0.5) * 2 * scalePulseAmt;
        L.line.scale.set(L.baseScaleX * sWave, L.baseScaleY * sWave, 1);
      }
    }

    root.visible = fadeMul > hideBelowAlpha;

    // spin
    root.rotation.z = time * spinSpeed;

    // ---- final transform ----
    // cap scroll-driven scale by the fit so the sphere always fits,
    // but ALWAYS compute Y using startTopPadding/endYOffset so it starts higher.
    const scrollScale = THREE.MathUtils.lerp(minScale, maxScale, p);
    const cap = fitCap(size.width, size.height);
    const finalScale = Math.min(scrollScale, cap);

    const y = THREE.MathUtils.lerp(
      size.height - sphereHeight * 0.5 - startTopPadding,
      size.height * 0.5 + endYOffset,
      p
    );

    root.scale.set(finalScale, finalScale, 1);
    root.position.set(size.width / 2, y, 0);
  });

  return <group ref={rootRef} />;
}

/* ---------------- wrapper ---------------- */
export default function NeonLooperR3F(props: NeonSphereProps) {
  return (
    <div
      className={props.className}
      style={{ width: "100%", height: "100%", ...props.style }}
    >
      <Canvas
        orthographic
        gl={{ antialias: true, powerPreference: "high-performance" }}
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

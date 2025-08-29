import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

/* ---------------- utils ---------------- */
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const damp = THREE.MathUtils.damp;

/* ---------- scroll sampler (anchored + damped) ---------- */
function useSmoothedScrollBetween(
  selectStart: string,
  selectEnd: string,
  {
    hysteresis = 0.0005,
    smoothness = 10,
    observeLayout = true,
    scroller = typeof window !== "undefined"
      ? window
      : (undefined as unknown as HTMLElement | Window),
    minSpanPx = 64,
  } = {}
) {
  const ref = React.useRef({
    startY: 0,
    endY: 1,
    span: 1,
    raw: 0,
    clamped: 0,
    overPx: 0,
    smooth: 0,
    lastTs: performance.now(),
  });

  React.useEffect(() => {
    const a = document.querySelector(selectStart) as HTMLElement | null;
    const b = document.querySelector(selectEnd) as HTMLElement | null;
    if (!a || !b || !scroller) return;

    const state = ref.current;

    const getScrollTop = () =>
      scroller === window
        ? window.scrollY || window.pageYOffset || 0
        : (scroller as HTMLElement).scrollTop;

    const getDocY = (el: HTMLElement) => {
      const r = el.getBoundingClientRect().top;
      return (
        (scroller === window
          ? window.scrollY || window.pageYOffset || 0
          : (scroller as HTMLElement).scrollTop) + r
      );
    };

    const anchor = () => {
      let s = getDocY(a);
      let e = getDocY(b);
      if (e < s) [s, e] = [e, s];
      state.startY = s;
      state.endY = e;
      state.span = Math.max(minSpanPx, e - s);
    };

    anchor();
    const onResize = () => anchor();
    window.addEventListener("resize", onResize, { passive: true });

    let roA: ResizeObserver | undefined;
    let roB: ResizeObserver | undefined;
    if (observeLayout && "ResizeObserver" in window) {
      roA = new ResizeObserver(anchor);
      roB = new ResizeObserver(anchor);
      roA.observe(a);
      roB.observe(b);
    }
    const onLoad = () => anchor();
    window.addEventListener("load", onLoad);

    let raf = 0;
    const tick = (ts: number) => {
      const dt = Math.max(0, (ts - state.lastTs) / 1000);
      state.lastTs = ts;

      const y = getScrollTop();
      const raw = (y - state.startY) / state.span;

      let clamped = clamp01(raw);
      if (clamped < hysteresis) clamped = 0;
      else if (clamped > 1 - hysteresis) clamped = 1;

      const overPx = Math.max(0, y - state.endY);

      state.smooth = damp(state.smooth, clamped, smoothness, dt);
      state.raw = raw;
      state.clamped = clamped;
      state.overPx = overPx;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
      roA?.disconnect?.();
      roB?.disconnect?.();
    };
  }, [
    selectStart,
    selectEnd,
    hysteresis,
    smoothness,
    observeLayout,
    scroller,
    minSpanPx,
  ]);

  return ref;
}

/* ---------------- types ---------------- */
export type SphereSceneProps = {
  color?: string;
  className?: string;
  style?: React.CSSProperties;
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

  startTopPadding?: number;
  endYOffset?: number;

  minScale?: number;
  maxScale?: number;

  /** cap scale to fit viewport (default true) */
  clampToViewport?: boolean;
  /** if true, never allow scale above 1 (original behavior). default false */
  neverUpscale?: boolean;

  fadeOutFromProgress?: number; // 0..1 or 0..100
  hideBelowAlpha?: number;
  fadeTailPx?: number;

  scrollElement?: HTMLElement | null;
};

/* ---------------- scene ---------------- */
export function SphereScene({
  color = "#6860FF",
  layers = 120,
  sphereWidth = 660,
  sphereHeight = 740,
  pulsePeriodSec = 6,
  layerPhaseCycles = 1.0,
  layerSpeedJitter = 0.15,
  layerPhaseJitter = 0.6,
  scalePulseAmt = 0.01,
  spinSpeed = 0.03,

  scrollStartSelector = "#hero",
  scrollEndSelector = "#section-2-end",

  startTopPadding = 50,
  endYOffset = -600,

  minScale = 0.8,
  maxScale = 5,
  clampToViewport = true,

  fadeOutFromProgress,
  hideBelowAlpha = 0.02,
  fadeTailPx = 600,

  scrollElement = null,
}: SphereSceneProps) {
  const { gl, size, camera } = useThree();
  const rootRef = React.useRef<THREE.Group>(null!);

  /* geometry */
  const unitCircle = React.useMemo(() => {
    const SEG = 128;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= SEG; i++) {
      const a = (i / SEG) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a), Math.sin(a), 0));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  /* material */
  const makeMaterial = React.useCallback(() => {
    const m = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    (m as THREE.LineBasicMaterial).toneMapped = false;
    return m;
  }, [color]);

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

  // progress (0..1)
  const scrollRef = useSmoothedScrollBetween(
    scrollStartSelector,
    scrollEndSelector,
    { scroller: (scrollElement as HTMLElement) || window }
  );

  /* GL + camera */
  React.useEffect(() => {
    gl.setClearColor(0x0b0b0d, 1);
    gl.info.autoReset = false;
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.NoToneMapping;
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
    rootRef.current?.position.set(
      size.width / 2,
      size.height - startTopPadding,
      0
    );
  }, [camera, size, startTopPadding]);

  const hash = React.useCallback((x: number) => {
    const s = Math.sin(x * 127.1) * 43758.5453;
    return s - Math.floor(s);
  }, []);
  const [isVisible, setIsVisible] = React.useState(true);

  /* build rings (batched) */
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || !unitCircle) return;

    for (const it of layersData.current) {
      root.remove(it.line);
      const m = it.line.material as THREE.Material | THREE.Material[];
      if (Array.isArray(m)) m.forEach((mm) => mm.dispose());
      else m?.dispose();
      it.line.geometry?.dispose?.();
    }
    layersData.current = [];

    const rotAmp = THREE.MathUtils.degToRad(25);
    const W = -4,
      H = 1;

    const linesToAdd: THREE.Line[] = [];
    const newLayers: Array<L> = [];

    for (let i = 0; i < layers; i++) {
      const t = i / Math.max(1, layers - 1);
      const w = Math.max(80, sphereWidth + W * i);
      const h = Math.max(80, sphereHeight + H * i);
      const rx = w * 0.5;
      const ry = h * 0.5;

      const mat = makeMaterial();
      (mat as THREE.LineBasicMaterial).opacity = 0.6 * (1 - t * 0.4);

      const line = new THREE.Line(unitCircle, mat);
      line.rotation.z = Math.sin(t * Math.PI) * rotAmp;
      line.scale.set(rx, ry, 1);
      line.frustumCulled = false;

      const r = hash(i + 13.37);

      newLayers.push({
        line,
        baseOpacity: (mat as THREE.LineBasicMaterial).opacity,
        baseScaleX: rx,
        baseScaleY: ry,
        t,
        phaseAcross: 2 * Math.PI * layerPhaseCycles * t,
        phase0: (r * 2 - 1) * layerPhaseJitter,
        speedMul: 1 + (r * 2 - 1) * layerSpeedJitter,
      });
      linesToAdd.push(line);
    }

    if (linesToAdd.length) root.add(...linesToAdd);
    layersData.current = newLayers;
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

  /* ---------- responsive fit cap ---------- */
  const viewportPadding = 96;
  const computeEnvelopeRadius = React.useCallback(() => {
    const rx0 = Math.max(80, sphereWidth) * 0.5;
    const hLast = Math.max(80, sphereHeight + 1 * Math.max(0, layers - 1));
    const ryLast = hLast * 0.5;
    let R = Math.max(rx0, ryLast);
    if (scalePulseAmt > 0) R *= 1 + scalePulseAmt;
    return R;
  }, [sphereWidth, sphereHeight, layers, scalePulseAmt]);

  const fitCap = React.useCallback(
    (vw: number, vh: number, pad: number = viewportPadding) => {
      const R = computeEnvelopeRadius();
      const availW = Math.max(1, vw - pad * 2);
      const availH = Math.max(1, vh - pad * 2);
      return Math.min(availW / (2 * R), availH / (2 * R));
    },
    [computeEnvelopeRadius, viewportPadding]
  );

  const smoothScaleRef = React.useRef(1);
  const startRef = React.useRef<number>(performance.now());

  React.useEffect(() => {
    if (!gl.domElement) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(gl.domElement);
    return () => obs.disconnect();
  }, [gl]);

  useFrame(() => {
    if (!isVisible) return;
    const time = (performance.now() - startRef.current) / 1000;
    const omega = (2 * Math.PI) / pulsePeriodSec;
    const root = rootRef.current;

    const { smooth: pSmooth, overPx } = scrollRef.current;
    const p = easeOutCubic(pSmooth); // eased for fades/position
    const scaleP = pSmooth; // linear for scale

    // fades
    let fadeStart = fadeOutFromProgress;
    if (typeof fadeStart === "number" && fadeStart > 1) {
      fadeStart = fadeStart > 100 ? 1 : fadeStart / 100;
    }
    let fadeMul = 1;
    if (typeof fadeStart === "number") {
      const fadeRange = Math.max(1e-4, 1 - clamp01(fadeStart));
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
        L.line.scale.x = L.baseScaleX * sWave;
        L.line.scale.y = L.baseScaleY * sWave;
      }
    }

    root.visible = fadeMul > hideBelowAlpha;

    // spin
    root.rotation.z = time * spinSpeed;

    // ---- Y follow (top edge -> center + offset) ----
    const halfH = 0.5 * sphereHeight * smoothScaleRef.current;
    const yStart = size.height - startTopPadding - halfH;
    const yEnd = size.height * 0.5 + endYOffset;
    const yFollow = THREE.MathUtils.lerp(yStart, yEnd, p);

    // ---- SCALE (linear progress; cap rules) ----
    const vw = size.width;
    const vh = typeof window !== "undefined" ? window.innerHeight : size.height;

    const scrollScale = THREE.MathUtils.lerp(minScale, maxScale, scaleP);

    const edgeGuard = THREE.MathUtils.smoothstep(0.85, 1.0, pSmooth); // 0..1 near the end
    const extraPad = 120 * edgeGuard; // add up to 120px padding close to the end
    const cap = clampToViewport
      ? fitCap(vw, vh, viewportPadding + extraPad) // pass a larger padding
      : Infinity;

    const targetScale = Math.min(scrollScale, cap);

    smoothScaleRef.current = THREE.MathUtils.lerp(
      smoothScaleRef.current,
      targetScale,
      0.12
    );

    root.position.set(vw / 2, yFollow, 0);
    root.scale.setScalar(smoothScaleRef.current);
  });

  return <group ref={rootRef} />;
}

/* ---------------- wrapper (keep/remove as you need) ---------------- */
export default function SphereSceneR3F(props: SphereSceneProps) {
  return (
    <div
      className={props.className}
      style={{ width: "100%", height: "100%", ...props.style }}
    >
      <Canvas
        orthographic
        dpr={1}
        gl={{
          antialias: false,
          alpha: true,
          depth: false,
          stencil: false,
          powerPreference: "high-performance",
          premultipliedAlpha: true,
          failIfMajorPerformanceCaveat: true,
        }}
        style={{ display: "block" }}
      >
        <color attach='background' args={["#09090A"]} />
        <SphereScene {...props} />
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

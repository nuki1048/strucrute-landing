/* eslint-disable @typescript-eslint/no-explicit-any */
// SphereScene.tsx
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useSmoothedScrollBetween } from "../../hooks/useSmoothedScrollBetween";
import { easeOutCubic, clamp01 } from "../../utils/animationUtils";
import React from "react";

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

  clampToViewport?: boolean;
  neverUpscale?: boolean;

  fadeOutFromProgress?: number; // 0..1 or 0..100
  hideBelowAlpha?: number;
  fadeTailPx?: number;

  scrollElement?: HTMLElement | null;

  /** NEW: single instanced draw (GPU) instead of many Lines (CPU). Default: true */
  useInstancing?: boolean;

  /** NEW: circle resolution (keeps 150 default for identical smoothness) */
  segments?: number;
};

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
  neverUpscale = false,

  fadeOutFromProgress,
  hideBelowAlpha = 0.02,
  fadeTailPx = 600,

  scrollElement = null,

  useInstancing = true,
  segments = 128,
}: SphereSceneProps) {
  const { gl, size, camera } = useThree();
  const rootRef = React.useRef<THREE.Group>(null!);
  const smoothScaleRef = React.useRef(1);
  const startRef = React.useRef<number>(performance.now());

  // Visibility gate (skip updates; with frameloop="demand" we'll also not render)
  // const [isVisiblge, setIsVisible] = React.useState(true);
  const isVisibleRef = React.useRef(true);
  React.useEffect(() => {
    isVisibleRef.current = true; // Always keep it visible
  }, []);

  // Scroll (with onUpdate callback to invalidate on demand)
  const scrollRef = useSmoothedScrollBetween(
    scrollStartSelector,
    scrollEndSelector,
    {
      scroller: (scrollElement as HTMLElement) || window,
    }
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
    // redraw once on layout change
  }, [camera, size, startTopPadding]);

  // Canvas in/out of viewport → stop everything when hidden
  React.useEffect(() => {
    // Disabled: Always keep sphere visible
    // if (!gl.domElement) return;
    // const obs = new IntersectionObserver(
    //   ([entry]) => setIsVisible(entry.isIntersecting),
    //   { threshold: 0.05 }
    // );
    // obs.observe(gl.domElement);
    // return () => obs.disconnect();
  }, [gl]);

  /** ---------- Helpers ---------- */
  const seeded = React.useCallback((i: number) => {
    const s = Math.sin(i * 16807) * 10000;
    return s - Math.floor(s);
  }, []);

  /** ---------- Geometry: base circle path ---------- */
  const circleGeom = React.useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const SEG = Math.max(8, Math.floor(segments));
    for (let i = 0; i <= SEG; i++) {
      const a = (i / SEG) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a), Math.sin(a), 0));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [segments]);

  /** ---------- Instanced path ---------- */
  const instGeom = React.useMemo(() => {
    if (!useInstancing) return null;

    const geom = new THREE.InstancedBufferGeometry();
    geom.index = circleGeom.index ?? null;
    geom.setAttribute("position", circleGeom.getAttribute("position"));
    geom.instanceCount = layers;

    const baseScale = new Float32Array(layers * 2);
    const baseOpacity = new Float32Array(layers);
    const phaseAcrossArr = new Float32Array(layers);
    const phase0Arr = new Float32Array(layers);
    const speedMulArr = new Float32Array(layers);

    const W = -4,
      H = 1;
    for (let i = 0; i < layers; i++) {
      const t = i / Math.max(1, layers - 1);
      const w = Math.max(80, sphereWidth + W * i);
      const h = Math.max(80, sphereHeight + H * i);
      const rx = w * 0.5;
      const ry = h * 0.5;

      baseScale[i * 2 + 0] = rx;
      baseScale[i * 2 + 1] = ry;

      const r = seeded(i + 1337);
      baseOpacity[i] = 0.6 * (1 - t * 0.4);
      phaseAcrossArr[i] = 2 * Math.PI * layerPhaseCycles * t;
      phase0Arr[i] = (r * 2 - 1) * layerPhaseJitter;
      speedMulArr[i] = 1 + (r * 2 - 1) * layerSpeedJitter;
    }

    geom.setAttribute(
      "iBaseScale",
      new THREE.InstancedBufferAttribute(baseScale, 2)
    );
    geom.setAttribute(
      "iBaseOpacity",
      new THREE.InstancedBufferAttribute(baseOpacity, 1)
    );
    geom.setAttribute(
      "iPhaseAcross",
      new THREE.InstancedBufferAttribute(phaseAcrossArr, 1)
    );
    geom.setAttribute(
      "iPhase0",
      new THREE.InstancedBufferAttribute(phase0Arr, 1)
    );
    geom.setAttribute(
      "iSpeedMul",
      new THREE.InstancedBufferAttribute(speedMulArr, 1)
    );
    return geom;
  }, [
    useInstancing,
    circleGeom,
    layers,
    sphereWidth,
    sphereHeight,
    layerPhaseCycles,
    layerPhaseJitter,
    layerSpeedJitter,
    seeded,
  ]);

  /** ---------- Material(s) ---------- */
  // GPU shader for instanced path
  const shaderMatRef = React.useRef<THREE.ShaderMaterial>(null!);
  const shaderMat = React.useMemo(() => {
    if (!useInstancing) return null;
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: new THREE.Color(color) },
        uTime: { value: 0 },
        uOmega: { value: (2 * Math.PI) / pulsePeriodSec },
        uScalePulseAmt: { value: scalePulseAmt },
        uFadeMul: { value: 1 },
      },
      vertexShader: /* glsl */ `
        attribute vec3 position;
        attribute vec2 iBaseScale;
        attribute float iBaseOpacity;
        attribute float iPhaseAcross;
        attribute float iPhase0;
        attribute float iSpeedMul;

        uniform float uTime;
        uniform float uOmega;
        uniform float uScalePulseAmt;

        varying float vOpacity;

        void main() {
          float phase = uOmega * uTime * iSpeedMul + iPhaseAcross + iPhase0;
          float wave = 0.5 + 0.5 * sin(phase);

          float s = 1.0 + (wave - 0.5) * 2.0 * uScalePulseAmt;
          vec3 p = position;
          p.x *= iBaseScale.x * s;
          p.y *= iBaseScale.y * s;

          vOpacity = iBaseOpacity * (0.75 + 0.25 * wave);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform vec3 uColor;
        uniform float uFadeMul;
        varying float vOpacity;
        void main() {
          gl_FragColor = vec4(uColor, vOpacity * uFadeMul);
        }
      `,
    });
    (mat as any).toneMapped = false;
    return mat;
  }, [useInstancing, color, pulsePeriodSec, scalePulseAmt]);

  // Legacy CPU path (kept for fallback/compare)
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

  /** build (instanced OR legacy) */
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Clean previous legacy lines if any
    for (const it of layersData.current) {
      root.remove(it.line);
      const m = it.line.material as THREE.Material | THREE.Material[];
      if (Array.isArray(m)) m.forEach((mm) => mm.dispose());
      else m?.dispose?.();
      it.line.geometry?.dispose?.();
    }
    layersData.current = [];

    if (useInstancing) {
      // Nothing to mount here; we render a single <line> with instanced geometry below.
      return;
    }

    // Legacy CPU path (original behavior)
    const unitCircle = circleGeom;
    const linesToAdd: THREE.Line[] = [];
    const newLayers: Array<L> = [];

    const W = -4,
      H = 1;
    for (let i = 0; i < layers; i++) {
      const t = i / Math.max(1, layers - 1);
      const w = Math.max(80, sphereWidth + W * i);
      const h = Math.max(80, sphereHeight + H * i);
      const rx = w * 0.5;
      const ry = h * 0.5;

      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.6 * (1 - t * 0.4),
      }) as THREE.LineBasicMaterial;
      (mat as any).toneMapped = false;

      const line = new THREE.Line(unitCircle, mat);
      line.rotation.z = Math.sin(t * Math.PI) * THREE.MathUtils.degToRad(25);
      line.scale.set(rx, ry, 1);
      line.frustumCulled = false;

      const r = seeded(i + 13.37);
      newLayers.push({
        line,
        baseOpacity: mat.opacity!,
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
    useInstancing,
    circleGeom,
    layers,
    sphereWidth,
    sphereHeight,
    layerPhaseCycles,
    layerPhaseJitter,
    layerSpeedJitter,
    color,
    seeded,
  ]);

  /** ---------- responsive fit cap ---------- */
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
    [computeEnvelopeRadius]
  );

  /** ---------- per-frame updates (cheap) ---------- */
  useFrame(() => {
    // if (!isVisible) return; // ⬅ Disabled: always render

    const time = (performance.now() - startRef.current) / 1000;
    const root = rootRef.current;

    const { smooth: pSmooth, overPx } = scrollRef.current;
    const p = easeOutCubic(pSmooth);
    const scaleP = pSmooth;

    // fades - improved logic with better fallbacks
    let fadeStart = fadeOutFromProgress;
    if (typeof fadeStart === "number" && fadeStart > 1) {
      fadeStart = fadeStart > 100 ? 1 : fadeStart / 100;
    }
    let fadeMul = 1;

    // Only apply fade logic if fadeOutFromProgress is explicitly set
    if (typeof fadeStart === "number") {
      const fadeRange = Math.max(1e-4, 1 - clamp01(fadeStart));
      const preEndMul = easeOutCubic(clamp01((1 - p) / fadeRange));
      fadeMul *= preEndMul;
    }

    // Apply overPx fade only if we have a reasonable fadeTailPx
    if (overPx > 0 && fadeTailPx > 0) {
      const postMul =
        1 - easeOutCubic(clamp01(overPx / Math.max(1, fadeTailPx)));
      fadeMul *= postMul;
    }

    // Ensure minimum visibility - prevent sphere from disappearing completely
    // Only hide if explicitly configured to do so and fadeMul is very low
    const shouldBeVisible =
      fadeMul > hideBelowAlpha ||
      (typeof fadeOutFromProgress === "undefined" && overPx <= 0);

    // Instanced: update cheap uniforms
    if (useInstancing && shaderMatRef.current) {
      shaderMatRef.current.uniforms.uTime.value = time;
      shaderMatRef.current.uniforms.uFadeMul.value = fadeMul;
    }

    // Legacy per-layer updates (only if not instanced)
    if (!useInstancing) {
      const omega = (2 * Math.PI) / pulsePeriodSec;
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
    }

    // Improved visibility logic with fallback
    root.visible = shouldBeVisible;

    // spin
    root.rotation.z = time * spinSpeed;

    // Y follow + scale
    const halfH = 0.5 * sphereHeight * smoothScaleRef.current;
    const yStart = size.height - startTopPadding - halfH;
    const yEnd = size.height * 0.5 + endYOffset;
    const yFollow = THREE.MathUtils.lerp(yStart, yEnd, p);

    const vw = size.width;
    const vh = typeof window !== "undefined" ? window.innerHeight : size.height;

    const scrollScale = THREE.MathUtils.lerp(minScale, maxScale, scaleP);
    const edgeGuard = THREE.MathUtils.smoothstep(0.85, 1.0, pSmooth);
    const extraPad = 120 * edgeGuard;
    const cap = clampToViewport
      ? fitCap(vw, vh, viewportPadding + extraPad)
      : neverUpscale
      ? 1
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

  return (
    <group ref={rootRef}>
      {useInstancing ? (
        <line>
          <primitive attach='geometry' object={instGeom!} />
          <shaderMaterial ref={shaderMatRef} args={[shaderMat!]} />
        </line>
      ) : null}
    </group>
  );
}

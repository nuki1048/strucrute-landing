/* eslint-disable react-hooks/rules-of-hooks */
import { MotionValue, useTransform } from "framer-motion";
import * as THREE from "three";

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
export const seeded = (i: number) => {
  const s = Math.sin(i * 16807) * 10000;
  return s - Math.floor(s);
};

export function segment(p: MotionValue<number>, a: number, b: number) {
  return useTransform(p, [0, a, b, 1], [0, 0, 1, 1]);
}

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
export const damp = THREE.MathUtils.damp;

export function getPerfTier(): "high" | "med" | "low" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mem = (navigator as any).deviceMemory ?? 4;
  const cores = navigator.hardwareConcurrency ?? 4;
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  if (mem >= 8 && cores >= 8 && !isMobile) return "high";
  if (mem >= 4 && cores >= 4) return "med";
  return "low";
}

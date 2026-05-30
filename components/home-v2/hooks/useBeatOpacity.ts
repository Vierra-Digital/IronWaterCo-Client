'use client'

import { useTransform, type MotionValue } from 'framer-motion'
import { clamp01 } from '../motion/scrollTransform'

/** Opacity 0→1→hold→0 across fade windows; chains beats with minimal dead air. */
export function beatOpacity(
  progress: number,
  fadeInStart: number,
  fadeInEnd: number,
  fadeOutStart: number,
  fadeOutEnd: number
): number {
  const p = clamp01(progress)
  if (p <= fadeInStart) return 0
  if (p < fadeInEnd) {
    const t = (p - fadeInStart) / (fadeInEnd - fadeInStart)
    return t * t * (3 - 2 * t)
  }
  if (p <= fadeOutStart) return 1
  if (p < fadeOutEnd) {
    const t = (p - fadeOutStart) / (fadeOutEnd - fadeOutStart)
    return 1 - t * t * (3 - 2 * t)
  }
  return 0
}

export function useBeatOpacity(
  scrollYProgress: MotionValue<number>,
  fadeInStart: number,
  fadeInEnd: number,
  fadeOutStart: number,
  fadeOutEnd: number
) {
  return useTransform(scrollYProgress, (v) =>
    beatOpacity(v, fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd)
  )
}

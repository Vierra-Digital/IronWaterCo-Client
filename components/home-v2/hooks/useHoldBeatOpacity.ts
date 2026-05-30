'use client'

import { useTransform, type MotionValue } from 'framer-motion'
import { TRANSITION_EDGE } from '../penthouse/cameraPath'
import { clamp01 } from '../motion/scrollTransform'

const HOLD_EDGE = 0.1

/**
 * Opacity for chapter content: hidden while camera moves (section edges),
 * visible only during the hold window in the middle of each chapter.
 */
export function holdBeatOpacity(localProgress: number): number {
  const p = clamp01(localProgress)

  if (p < TRANSITION_EDGE || p > 1 - TRANSITION_EDGE) return 0

  const holdSpan = 1 - 2 * TRANSITION_EDGE
  const holdLocal = (p - TRANSITION_EDGE) / holdSpan

  if (holdLocal < HOLD_EDGE) return holdLocal / HOLD_EDGE
  if (holdLocal > 1 - HOLD_EDGE) return (1 - holdLocal) / HOLD_EDGE
  return 1
}

export function useHoldBeatOpacity(scrollYProgress: MotionValue<number>) {
  return useTransform(scrollYProgress, (v) => holdBeatOpacity(v))
}

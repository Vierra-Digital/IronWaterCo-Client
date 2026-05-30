'use client'

import { useTransform, type MotionValue } from 'framer-motion'
import { beatOpacity } from './useBeatOpacity'

/** Beat opacity on global story progress (0–1 across pinned track). */
export function useGlobalBeatOpacity(
  globalProgress: MotionValue<number>,
  fadeInStart: number,
  fadeInEnd: number,
  fadeOutStart: number,
  fadeOutEnd: number
) {
  return useTransform(globalProgress, (v) =>
    beatOpacity(v, fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd)
  )
}

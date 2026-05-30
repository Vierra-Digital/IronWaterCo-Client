'use client'

import { useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'

export function useSceneScroll(sceneHeightVh: number) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  return { ref, scrollYProgress, sceneHeightVh }
}

export function useSceneTransform(
  progress: MotionValue<number>,
  input: number[],
  output: number[]
) {
  return useTransform(progress, input, output)
}

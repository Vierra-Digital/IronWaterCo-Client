'use client'

import { useMotionValueEvent, useScroll, type MotionValue } from 'framer-motion'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { syncCameraStations } from '../penthouse/cameraPath'
import {
  activeSectionId,
  globalToCameraProgress,
  type PinnedSectionId,
} from '../penthouse/storySections'

type UseStoryCameraProgressOptions = {
  storyTrackRef: RefObject<HTMLDivElement | null>
  mobile?: boolean
}

export function useStoryCameraProgress({
  storyTrackRef,
  mobile = false,
}: UseStoryCameraProgressOptions) {
  const { scrollYProgress } = useScroll({
    target: storyTrackRef,
    offset: ['start start', 'end end'],
  })

  const scrollProgressRef = useRef(0)
  const [activeId, setActiveId] = useState<PinnedSectionId>('scene-hero-1')

  useEffect(() => {
    syncCameraStations(mobile)
  }, [mobile])

  useEffect(() => {
    syncCameraStations(false)
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (global) => {
    scrollProgressRef.current = globalToCameraProgress(global)
    setActiveId(activeSectionId(global, mobile))
  })

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const sync = () => {
      syncCameraStations(mq.matches)
      const global = scrollYProgress.get()
      scrollProgressRef.current = globalToCameraProgress(global)
      setActiveId(activeSectionId(global, mq.matches))
    }
    mq.addEventListener('change', sync)
    sync()
    return () => mq.removeEventListener('change', sync)
  }, [scrollYProgress])

  return {
    scrollYProgress,
    scrollProgressRef,
    activeSectionId: activeId,
  }
}

export type StoryCameraProgress = {
  scrollYProgress: MotionValue<number>
  scrollProgressRef: React.MutableRefObject<number>
  activeSectionId: PinnedSectionId
}

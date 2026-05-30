'use client'

import dynamic from 'next/dynamic'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import { useStoryCamera } from '../StoryCameraContext'
import { clamp01 } from '../motion/scrollTransform'
import { backdropFadeRange } from './storySections'
import styles from '../home-v2-scrolly.module.css'

const PenthouseCanvas = dynamic(() => import('./PenthouseCanvas'), { ssr: false })

type PenthouseBackdropProps = {
  scrollProgressRef: React.MutableRefObject<number>
  globalProgress: MotionValue<number>
  activeSectionId: string
}

export default function PenthouseBackdrop({
  scrollProgressRef,
  globalProgress,
  activeSectionId,
}: PenthouseBackdropProps) {
  const { mobile } = useStoryCamera()
  const { fadeStart, fadeEnd } = backdropFadeRange(mobile)

  const backdropOpacity = useTransform(globalProgress, (v) => {
    if (v < fadeStart) return 1
    return clamp01(1 - (v - fadeStart) / (fadeEnd - fadeStart))
  })

  const scrimOpacity = useTransform(globalProgress, (v) => {
    if (v < fadeStart) return 0
    return clamp01((v - fadeStart) / (fadeEnd - fadeStart)) * 0.85
  })

  return (
    <>
      <motion.div
        className={styles.penthouseScrim}
        style={{ opacity: scrimOpacity }}
        aria-hidden
      />
      <motion.div className={styles.penthouseBackdrop} style={{ opacity: backdropOpacity }} aria-hidden>
        <PenthouseCanvas
          scrollProgressRef={scrollProgressRef}
          activeSectionId={activeSectionId}
        />
        <div className={styles.penthouseVignette} aria-hidden />
        <div className={styles.penthouseFilmGrain} aria-hidden />
      </motion.div>
    </>
  )
}

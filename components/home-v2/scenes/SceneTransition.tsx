'use client'

import { motion, useTransform } from 'framer-motion'
import { useSceneScroll } from '../hooks/useSceneScroll'
import { useSectionVh } from '../hooks/useSectionVh'
import { remap } from '../motion/scrollTransform'
import SceneShell from './SceneShell'
import styles from '../home-v2-scrolly.module.css'

export default function SceneTransition() {
  const heightVh = useSectionVh('scene-transition')
  const { ref, scrollYProgress } = useSceneScroll(heightVh)

  const lineScale = useTransform(scrollYProgress, (v) => remap(v, 0.15, 0.55))
  const textOpacity = useTransform(scrollYProgress, (v) => remap(v, 0.35, 0.65))
  const textY = useTransform(scrollYProgress, (v) => remap(v, 0.35, 0.65, 24, 0))

  return (
    <SceneShell
      sceneRef={ref}
      heightVh={heightVh}
      id="scene-transition"
      className={`${styles.transitionScene} ${styles.sceneOver3d}`}
    >
      <div className={styles.transitionInner}>
        <motion.div className={styles.transitionLine} style={{ scaleX: lineScale }} />
        <motion.p className={styles.transitionEyebrow} style={{ opacity: textOpacity, y: textY }}>
          From vision to specification
        </motion.p>
        <motion.h2 className={styles.transitionTitle} style={{ opacity: textOpacity, y: textY }}>
          Let&apos;s build something extraordinary
        </motion.h2>
      </div>
    </SceneShell>
  )
}

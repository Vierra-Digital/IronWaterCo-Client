'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useMotionValueEvent } from 'framer-motion'
import {
  brandMarqueeLogos,
  differentiationFeatures,
  differentiationQuote,
  stats,
} from '../../../data/homepage'
import SceneOverlayCaption from '../framer/ui/SceneOverlayCaption'
import { holdBeatOpacity, useHoldBeatOpacity } from '../hooks/useHoldBeatOpacity'
import { useSceneScroll } from '../hooks/useSceneScroll'
import { useSectionVh } from '../hooks/useSectionVh'
import { remap } from '../motion/scrollTransform'
import SceneShell from './SceneShell'
import styles from '../home-v2-scrolly.module.css'
import framerStyles from '../framer/framer-ui.module.css'

export default function Scene04Why() {
  const heightVh = useSectionVh('scene-why')
  const { ref, scrollYProgress } = useSceneScroll(heightVh)
  const [activeStat, setActiveStat] = useState(0)
  const panelOpacity = useHoldBeatOpacity(scrollYProgress)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (holdBeatOpacity(v) < 0.4) return
    const t = remap(v, 0.2, 0.8)
    setActiveStat(Math.min(Math.floor(t * stats.length), stats.length - 1))
  })

  return (
    <SceneShell
      sceneRef={ref}
      heightVh={heightVh}
      id="why"
      className={`${styles.whyScene} ${styles.sceneOver3d} ${styles.overlayScene}`}
    >
      <div className={`${styles.sceneContentLayout} ${styles.whyLayoutOverlay}`}>
        <motion.div className={styles.whyCaptionStack} style={{ opacity: panelOpacity }}>
          <SceneOverlayCaption eyebrow="Built for excellence" title="Why Iron & Water Co.?">
            <ul className={styles.whyFeatureList}>
              {differentiationFeatures.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </SceneOverlayCaption>

          <div className={styles.statsRow}>
            {stats.map((stat, i) => (
              <StatBlock key={stat.label} stat={stat} active={i === activeStat} />
            ))}
          </div>

          <blockquote className={styles.quoteInline}>
            <p className={framerStyles.manifesto}>{differentiationQuote}</p>
          </blockquote>

          <div className={styles.brandTicker}>
            {brandMarqueeLogos.map((src) => (
              <Image key={src} src={src} alt="" width={72} height={28} />
            ))}
          </div>
        </motion.div>
      </div>
    </SceneShell>
  )
}

function StatBlock({
  stat,
  active,
}: {
  stat: (typeof stats)[number]
  active: boolean
}) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (active) setDisplay(stat.target)
    else setDisplay(0)
  }, [active, stat.target])

  return (
    <div className={`${styles.statItem} ${active ? styles.statItemActive : ''}`}>
      <div className={styles.statNum}>
        {display}
        {stat.suffix}
      </div>
      <div className={styles.statLabel}>{stat.label}</div>
    </div>
  )
}

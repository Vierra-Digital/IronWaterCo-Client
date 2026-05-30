'use client'

import { useState } from 'react'
import { motion, useMotionValueEvent } from 'framer-motion'
import { heroContent, heroScenes } from '../../../data/homepage'
import { HeroOverlayBeat } from '../framer/adapters'
import { useHoldBeatOpacity } from '../hooks/useHoldBeatOpacity'
import { useSceneScroll } from '../hooks/useSceneScroll'
import { useSectionVh } from '../hooks/useSectionVh'
import type { PinnedSectionId } from '../penthouse/storySections'
import SceneShell from './SceneShell'
import styles from '../home-v2-scrolly.module.css'

const HERO_SECTIONS: PinnedSectionId[] = [
  'scene-hero-1',
  'scene-hero-2',
  'scene-hero-3',
  'scene-hero-4',
  'scene-hero-5',
]

type SceneHeroBeatProps = {
  beatIndex: number
  onOpenModal: () => void
  showScrollHint?: boolean
}

export default function SceneHeroBeat({
  beatIndex,
  onOpenModal,
  showScrollHint = false,
}: SceneHeroBeatProps) {
  const sectionId = HERO_SECTIONS[beatIndex]
  const scene = heroScenes[beatIndex]
  const heightVh = useSectionVh(sectionId)
  const { ref, scrollYProgress } = useSceneScroll(heightVh)
  const opacity = useHoldBeatOpacity(scrollYProgress)
  const [scrolled, setScrolled] = useState(false)

  const isCenter = scene.layout === 'center'

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v > 0.06) setScrolled(true)
  })

  return (
    <SceneShell
      sceneRef={ref}
      heightVh={heightVh}
      id={beatIndex === 0 ? 'hero' : undefined}
      className={`${styles.penthouseAct} ${styles.sceneOver3d}`}
    >
      <div className={styles.penthouseOverlays}>
        <motion.div
          className={isCenter ? styles.penthouseBeatCenter : styles.penthouseCopyColumn}
          style={{ opacity }}
        >
          <HeroOverlayBeat
            label={scene.label}
            headline={scene.title}
            body={scene.subtext}
            showCta={'showCta' in scene && scene.showCta}
            ctaLabel={heroContent.ctaLabel}
            onCtaClick={onOpenModal}
          />
        </motion.div>
        {showScrollHint && !scrolled && (
          <motion.div className={styles.scrollHint} style={{ opacity }}>
            <span>Scroll</span>
            <div className={styles.scrollLine} />
          </motion.div>
        )}
      </div>
    </SceneShell>
  )
}

'use client'

import { useState } from 'react'
import { motion, useMotionValueEvent, useTransform } from 'framer-motion'
import { services } from '../../../data/homepage'
import { ServiceCard } from '../framer/adapters'
import SceneOverlayCaption from '../framer/ui/SceneOverlayCaption'
import { holdBeatOpacity, useHoldBeatOpacity } from '../hooks/useHoldBeatOpacity'
import { useSceneScroll } from '../hooks/useSceneScroll'
import { useSectionVh } from '../hooks/useSectionVh'
import { remap } from '../motion/scrollTransform'
import SceneShell from './SceneShell'
import styles from '../home-v2-scrolly.module.css'

const CARD_WIDTH = 300

export default function Scene03Services() {
  const heightVh = useSectionVh('scene-services')
  const { ref, scrollYProgress } = useSceneScroll(heightVh)
  const [activeIndex, setActiveIndex] = useState(0)
  const panelOpacity = useHoldBeatOpacity(scrollYProgress)

  const railMaxX = (services.length - 1) * CARD_WIDTH
  const railX = useTransform(scrollYProgress, (v) => {
    if (holdBeatOpacity(v) < 0.05) return '0px'
    const t = remap(v, 0.12, 0.88)
    return `-${t * railMaxX}px`
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (holdBeatOpacity(v) < 0.5) return
    const t = remap(v, 0.12, 0.88)
    setActiveIndex(Math.round(t * (services.length - 1)))
  })

  return (
    <SceneShell
      sceneRef={ref}
      heightVh={heightVh}
      id="services"
      className={`${styles.servicesScene} ${styles.sceneOver3d} ${styles.overlayScene}`}
    >
      <div className={`${styles.servicesLayout} ${styles.servicesLayoutOverlay}`}>
        <motion.div style={{ opacity: panelOpacity }}>
          <SceneOverlayCaption eyebrow="What we offer" title="Services" />
        </motion.div>

        <motion.div className={styles.servicesRailWrap} style={{ opacity: panelOpacity }}>
          <motion.div className={styles.servicesRail} style={{ x: railX }}>
            {services.map((service, i) => (
              <ServiceCard
                key={service.title}
                index={i}
                total={services.length}
                title={service.title}
                description={service.description}
                active={i === activeIndex}
                className={styles.serviceCardLite}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </SceneShell>
  )
}

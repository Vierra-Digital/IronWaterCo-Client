'use client'

import { motion } from 'framer-motion'
import { whatWeDoDifferently } from '../../../data/homepage'
import SceneOverlayCaption from '../framer/ui/SceneOverlayCaption'
import { useHoldBeatOpacity } from '../hooks/useHoldBeatOpacity'
import { useSceneScroll } from '../hooks/useSceneScroll'
import { useSectionVh } from '../hooks/useSectionVh'
import SceneShell from './SceneShell'
import styles from '../home-v2-scrolly.module.css'

export default function SceneWWDD() {
  const heightVh = useSectionVh('scene-wwdd')
  const { ref, scrollYProgress } = useSceneScroll(heightVh)
  const panelOpacity = useHoldBeatOpacity(scrollYProgress)

  return (
    <SceneShell
      sceneRef={ref}
      heightVh={heightVh}
      id="wwdd"
      className={`${styles.wwddScene} ${styles.sceneOver3d} ${styles.overlayScene}`}
    >
      <div className={`${styles.sceneContentLayout} ${styles.wwddLayoutOverlay}`}>
        <motion.div style={{ opacity: panelOpacity }}>
          <SceneOverlayCaption eyebrow="Excellence in every detail" title="What We Do Differently">
            <ol className={styles.wwddStripList}>
              {whatWeDoDifferently.map((item, i) => (
                <li key={item.title} className={styles.wwddStripItem}>
                  <span className={styles.wwddStripNum}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className={styles.wwddStripTitle}>{item.title}</h3>
                    <p className={styles.wwddStripDesc}>{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </SceneOverlayCaption>
        </motion.div>
      </div>
    </SceneShell>
  )
}

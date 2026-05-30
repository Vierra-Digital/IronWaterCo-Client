'use client'

import { motion } from 'framer-motion'
import { teamMembers } from '../../../data/homepage'
import { TeamMemberCard } from '../framer/adapters'
import SceneOverlayCaption from '../framer/ui/SceneOverlayCaption'
import { useHoldBeatOpacity } from '../hooks/useHoldBeatOpacity'
import { useSceneScroll } from '../hooks/useSceneScroll'
import { useSectionVh } from '../hooks/useSectionVh'
import SceneShell from './SceneShell'
import styles from '../home-v2-scrolly.module.css'

export default function Scene06Team() {
  const heightVh = useSectionVh('scene-team')
  const { ref, scrollYProgress } = useSceneScroll(heightVh)
  const panelOpacity = useHoldBeatOpacity(scrollYProgress)

  return (
    <SceneShell
      sceneRef={ref}
      heightVh={heightVh}
      id="team"
      className={`${styles.teamScene} ${styles.sceneOver3d} ${styles.overlayScene}`}
    >
      <div className={`${styles.teamSpreadLayout} ${styles.sceneContentLayout}`}>
        <motion.div style={{ opacity: panelOpacity }}>
          <SceneOverlayCaption
            eyebrow="Authority with a human face"
            title="Our A-Star Team"
            align="center"
          />
        </motion.div>
        <motion.div className={styles.teamSpreadGrid} style={{ opacity: panelOpacity }}>
          {teamMembers.map((member, i) => (
            <div
              key={member.name}
              className={styles.teamFloatCard}
              style={{ marginTop: i % 2 === 0 ? 0 : '1.75rem' }}
            >
              <TeamMemberCard
                name={member.name}
                role={member.role}
                imageUrl={'imageSrc' in member ? member.imageSrc : undefined}
                initials={'initials' in member ? member.initials : undefined}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </SceneShell>
  )
}

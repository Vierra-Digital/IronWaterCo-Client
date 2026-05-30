'use client'

import { useState } from 'react'
import { motion, useMotionValueEvent } from 'framer-motion'
import { testimonials } from '../../../data/homepage'
import { TestimonialBlock } from '../framer/adapters'
import SceneOverlayCaption from '../framer/ui/SceneOverlayCaption'
import { holdBeatOpacity, useHoldBeatOpacity } from '../hooks/useHoldBeatOpacity'
import { useSceneScroll } from '../hooks/useSceneScroll'
import { useSectionVh } from '../hooks/useSectionVh'
import { remap } from '../motion/scrollTransform'
import SceneShell from './SceneShell'
import styles from '../home-v2-scrolly.module.css'

export default function Scene05Testimonials() {
  const heightVh = useSectionVh('scene-testimonials')
  const { ref, scrollYProgress } = useSceneScroll(heightVh)
  const [index, setIndex] = useState(0)
  const panelOpacity = useHoldBeatOpacity(scrollYProgress)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (holdBeatOpacity(v) < 0.4) return
    const t = remap(v, 0.15, 0.85)
    setIndex(Math.min(Math.floor(t * testimonials.length), testimonials.length - 1))
  })

  const review = testimonials[index]

  return (
    <SceneShell
      sceneRef={ref}
      heightVh={heightVh}
      id="testimonials"
      className={`${styles.testimonialScene} ${styles.sceneOver3d} ${styles.overlayScene}`}
    >
      <div className={`${styles.testimonialSplit} ${styles.sceneContentLayout}`}>
        <motion.div className={styles.testimonialQuoteCol} style={{ opacity: panelOpacity }}>
          <SceneOverlayCaption
            eyebrow="Social proof as whisper, not shout"
            title="Testimonials"
          />
          <blockquote className={styles.testimonialGiantQuote}>&ldquo;{review.text}&rdquo;</blockquote>
        </motion.div>
        <motion.div className={styles.testimonialAuthorCol} style={{ opacity: panelOpacity }}>
          <TestimonialBlock
            quote={review.text}
            author={review.author}
            role={review.role}
            imageUrl={review.imageSrc}
          />
          <div className={styles.reviewDots} role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`View testimonial ${i + 1}`}
                className={`${styles.reviewDot} ${i === index ? styles.reviewDotActive : ''}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </SceneShell>
  )
}

'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'
import { contactInfo } from '../../../data/homepage'
import { useStoryCamera } from '../StoryCameraContext'
import { CONTACT_VH, CONTACT_VH_MOBILE, backdropFadeRange } from '../penthouse/storySections'
import { useSceneScroll } from '../hooks/useSceneScroll'
import { remap } from '../motion/scrollTransform'
import styles from '../home-v2-scrolly.module.css'

type Scene07ContactProps = {
  canvasFadeProgress?: MotionValue<number>
}

export default function Scene07Contact({ canvasFadeProgress }: Scene07ContactProps) {
  const { mobile } = useStoryCamera()
  const heightVh = mobile ? CONTACT_VH_MOBILE : CONTACT_VH
  const { ref, scrollYProgress } = useSceneScroll(heightVh)
  const progress = canvasFadeProgress ?? scrollYProgress

  const { fadeEnd } = backdropFadeRange(mobile)

  const sectionOpacity = useTransform(progress, (v) =>
    remap(v, fadeEnd, Math.min(1, fadeEnd + 0.04))
  )
  const contentOpacity = useTransform(scrollYProgress, (v) => remap(v, 0.12, 0.45))
  const contentY = useTransform(scrollYProgress, (v) => remap(v, 0.12, 0.45, 48, 0))

  return (
    <motion.section
      ref={ref}
      id="contact"
      className={styles.contactScene}
      style={{ minHeight: `${heightVh}vh`, opacity: sectionOpacity }}
    >
      <motion.div className={styles.contactReveal} style={{ opacity: contentOpacity, y: contentY }}>
        <p className={styles.label} style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Get started today
        </p>
        <h2
          className={`${styles.display} ${styles.displayMedium}`}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          Contact
        </h2>
        <div className={styles.contactGrid}>
          <div className={styles.contactMap}>
            <iframe
              src={contactInfo.mapEmbedUrl}
              title="Iron & Water Co. Location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <address className={styles.contactCard} itemScope itemType="https://schema.org/LocalBusiness">
            <div className={styles.contactItem}>
              <div>
                <strong>Address</strong>
                <p>{contactInfo.street}</p>
                <p>
                  {contactInfo.city}, {contactInfo.state} {contactInfo.zip}
                </p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <div>
                <strong>Phone</strong>
                <p>
                  <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
                </p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <div>
                <strong>Email</strong>
                <p>
                  <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                </p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <div>
                <strong>Hours</strong>
                <p style={{ whiteSpace: 'pre-line' }}>{contactInfo.hours}</p>
              </div>
            </div>
          </address>
        </div>
      </motion.div>
    </motion.section>
  )
}

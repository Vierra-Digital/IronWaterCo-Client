'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { whatWeDoDifferently } from '../../../../data/homepage'
import Grain from './Grain'
import styles from '../framer-sections.module.css'

function WWDDItem({
  index,
  title,
  description,
}: {
  index: number
  title: string
  description: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={`${styles.wwddRow} ${index % 2 === 0 ? styles.wwddRowForward : styles.wwddRowReverse}`}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className={styles.wwddNum}>{String(index + 1).padStart(2, '0')}</span>
      <div>
        <h3 className={styles.wwddTitle}>{title}</h3>
        <p className={styles.wwddDesc}>{description}</p>
      </div>
    </motion.div>
  )
}

export default function WWDDSection() {
  return (
    <section id="wwdd" className={`${styles.section} ${styles.sectionBase}`}>
      <Grain />
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Excellence in every detail</p>
        <h2 className={styles.sectionTitle}>What We Do Differently</h2>
        {whatWeDoDifferently.map((item, i) => (
          <WWDDItem key={item.title} index={i} title={item.title} description={item.description} />
        ))}
      </div>
    </section>
  )
}

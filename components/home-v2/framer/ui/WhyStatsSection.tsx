'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { differentiationQuote, stats } from '../../../../data/homepage'
import Grain from './Grain'
import styles from '../framer-sections.module.css'

function StatItem({ stat }: { stat: (typeof stats)[number] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 40, damping: 20 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (inView) motionVal.set(stat.target)
  }, [inView, motionVal, stat.target])

  useEffect(() => {
    return spring.on('change', (v) => setDisplay(Math.floor(v)))
  }, [spring])

  return (
    <div ref={ref}>
      <div className={styles.statValue}>
        {display}
        {stat.suffix}
      </div>
      <p className={styles.statLabel}>{stat.label}</p>
    </div>
  )
}

export default function WhyStatsSection() {
  return (
    <section id="why" className={`${styles.section} ${styles.sectionAlt}`}>
      <Grain />
      <div className={styles.inner}>
        <h2 className={`${styles.sectionTitle} ${styles.sectionTitleCenter}`}>Why I&amp;W</h2>
        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <StatItem key={s.label} stat={s} />
          ))}
        </div>
        <p className={styles.legacyQuote}>{differentiationQuote}</p>
      </div>
    </section>
  )
}

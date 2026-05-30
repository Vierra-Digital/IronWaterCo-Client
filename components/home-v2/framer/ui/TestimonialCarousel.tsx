'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { testimonials } from '../../../../data/homepage'
import Grain from './Grain'
import styles from '../framer-sections.module.css'

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 8000)
    return () => clearInterval(id)
  }, [])

  const t = testimonials[index]

  return (
    <section id="testimonials" className={`${styles.section} ${styles.sectionAlt}`}>
      <Grain />
      <div className={styles.inner}>
        <h2 className={`${styles.sectionTitle} ${styles.sectionTitleCenter}`}>Testimonials</h2>
        <div className={styles.testimonialWrap}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className={styles.testimonialQuote}>&ldquo;{t.text}&rdquo;</p>
              <p className={styles.testimonialAuthor}>{t.author}</p>
              <p className={styles.testimonialRole}>{t.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className={styles.testimonialDots} role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1}`}
              className={`${styles.testimonialDot} ${i === index ? styles.testimonialDotActive : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

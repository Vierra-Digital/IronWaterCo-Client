'use client'

import type { CSSProperties, ReactNode } from 'react'
import styles from '../framer-ui.module.css'

export type HeroOverlayBeatProps = {
  label?: string
  headline?: string
  headlineLine2?: string
  headlineLine3?: string
  body?: string
  manifesto?: boolean
  showCta?: boolean
  ctaLabel?: string
  onCtaClick?: () => void
  style?: CSSProperties
  className?: string
  children?: ReactNode
}

export default function HeroOverlayBeat({
  label,
  headline,
  headlineLine2,
  headlineLine3,
  body,
  manifesto = false,
  showCta = false,
  ctaLabel = 'Design Without Compromise',
  onCtaClick,
  style,
  className,
  children,
}: HeroOverlayBeatProps) {
  return (
    <div className={`${styles.heroBeat} ${className ?? ''}`} style={style}>
      <div className={styles.heroScrim}>
        {label && <p className={styles.label}>{label}</p>}
        {headline && (
          <h1 className={manifesto ? styles.manifesto : styles.heroHeadline}>{headline}</h1>
        )}
        {headlineLine2 && <h1 className={styles.heroHeadline}>{headlineLine2}</h1>}
        {headlineLine3 && <h1 className={styles.heroHeadline}>{headlineLine3}</h1>}
        {body && <p className={styles.bodyLarge}>{body}</p>}
        {children}
        {showCta && (
          <button type="button" className={styles.cta} onClick={onCtaClick}>
            {ctaLabel}
          </button>
        )}
      </div>
    </div>
  )
}

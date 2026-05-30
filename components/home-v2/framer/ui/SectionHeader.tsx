'use client'

import type { CSSProperties } from 'react'
import styles from '../framer-ui.module.css'

export type SectionHeaderProps = {
  eyebrow: string
  title: string
  style?: CSSProperties
  centered?: boolean
}

export default function SectionHeader({ eyebrow, title, style, centered }: SectionHeaderProps) {
  return (
    <header className={styles.sectionHeader} style={{ ...style, textAlign: centered ? 'center' : 'left' }}>
      <p className={styles.label}>{eyebrow}</p>
      <h2 className={styles.displayTitle}>{title}</h2>
    </header>
  )
}

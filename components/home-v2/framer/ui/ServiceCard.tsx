'use client'

import type { CSSProperties } from 'react'
import styles from '../framer-ui.module.css'

export type ServiceCardProps = {
  index: number
  total: number
  title: string
  description: string
  active?: boolean
  className?: string
  style?: CSSProperties
}

export default function ServiceCard({
  index,
  total,
  title,
  description,
  active = false,
  className,
  style,
}: ServiceCardProps) {
  return (
    <article
      className={`${styles.serviceCard} ${active ? styles.serviceCardActive : ''} ${className ?? ''}`}
      style={style}
    >
      <p className={styles.serviceIndex}>
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </p>
      <h3 className={styles.serviceTitle}>{title}</h3>
      <p className={styles.serviceDesc}>{description}</p>
    </article>
  )
}

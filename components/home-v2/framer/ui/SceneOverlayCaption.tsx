'use client'

import type { CSSProperties, ReactNode } from 'react'
import styles from '../framer-ui.module.css'

export type SceneOverlayCaptionProps = {
  eyebrow?: string
  title?: string
  children?: ReactNode
  align?: 'left' | 'center' | 'right'
  className?: string
  style?: CSSProperties
}

export default function SceneOverlayCaption({
  eyebrow,
  title,
  children,
  align = 'left',
  className,
  style,
}: SceneOverlayCaptionProps) {
  const alignClass =
    align === 'center'
      ? styles.captionCenter
      : align === 'right'
        ? styles.captionRight
        : styles.captionLeft

  return (
    <div className={`${styles.captionRoot} ${alignClass} ${className ?? ''}`} style={style}>
      {eyebrow && <p className={styles.captionEyebrow}>{eyebrow}</p>}
      {title && <h2 className={styles.captionTitle}>{title}</h2>}
      {children}
    </div>
  )
}

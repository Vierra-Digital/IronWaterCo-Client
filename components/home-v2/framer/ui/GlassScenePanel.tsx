'use client'

import type { CSSProperties, ReactNode } from 'react'
import styles from '../framer-ui.module.css'

export type GlassScenePanelProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export default function GlassScenePanel({ children, className, style }: GlassScenePanelProps) {
  return (
    <div className={`${styles.panel} ${className ?? ''}`} style={style}>
      {children}
    </div>
  )
}

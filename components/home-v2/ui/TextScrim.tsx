'use client'

import styles from '../home-v2-scrolly.module.css'

type TextScrimProps = {
  children: React.ReactNode
  className?: string
  variant?: 'left' | 'bottom'
}

export default function TextScrim({ children, className, variant = 'left' }: TextScrimProps) {
  const variantClass = variant === 'bottom' ? styles.textScrimBottom : styles.textScrimLeft
  return <div className={`${styles.textScrim} ${variantClass} ${className ?? ''}`}>{children}</div>
}

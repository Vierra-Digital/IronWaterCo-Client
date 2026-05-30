'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import styles from '../home-v2-scrolly.module.css'

type MagneticButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  ariaLabel?: string
}

export default function MagneticButton({
  children,
  onClick,
  className,
  ariaLabel,
}: MagneticButtonProps) {
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  if (reduced) {
    return (
      <button
        type="button"
        className={`${styles.ctaPrimary} ${className ?? ''}`}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    )
  }

  return (
    <motion.button
      type="button"
      className={`${styles.ctaPrimary} ${className ?? ''}`}
      onClick={onClick}
      aria-label={ariaLabel}
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - rect.left - rect.width / 2) * 0.15)
        y.set((e.clientY - rect.top - rect.height / 2) * 0.15)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}

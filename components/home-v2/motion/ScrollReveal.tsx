'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { fadeUp, viewportOnce } from './tokens'
import { useReducedMotion } from '../hooks/useReducedMotion'

type ScrollRevealProps = HTMLMotionProps<'div'> & {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  ...props
}: ScrollRevealProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: fadeUp.hidden,
        visible: {
          ...fadeUp.visible,
          transition: { ...fadeUp.visible.transition, delay },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

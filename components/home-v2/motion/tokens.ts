export const easing = [0.4, 0, 0.2, 1] as const

export const duration = {
  fast: 0.35,
  normal: 0.6,
  slow: 0.9,
} as const

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease: easing },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.normal, ease: easing },
  },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

export const slideFromLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.normal, ease: easing },
  },
}

export const slideFromRight = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.normal, ease: easing },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.normal, ease: easing },
  },
}

export const viewportOnce = { once: true, margin: '-80px' as const, amount: 0.2 as const }

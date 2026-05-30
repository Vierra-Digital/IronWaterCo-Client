import styles from '../framer-sections.module.css'

type LuxuryWordmarkProps = {
  variant?: 'nav' | 'footer'
  className?: string
}

export default function LuxuryWordmark({ variant = 'nav', className }: LuxuryWordmarkProps) {
  const rootClass = [
    styles.wordmark,
    variant === 'footer' ? styles.wordmarkFooter : styles.wordmarkNav,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (variant === 'nav') {
    return (
      <span className={rootClass} aria-label="Iron & Water Co.">
        IRON &amp; WATER CO.
      </span>
    )
  }

  return (
    <span className={rootClass} aria-label="Iron & Water Co.">
      <span className={styles.wordmarkPrimary}>Iron &amp; Water</span>
      <span className={styles.wordmarkCo}>Co.</span>
    </span>
  )
}

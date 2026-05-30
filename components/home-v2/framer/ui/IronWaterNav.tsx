'use client'

import Link from 'next/link'
import { navLinks, heroContent } from '../../../../data/homepage'
import LuxuryWordmark from './LuxuryWordmark'
import styles from '../framer-sections.module.css'

type IronWaterNavProps = {
  onFoundersClick?: () => void
}

export default function IronWaterNav({ onFoundersClick }: IronWaterNavProps) {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <Link href="/" className={styles.navLogo}>
        <LuxuryWordmark variant="nav" />
      </Link>
      <div className={styles.navLinks}>
        {navLinks.map((link) => (
          <Link key={link.label} href={link.href} className={styles.navLink}>
            {link.label}
          </Link>
        ))}
        {onFoundersClick ? (
          <button type="button" className={styles.navCta} onClick={onFoundersClick}>
            {heroContent.ctaLabel}
          </button>
        ) : (
          <Link href="#contact" className={styles.navCta}>
            {heroContent.ctaLabel}
          </Link>
        )}
      </div>
    </nav>
  )
}

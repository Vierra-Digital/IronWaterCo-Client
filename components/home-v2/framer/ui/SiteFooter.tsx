import Link from 'next/link'
import { navLinks } from '../../../../data/homepage'
import Grain from './Grain'
import LuxuryWordmark from './LuxuryWordmark'
import styles from '../framer-sections.module.css'

const SOCIAL = [
  { label: 'LinkedIn', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Alignable', href: '#' },
]

const LEGAL = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
]

export default function SiteFooter() {
  return (
    <footer className={styles.siteFooter}>
      <Grain />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p className={styles.footerLogo}>
          <LuxuryWordmark variant="footer" />
        </p>
        <p className={styles.footerTagline}>The Architecture of Beauty</p>
        <div className={styles.footerLinks}>
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className={styles.footerSocial}>
          {SOCIAL.map((s) => (
            <a key={s.label} href={s.href}>
              {s.label}
            </a>
          ))}
        </div>
        <div className={styles.footerLegal}>
          {LEGAL.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <p className={styles.footerCopy}>&copy; 2025 Iron & Water Co. All rights reserved.</p>
      </div>
    </footer>
  )
}

'use client'

import type { MutableRefObject } from 'react'
import {
  CONSTELLATION_SLOTS,
  CONTACT_LINES,
  DIFFERENTIATORS,
  SERVICES,
  TEAM,
  TESTIMONIALS,
} from './scrollConfig'
import styles from './hero.module.css'

type HeroTextBgProps = {
  bgWordRef?: MutableRefObject<HTMLParagraphElement | null>
}

export function HeroTextBg({ bgWordRef }: HeroTextBgProps) {
  return (
    <div className={styles.textBg} aria-hidden>
      <p
        ref={bgWordRef}
        className={styles.headlineBg}
        data-section="hero-bg-word"
        style={{ opacity: 1 }}
      >
        Elevating
      </p>
    </div>
  )
}

type HeroTextProps = {
  onOpenModal?: () => void
}

export default function HeroText({ onOpenModal }: HeroTextProps) {
  return (
    <>
      <div className={styles.textMid} aria-live="polite">
        {TESTIMONIALS.map((t, i) => (
          <blockquote
            key={t.name}
            className={styles.testimonial}
            data-section="testimonial"
            data-index={i}
          >
            <span className={styles.quoteMark} aria-hidden>
              &ldquo;
            </span>
            <p className={styles.testimonialQuote}>{t.quote}</p>
            <footer className={styles.testimonialFooter}>
              <cite className={styles.testimonialName}>— {t.name}</cite>
              <span className={styles.testimonialTitle}>{t.title}</span>
            </footer>
          </blockquote>
        ))}
      </div>

      <div className={styles.textOverlay}>
        <div
          className={`${styles.moment} ${styles.momentBottom}`}
          data-section="hero-moment"
          style={{ opacity: 1, visibility: 'visible' }}
        >
          <span className={styles.label}>Iron &amp; Water Co.</span>
          <h1 className={styles.headlineFg}>the Design Trade</h1>
          <p className={styles.subtext}>
            Through Exceptional Detail, Service, and Partnership
          </p>
        </div>

        <div className={styles.servicesSection} data-section="services-section">
          <span className={styles.servicesSectionLabel} data-section="services-label">
            Our Services
          </span>

          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              className={styles.serviceActive}
              data-section="service-panel"
              data-index={i}
            >
              <h2 className={styles.serviceActiveTitle}>{service.title}</h2>
              <p className={styles.serviceActiveDesc}>{service.description}</p>
            </div>
          ))}

          {CONSTELLATION_SLOTS.map((pos, i) => (
            <span
              key={i}
              className={styles.constellationLabel}
              data-section="constellation-slot"
              data-index={i}
              style={{ top: pos.top, left: pos.left, right: pos.right }}
            />
          ))}
        </div>

        <div
          className={`${styles.moment} ${styles.momentCenter}`}
          data-section="stats-intro"
        >
          <span className={styles.label}>Why Iron &amp; Water Co.</span>
          <h1 className={styles.headlineFg}>Built for Excellence</h1>
        </div>

        <div className={styles.statsLayer} data-section="stats-layer">
          {[
            { num: '0+', label: 'Years of Combined Experience', pos: 'left' as const },
            { num: '0+', label: 'Successful Projects', pos: 'center' as const },
            { num: '0+', label: 'Satisfied Clients', pos: 'right' as const },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`${styles.statFixed} ${styles[`statFixed${stat.pos}`]}`}
              data-section="stat-block"
              data-index={i}
            >
              <span className={styles.statNumberLarge} data-section="stat-number" data-index={i}>
                {stat.num}
              </span>
              <span className={styles.statLabelLarge}>{stat.label}</span>
            </div>
          ))}
          <span className={styles.statDividerLeft} data-section="stat-divider" data-index={0} aria-hidden />
          <span className={styles.statDividerRight} data-section="stat-divider" data-index={1} aria-hidden />
        </div>

        <p className={styles.statsQuote} data-section="stats-quote">
          &ldquo;Because when you work with us, you don&apos;t just choose fixtures. You shape
          legacy.&rdquo;
        </p>

        <div
          className={`${styles.moment} ${styles.momentBottom}`}
          data-section="diff-intro"
        >
          <span className={styles.label}>What We Do Differently</span>
          <h1 className={styles.headlineFg}>
            Uncompromising
            <br />
            Excellence
          </h1>
        </div>

        {DIFFERENTIATORS.map((item) => (
          <div
            key={item.num}
            className={`${styles.moment} ${styles.momentBottom} ${styles.diffPanel}`}
            data-section="diff-item"
            data-index={Number(item.num) - 1}
          >
            <span className={styles.diffNumLarge}>{item.num}</span>
            <h2 className={styles.diffTitle}>{item.title}</h2>
            <p className={styles.diffDesc}>{item.description}</p>
          </div>
        ))}

        {TEAM.map((member, i) => (
          <div
            key={member.name}
            className={`${styles.moment} ${styles.momentCenter} ${styles.teamPanel}`}
            data-section="team-member"
            data-index={i}
          >
            {i === 0 && (
              <span className={styles.label}>Our Team</span>
            )}
            <div className={styles.teamCircle}>
              <span className={styles.teamInitials}>{member.initials}</span>
            </div>
            <h2 className={styles.teamName}>{member.name}</h2>
            <p className={styles.teamTitle}>{member.title}</p>
          </div>
        ))}

        <div
          className={`${styles.moment} ${styles.momentCenter} ${styles.contactPanel}`}
          data-section="contact-content"
        >
          <span className={styles.label}>Get in Touch</span>
          <h1 className={styles.contactHeadline}>Shape Legacy With Us</h1>
          <p className={styles.contactSubtext}>
            Partnering with architects, designers, builders and homeowners on Long Island&apos;s
            Miracle Mile.
          </p>
          <div className={styles.contactLines}>
            {CONTACT_LINES.map((line, i) => (
              <p
                key={line}
                className={`${styles.contactLine} ${i === 3 ? styles.contactLineGold : ''}`}
                data-section="contact-line"
                data-index={i}
              >
                {line}
              </p>
            ))}
          </div>
          {onOpenModal && (
            <button type="button" className={styles.ctaPulse} onClick={onOpenModal}>
              Join Our Founders Circle
            </button>
          )}
        </div>

        <p className={styles.footerLine} data-section="footer">
          © 2025 Iron &amp; Water Co. All rights reserved. The Architecture of Beauty.
        </p>
      </div>
    </>
  )
}

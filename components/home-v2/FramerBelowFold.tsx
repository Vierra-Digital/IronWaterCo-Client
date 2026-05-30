'use client'

import ScrollReveal from './motion/ScrollReveal'
import {
  ContactSection,
  ServicesGrid,
  SiteFooter,
  TeamSection,
  TestimonialCarousel,
  WhyStatsSection,
  WWDDSection,
} from './framer/ui'

type FramerBelowFoldProps = {
  reducedMotion?: boolean
}

function Reveal({
  children,
  reducedMotion,
}: {
  children: React.ReactNode
  reducedMotion?: boolean
}) {
  if (reducedMotion) return <>{children}</>
  return <ScrollReveal>{children}</ScrollReveal>
}

export default function FramerBelowFold({ reducedMotion = false }: FramerBelowFoldProps) {
  return (
    <div style={{ position: 'relative', zIndex: 2, background: '#0a0e1a' }}>
      <Reveal reducedMotion={reducedMotion}>
        <ServicesGrid />
      </Reveal>
      <Reveal reducedMotion={reducedMotion}>
        <WhyStatsSection />
      </Reveal>
      <Reveal reducedMotion={reducedMotion}>
        <WWDDSection />
      </Reveal>
      <Reveal reducedMotion={reducedMotion}>
        <TestimonialCarousel />
      </Reveal>
      <Reveal reducedMotion={reducedMotion}>
        <TeamSection />
      </Reveal>
      <Reveal reducedMotion={reducedMotion}>
        <ContactSection />
      </Reveal>
      <SiteFooter />
    </div>
  )
}

'use client'

import { Cormorant_Garamond, Inter } from 'next/font/google'
import { useEffect, useRef } from 'react'
import { createHeroScene, type HeroSceneHandle } from './HeroScene'
import { setupHeroScroll, type HeroScrollHandle } from './HeroScroll'
import HeroText, { HeroTextBg } from './HeroText'
import styles from './hero.module.css'

const displayFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-display',
})

const sansFont = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

type HeroProps = {
  onOpenModal?: () => void
}

export default function Hero({ onOpenModal }: HeroProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const bgWordRef = useRef<HTMLParagraphElement>(null)
  const momentRefs = useRef<(HTMLDivElement | null)[]>([])
  const serviceLabelRefs = useRef<(HTMLSpanElement | null)[]>([])
  const statNumberRefs = useRef<(HTMLSpanElement | null)[]>([])
  const diffItemRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const sceneHandle = useRef<HeroSceneHandle | null>(null)
  const scrollHandle = useRef<HeroScrollHandle | null>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const mouseTarget = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)').matches
    const container = canvasRef.current
    const scrollContainer = scrollRef.current
    if (!container || !scrollContainer) return

    const handle = createHeroScene(container, mobile)
    sceneHandle.current = handle

    let scrollSetupFrame = 0
    scrollSetupFrame = requestAnimationFrame(() => {
      scrollHandle.current = setupHeroScroll(
        scrollContainer,
        handle.cameraState,
        handle.objectScroll,
        {
          moments: [0, 1, 2, 3, 4]
            .map((i) => momentRefs.current[i])
            .filter(Boolean) as HTMLElement[],
          bgWord: bgWordRef.current,
          scrollHint: scrollHintRef.current,
          serviceLabels: [0, 1, 2, 3]
            .map((i) => serviceLabelRefs.current[i])
            .filter(Boolean) as HTMLElement[],
          statNumbers: [0, 1, 2]
            .map((i) => statNumberRefs.current[i])
            .filter(Boolean) as HTMLElement[],
          diffItems: [0, 1, 2, 3]
            .map((i) => diffItemRefs.current[i])
            .filter(Boolean) as HTMLElement[],
        }
      )
    })

    const onMouseMove = (e: MouseEvent) => {
      if (mobile) return
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }

    let raf = 0
    const parallaxLoop = () => {
      mouseTarget.current.x += (mouse.current.x - mouseTarget.current.x) * 0.05
      mouseTarget.current.y += (mouse.current.y - mouseTarget.current.y) * 0.05
      handle.applyMouseParallax(mouseTarget.current.x, mouseTarget.current.y)
      raf = requestAnimationFrame(parallaxLoop)
    }
    parallaxLoop()

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(scrollSetupFrame)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(raf)
      scrollHandle.current?.kill()
      handle.dispose()
      sceneHandle.current = null
    }
  }, [])

  return (
    <section
      className={`${styles.heroRoot} ${displayFont.variable} ${sansFont.variable}`}
      id="hero"
      aria-label="Hero"
    >
      <HeroTextBg bgWordRef={bgWordRef} />

      <div ref={canvasRef} id="hero-canvas-container" className={styles.canvasWrap} />

      <div className={styles.vignette} aria-hidden />

      <HeroText
        momentRefs={momentRefs}
        serviceLabelRefs={serviceLabelRefs}
        statNumberRefs={statNumberRefs}
        diffItemRefs={diffItemRefs}
        onOpenModal={onOpenModal}
      />

      <div ref={scrollHintRef} className={styles.scrollHint}>
        <div className={styles.scrollTrack}>
          <span className={styles.scrollDot} />
        </div>
        <span className={styles.scrollWord}>Scroll</span>
      </div>

      <div ref={scrollRef} className={styles.heroScrollContainer} aria-hidden />
    </section>
  )
}

export { Hero }

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { CameraState } from './HeroScene'
import type { ObjectScrollState } from './objectScrollState'

gsap.registerPlugin(ScrollTrigger)

export type HeroScrollHandle = {
  kill: () => void
}

export type HeroScrollElements = {
  moments: HTMLElement[]
  bgWord: HTMLElement | null
  scrollHint: HTMLElement | null
  serviceLabels: HTMLElement[]
  statNumbers: HTMLElement[]
  diffItems: HTMLElement[]
}

function setMomentOpacity(el: HTMLElement, opacity: number, centered = false) {
  const o = Math.max(0, Math.min(1, opacity))
  el.style.opacity = String(o)
  el.style.visibility = o > 0.01 ? 'visible' : 'hidden'
  el.style.pointerEvents = o > 0.5 ? 'auto' : 'none'
  const y = 20 * (1 - o)
  el.style.transform = centered
    ? `translateX(-50%) translateY(${y}px)`
    : `translateY(${y}px)`
}

function bindMoment(
  scrollContainer: HTMLElement,
  el: HTMLElement,
  fadeInStart: number,
  fadeInEnd: number,
  fadeOutStart: number,
  fadeOutEnd: number,
  centered = false
) {
  ScrollTrigger.create({
    trigger: scrollContainer,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const p = self.progress
      let opacity = 0
      if (p >= fadeInStart && p <= fadeOutEnd) {
        if (p < fadeInEnd) opacity = (p - fadeInStart) / (fadeInEnd - fadeInStart)
        else if (p > fadeOutStart) opacity = (fadeOutEnd - p) / (fadeOutEnd - fadeOutStart)
        else opacity = 1
      }
      setMomentOpacity(el, opacity, centered)
    },
  })
}

function bindAlwaysVisibleFrom(
  scrollContainer: HTMLElement,
  el: HTMLElement,
  fadeInStart: number,
  fadeInEnd: number,
  centered = false
) {
  ScrollTrigger.create({
    trigger: scrollContainer,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const p = self.progress
      let opacity = 0
      if (p >= fadeInStart) {
        opacity = p < fadeInEnd ? (p - fadeInStart) / (fadeInEnd - fadeInStart) : 1
      }
      setMomentOpacity(el, opacity, centered)
    },
  })
}

function runStatCountUp(statNumbers: HTMLElement[]) {
  const targets = [60, 100, 50]
  statNumbers.forEach((el, i) => {
    const target = targets[i] ?? 0
    const proxy = { val: 0 }
    gsap.fromTo(
      proxy,
      { val: 0 },
      {
        val: target,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = `${Math.round(proxy.val)}+`
        },
      }
    )
  })
}

export function setupHeroScroll(
  scrollContainer: HTMLElement,
  cameraState: CameraState,
  objectScroll: ObjectScrollState,
  elements: HeroScrollElements
): HeroScrollHandle {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scrollContainer,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 2,
    },
  })

  tl.to(cameraState, { z: 6, duration: 0.2, ease: 'none' }, 0.8)
  tl.to(
    objectScroll,
    { bathtubScale: 1.1, faucetX: -3.5, duration: 0.2, ease: 'none' },
    0.8
  )

  tl.to(cameraState, { x: 1.5, y: 0.3, z: 5.5, duration: 1, ease: 'none' }, 1)
  tl.to(
    objectScroll,
    { showerZ: 1, faucetX: -4.5, bathtubX: -0.8, duration: 1, ease: 'none' },
    1
  )

  tl.to(cameraState, { x: 0, y: -0.5, z: 4.5, duration: 1, ease: 'none' }, 2)
  tl.to(
    objectScroll,
    {
      bathtubScale: 1.35,
      bathtubY: 0.4,
      showerX: 3.6,
      doorHandleX: 5.2,
      faucetX: -5,
      duration: 1,
      ease: 'none',
    },
    2
  )

  tl.to(cameraState, { x: -1.5, y: 0, z: 3.5, duration: 1, ease: 'none' }, 3)
  tl.to(
    objectScroll,
    {
      faucetX: -2,
      faucetScale: 1.3,
      bathtubScale: 0.9,
      bathtubX: 0.2,
      duration: 1,
      ease: 'none',
    },
    3
  )

  tl.to(cameraState, { x: 0, y: -0.3, z: 7.5, duration: 1, ease: 'none' }, 4)
  tl.to(
    objectScroll,
    {
      faucetX: -2.5,
      faucetZ: 3.5,
      faucetScale: 1,
      showerZ: -2,
      showerX: 2.8,
      bathtubX: 0,
      bathtubY: 0,
      bathtubScale: 1,
      doorHandleX: 3.8,
      doorHandleZ: 4,
      duration: 1,
      ease: 'none',
    },
    4
  )

  if (elements.bgWord) {
    bindMoment(scrollContainer, elements.bgWord, 0, 0.04, 0.12, 0.16)
  }

  if (elements.moments[0]) {
    bindMoment(scrollContainer, elements.moments[0], 0, 0.04, 0.12, 0.16)
  }
  if (elements.moments[1]) {
    bindMoment(scrollContainer, elements.moments[1], 0.24, 0.28, 0.32, 0.36)
  }
  if (elements.moments[2]) {
    bindMoment(scrollContainer, elements.moments[2], 0.44, 0.48, 0.52, 0.56)
  }
  if (elements.moments[3]) {
    bindMoment(scrollContainer, elements.moments[3], 0.64, 0.68, 0.72, 0.76)
  }
  if (elements.moments[4]) {
    bindAlwaysVisibleFrom(scrollContainer, elements.moments[4], 0.84, 0.88, true)
  }

  let servicesAnimated = false
  ScrollTrigger.create({
    trigger: scrollContainer,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const p = self.progress
      if (!servicesAnimated && p >= 0.24) {
        servicesAnimated = true
        gsap.fromTo(
          elements.serviceLabels,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            stagger: 0.3,
            ease: 'power2.out',
            onStart: () => {
              elements.serviceLabels.forEach((label) => {
                label.style.visibility = 'visible'
              })
            },
          }
        )
      }
      if (servicesAnimated && p < 0.22) {
        servicesAnimated = false
        elements.serviceLabels.forEach((label) => {
          gsap.set(label, { opacity: 0 })
          label.style.visibility = 'hidden'
        })
      }
      if (p > 0.36) {
        elements.serviceLabels.forEach((label) => {
          const fade = (0.4 - p) / 0.04
          const o = Math.max(0, fade)
          label.style.opacity = String(o)
          label.style.visibility = o > 0.01 ? 'visible' : 'hidden'
        })
      }
    },
  })

  let statsPlayed = false
  ScrollTrigger.create({
    trigger: scrollContainer,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const p = self.progress
      if (!statsPlayed && p >= 0.4 && p < 0.6) {
        statsPlayed = true
        runStatCountUp(elements.statNumbers)
      }
      if (statsPlayed && p < 0.38) {
        statsPlayed = false
        elements.statNumbers.forEach((el) => {
          el.textContent = '0+'
        })
      }
    },
  })

  let diffAnimated = false
  ScrollTrigger.create({
    trigger: scrollContainer,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const p = self.progress
      if (!diffAnimated && p >= 0.64) {
        diffAnimated = true
        elements.diffItems.forEach((item, i) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.4, delay: i * 0.2, ease: 'power2.out' }
          )
        })
      }
      if (diffAnimated && p < 0.62) {
        diffAnimated = false
        elements.diffItems.forEach((item) => {
          gsap.set(item, { opacity: 0, y: 12 })
        })
      }
    },
  })

  let hintScrollHandler: (() => void) | null = null
  if (elements.scrollHint) {
    const hint = elements.scrollHint
    hintScrollHandler = () => {
      hint.style.opacity = window.scrollY > window.innerHeight * 0.15 ? '0' : '1'
    }
    hintScrollHandler()
    window.addEventListener('scroll', hintScrollHandler, { passive: true })
    ScrollTrigger.create({
      trigger: scrollContainer,
      start: 'top top',
      end: 'bottom bottom',
      onRefresh: hintScrollHandler,
    })
  }

  return {
    kill: () => {
      if (hintScrollHandler) {
        window.removeEventListener('scroll', hintScrollHandler)
      }
      tl.scrollTrigger?.kill()
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === scrollContainer) st.kill()
      })
    },
  }
}

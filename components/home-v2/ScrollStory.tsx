'use client'

import { useEffect, useRef, useState } from 'react'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import PenthouseBackdrop from './penthouse/PenthouseBackdrop'
import { IronWaterNav, SiteFooter } from './framer/ui'
import Scene03Services from './scenes/Scene03Services'
import Scene04Why from './scenes/Scene04Why'
import Scene05Testimonials from './scenes/Scene05Testimonials'
import Scene06Team from './scenes/Scene06Team'
import Scene07Contact from './scenes/Scene07Contact'
import SceneHeroBeat from './scenes/SceneHeroBeat'
import SceneTransition from './scenes/SceneTransition'
import SceneWWDD from './scenes/SceneWWDD'
import { StoryCameraProvider } from './StoryCameraContext'
import { useStoryCameraProgress } from './hooks/useStoryCameraProgress'
import styles from './home-v2-scrolly.module.css'

const displayFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
})

const sansFont = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

type ScrollStoryProps = {
  onOpenModal: () => void
}

export default function ScrollStory({ onOpenModal }: ScrollStoryProps) {
  const storyTrackRef = useRef<HTMLDivElement>(null)
  const [mobile, setMobile] = useState(false)

  const { scrollYProgress, scrollProgressRef, activeSectionId } = useStoryCameraProgress({
    storyTrackRef,
    mobile,
  })

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <StoryCameraProvider
      value={{
        storyTrackRef,
        mobile,
        scrollYProgress,
        scrollProgressRef,
        activeSectionId,
      }}
    >
      <div className={`${styles.story} ${displayFont.variable} ${sansFont.variable}`}>
        <IronWaterNav onFoundersClick={onOpenModal} />

        <PenthouseBackdrop
          scrollProgressRef={scrollProgressRef}
          globalProgress={scrollYProgress}
          activeSectionId={activeSectionId}
        />

        <div ref={storyTrackRef} className={styles.storyTrack}>
          {[0, 1, 2, 3, 4].map((i) => (
            <SceneHeroBeat
              key={i}
              beatIndex={i}
              onOpenModal={onOpenModal}
              showScrollHint={i === 0}
            />
          ))}
          <Scene03Services />
          <Scene04Why />
          <SceneWWDD />
          <Scene05Testimonials />
          <Scene06Team />
          <SceneTransition />
        </div>

        <Scene07Contact canvasFadeProgress={scrollYProgress} />
        <div className={styles.contactFooterWrap}>
          <SiteFooter />
        </div>
      </div>
    </StoryCameraProvider>
  )
}

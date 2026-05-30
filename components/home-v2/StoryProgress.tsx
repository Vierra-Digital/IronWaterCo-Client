'use client'

import { useEffect, useState } from 'react'
import styles from './home-v2-scrolly.module.css'

type StoryProgressProps = {
  sceneIds: string[]
}

export default function StoryProgress({ sceneIds }: StoryProgressProps) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sceneIds.indexOf(entry.target.id)
            if (idx >= 0) setActive(idx)
          }
        })
      },
      { threshold: 0.35, rootMargin: '-20% 0px -20% 0px' }
    )

    sceneIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sceneIds])

  const scrollToScene = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={styles.progressRail} aria-label="Story progress">
      {sceneIds.map((id, i) => (
        <button
          key={id}
          type="button"
          className={`${styles.progressDot} ${i === active ? styles.progressDotActive : ''}`}
          onClick={() => scrollToScene(id)}
          aria-label={`Go to scene ${i + 1}`}
          aria-current={i === active ? 'step' : undefined}
        />
      ))}
    </nav>
  )
}

'use client'

import Link from 'next/link'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import FormModal from '../FormModal'
import FramerBelowFold from './FramerBelowFold'
import { IronWaterNav } from './framer/ui'
import { heroScenes } from '../../data/homepage'
import { useState } from 'react'
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

export default function HomeV2Static() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className={`${styles.staticPage} ${displayFont.variable} ${sansFont.variable}`}>
      <IronWaterNav onFoundersClick={() => setIsModalOpen(true)} />
      <div className={styles.staticBack}>
        <Link href="/">← Back to main site</Link>
      </div>

      <section style={{ paddingTop: '5rem', background: '#0a0e1a' }}>
        {heroScenes.map((scene) => (
          <article key={scene.image} style={{ marginBottom: '3rem' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={scene.image}
              alt=""
              style={{ width: '100%', maxHeight: 360, objectFit: 'cover', marginBottom: '1.5rem' }}
            />
            <h1 className={styles.display}>{scene.title}</h1>
            <p style={{ color: 'rgba(245,240,235,0.8)', marginTop: '1rem' }}>{scene.subtext}</p>
          </article>
        ))}
      </section>

      <FramerBelowFold />
      <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

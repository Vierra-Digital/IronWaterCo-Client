'use client'

import { useState } from 'react'
import FormModal from '../FormModal'
import Hero from './hero'
import { IronWaterNav } from './framer/ui'
import styles from './home-v2-scrolly.module.css'

export default function HomeV2Page() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className={styles.page}>
      <IronWaterNav onFoundersClick={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

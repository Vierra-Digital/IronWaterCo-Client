'use client'

import { useState } from 'react'
import Image from 'next/image'
import FormModal from './FormModal'

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <div className="hero-container">
        <div className="hero-content">
          {/* Logo at top left */}
          <div className="logo-container">
            <Image
              src="/logo.png"
              alt="Iron & Water Co. Logo"
              width={120}
              height={120}
              className="logo"
            />
          </div>

          {/* Centered text content */}
          <div className="hero-text">
            <h1 className="hero-headline">Iron & Water Co.</h1>
            <h2 className="hero-subtitle">Coming to Miracle Mile</h2>
            <p className="hero-description">
              Early access for designers, architects, builders & homeowners.
            </p>
            
            {/* Opening Dates */}
            <div className="opening-dates">
              <p className="opening-date">Soft Opening November 2025</p>
              <p className="opening-date">Grand Opening 2026</p>
            </div>
            
            {/* CTA Button */}
            <button className="cta-button" onClick={openModal}>
              Get Early Access
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <FormModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}

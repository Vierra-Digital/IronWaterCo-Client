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
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            <div className="navbar-logo">
              <Image
                src="/logo.png"
                alt="Iron & Water Co. Logo"
                width={80}
                height={80}
                className="navbar-logo-img"
              />
            </div>
            <div className="navbar-text">
              <span className="navbar-title">Iron & Water Co.</span>
              <span className="navbar-address">1506 Northern Blvd. Manhasset, NY 11030</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-headline">Elevating The Design Trade Through Exceptional Detail, Service, And Partnership</h1>
            <p className="hero-description">
              Coming soon to Miracle Mile. Early access for designers, architects, builders & homeowners. Soft opening November 2025 and grand opening 2026.
            </p>
            
            {/* CTA Button */}
            <button className="cta-button" onClick={openModal}>
              Get Early Access
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-address">
            <p>1506 Northern Blvd. Manhasset, NY 11030</p>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2025 Iron & Water Co. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <FormModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}

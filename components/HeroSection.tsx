'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import FormModal from './FormModal'
import ServicesSection from './ServicesSection'
import ReviewsSection from './ReviewsSection'
import TeamSection from './TeamSection'
import WhatWeDoDifferently from './WhatWeDoDifferently'
import DifferentiationSection from './DifferentiationSection'
import ContactSection from './ContactSection'
import Footer from './Footer'

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar ${isLoaded ? 'navbar-loaded' : ''}`} aria-label="Main navigation">
        <div className="navbar-content">
          <a href="#" className="navbar-brand" aria-label="Iron & Water Co. Home">
            <div className="navbar-logo">
              <Image
                src="/logo.png"
                alt="Iron & Water Co. - Premium Architectural Hardware & Plumbing Logo"
                width={50}
                height={50}
                className="navbar-logo-img"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div className="navbar-text">
              <span className="navbar-title">Iron & Water Co.</span>
            </div>
          </a>
          <div className="navbar-links" role="list">
            <a href="#services" className="nav-link" role="listitem">Services</a>
            <a href="/vendors" className="nav-link" role="listitem">Vendors</a>
            <a href="/knowledgebase" className="nav-link" role="listitem">Knowledgebase</a>
            <a href="/faq" className="nav-link" role="listitem">FAQ</a>
            <a href="#contact" className="nav-link" role="listitem">Contact</a>
            <button className="nav-cta" onClick={openModal} aria-label="Join Our Founders Circle - Early Access Form">Join Our Founders Circle</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-container" role="banner">
        <div className={`hero-content ${isLoaded ? 'hero-content-loaded' : ''}`}>
          <div className="hero-text">
            <h1 className="hero-headline">Elevating the Design Trade Through Exceptional Detail, Service, and Partnership</h1>
            <p className="hero-intro">
              Iron & Water Co. curates extraordinary architectural hardware and plumbing for the trade on Long Island's Miracle Mile.
            </p>
            
            {/* CTAs */}
            <div className="cta-group">
              <button className="cta-primary" onClick={openModal} aria-label="Join Our Founders Circle - Get Early Access">
                Design Without Compromise
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Statistics Section */}

      {/* Services Section */}
      <ServicesSection />



      {/* Differentiation Section */}
      <DifferentiationSection />

      {/* What We Do Differently */}
      <WhatWeDoDifferently />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Team Section */}
      <TeamSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Modal */}
      <FormModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'
import FormModal from './FormModal'
import Navbar from './Navbar'
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
      <Navbar activePage="home" />

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

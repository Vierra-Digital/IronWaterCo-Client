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
            <a href="#differentiation" className="nav-link" role="listitem">Why Us</a>
            <a href="#reviews" className="nav-link" role="listitem">Reviews</a>
            <a href="#team" className="nav-link" role="listitem">Team</a>
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
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-column">
              <div className="footer-logo">
                <Image 
                  src="/logo.png" 
                  alt="Iron & Water Co. - Architectural Hardware & Plumbing Showroom Logo" 
                  width={100} 
                  height={100}
                  loading="lazy"
                />
                <p className="footer-brand">Iron & Water Co.</p>
                <p className="footer-tagline">"New inspiration every day."</p>
              </div>
            </div>
            
            <address className="footer-column">
              <h3>Contact</h3>
              <p>1506 Northern Blvd</p>
              <p>Manhasset, NY 11030</p>
              <p><a href="mailto:customerexperience@ironandwaterco.com" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="Email Iron & Water Co.">customerexperience@ironandwaterco.com</a></p>
              <p><a href="tel:329-233-6638" className="footer-link" aria-label="Call Iron & Water Co.">329-233-6638</a></p>
            </address>
            
            <nav className="footer-column" aria-label="Social media links">
              <h3>Connect</h3>
              <p><a href="https://www.linkedin.com/company/iron-water-co/" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="Visit Iron & Water Co. on LinkedIn">LinkedIn</a></p>
              <p><a href="https://www.instagram.com/ironandwaterco/" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="Follow Iron & Water Co. on Instagram">Instagram</a></p>
              <p>Alignable</p>
            </nav>
            
            <nav className="footer-column" aria-label="Legal information">
              <h3>Legal</h3>
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
            </nav>
          </div>
        </div>
        {/* Copyright bar */}
        <div className="footer-bar">
          <div className="container">
            <p>
              &copy; 2025 Iron & Water Co. All rights reserved. | Powered by <a href="https://vierradev.com" target="_blank" rel="noopener noreferrer" className="footer-powered-link">Vierra Digital</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <FormModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}

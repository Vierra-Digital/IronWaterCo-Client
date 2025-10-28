'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import FormModal from './FormModal'
import Preloader from './Preloader'
import ServicesSection from './ServicesSection'
import TimelineSection from './TimelineSection'
import ReviewsSection from './ReviewsSection'
import TeamSection from './TeamSection'
import WhatWeDoDifferently from './WhatWeDoDifferently'
import DifferentiationSection from './DifferentiationSection'
import ContactSection from './ContactSection'

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const heroImages = [
    { src: '/logo.png', alt: 'Design Excellence', caption: 'Elevated Craftsmanship' },
    { src: '/logo.png', alt: 'Modern Hardware', caption: 'Precision Design' },
    { src: '/logo.png', alt: 'Luxury Plumbing', caption: 'Exceptional Detail' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [heroImages.length])

  return (
    <>
      <Preloader />
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <a href="#" className="navbar-brand">
            <div className="navbar-logo">
              <Image
                src="/logo.png"
                alt="Iron & Water Co. Logo"
                width={50}
                height={50}
                className="navbar-logo-img"
              />
            </div>
            <div className="navbar-text">
              <span className="navbar-title">Iron & Water Co.</span>
            </div>
          </a>
          <div className="navbar-links">
            <a href="#services" className="nav-link">Services</a>
            <a href="#timeline" className="nav-link">Timeline</a>
            <a href="#differentiation" className="nav-link">Why Us</a>
            <a href="#reviews" className="nav-link">Reviews</a>
            <a href="#team" className="nav-link">Team</a>
            <a href="#contact" className="nav-link">Contact</a>
            <button className="nav-cta" onClick={openModal}>Join Our Trade Network</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-headline">Elevating the Design Trade Through Exceptional Detail, Service, and Partnership</h1>
            <p className="hero-intro">
              Iron & Water Co. curates extraordinary architectural hardware and plumbing for the trade on Long Island's Miracle Mile.
            </p>
            
            {/* CTAs */}
            <div className="cta-group">
              <button className="cta-primary" onClick={openModal}>
                Design Without Compromise
              </button>
            </div>
          </div>
          <div className="hero-image-scroller">
            <div className="scroller-wrapper-hero">
              <div className="scroller-track-hero">
                {heroImages.map((image, index) => (
                  <div
                    key={index}
                    className={`scroller-slide-hero ${index === currentImageIndex ? 'active' : ''}`}
                    style={{ transform: `translateX(${(index - currentImageIndex) * 100}%)` }}
                  >
                    <div className="scroller-image-hero">
                      <Image src={image.src} alt={image.alt} width={600} height={400} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}

      {/* Services Section */}
      <ServicesSection />

      {/* Timeline Section */}
      <TimelineSection />


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
                <Image src="/logo.png" alt="Iron & Water Co." width={100} height={100} />
                <p className="footer-brand">Iron & Water Co.</p>
                <p className="footer-tagline">"New inspiration every day."</p>
              </div>
            </div>
            
            <div className="footer-column">
              <h3>Contact</h3>
              <p>1506 Northern Blvd</p>
              <p>Manhasset, NY 11030</p>
              <p><a href="mailto:customercare@ironandwaterco.com" target="_blank" rel="noopener noreferrer" className="footer-link">customercare@ironandwaterco.com</a></p>
              <p>329-233-6638</p>
            </div>
            
            <div className="footer-column">
              <h3>Connect</h3>
              <p><a href="https://www.linkedin.com/company/iron-water-co/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a></p>
              <p>Instagram</p>
              <p>Facebook</p>
              <p>Alignable</p>
            </div>
            
            <div className="footer-column">
              <h3>Legal</h3>
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
            </div>
          </div>
        </div>
        {/* Copyright bar */}
        <div className="footer-bar">
          <div className="container">
            <p>&copy; 2025 Iron & Water Co. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <FormModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}

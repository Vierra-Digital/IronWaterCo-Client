'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ImageScroller() {
  const images = [
    { src: '/logo.png', alt: 'Iron & Water Co. Architectural Hardware - Design Excellence and Elevated Craftsmanship', caption: 'Elevated Craftsmanship' },
    { src: '/logo.png', alt: 'Modern Architectural Hardware and Plumbing Fixtures - Precision Design for Trade Professionals', caption: 'Precision Design' },
    { src: '/logo.png', alt: 'Luxury Plumbing Fixtures and Architectural Hardware - Exceptional Detail for Designers and Architects', caption: 'Exceptional Detail' },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section id="gallery" className="image-scroller-section">
      <div className="container">
        <p className="section-subtitle">Objects of Desire</p>
        <h2 className="section-title">Gallery</h2>
        <div className="scroller-wrapper">
          <div className="scroller-track">
            {images.map((image, index) => (
              <div
                key={index}
                className={`scroller-slide ${index === currentIndex ? 'active' : ''}`}
                style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}
              >
                <div className="scroller-image">
                  <Image 
                    src={image.src} 
                    alt={image.alt} 
                    width={600} 
                    height={400}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />
                </div>
                <p className="scroller-caption">{image.caption}</p>
              </div>
            ))}
          </div>
          <div className="scroller-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ImageScroller() {
  const images = [
    { src: '/logo.png', alt: 'Design Excellence', caption: 'Elevated Craftsmanship' },
    { src: '/logo.png', alt: 'Modern Hardware', caption: 'Precision Design' },
    { src: '/logo.png', alt: 'Luxury Plumbing', caption: 'Exceptional Detail' },
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
                  <Image src={image.src} alt={image.alt} width={600} height={400} />
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


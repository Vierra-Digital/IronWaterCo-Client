'use client'

import { useEffect, useRef } from 'react'

export default function WhatWeDoDifferently() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('fade-in-visible')
            }, index * 100)
          }
        })
      },
      { threshold: 0.1 }
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      title: 'Uncompromising Precision',
      description: 'Every detail engineered to perfection, because mediocrity has no place in exceptional design.'
    },
    {
      title: 'White-Glove Service',
      description: 'From initial consultation to final installation, we handle every detail with meticulous care.'
    },
    {
      title: 'Trade-First Approach',
      description: 'Built by professionals, for professionals. We understand your workflow and respect your timeline.'
    },
    {
      title: 'Curated Excellence',
      description: 'Every product in our collection is hand-selected for quality, aesthetic, and durability.'
    }
  ]

  return (
    <section className="what-we-do-section">
      <div className="container">
        <p className="section-subtitle">Excellence in Every Detail</p>
        <h2 className="section-title">What We Do Differently</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="feature-card fade-in"
            >
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

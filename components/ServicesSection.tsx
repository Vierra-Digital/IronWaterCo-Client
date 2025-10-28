'use client'

import { useEffect, useRef } from 'react'

export default function ServicesSection() {
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

  const services = [
    { title: 'Trade Program', description: 'Partnering with architects, designers, builders.' },
    { title: 'Curated Collections', description: 'Every fixture and handle is a statement piece.' },
    { title: 'Specification Support', description: 'Beauty aligned with code and logistics.' },
    { title: 'Concierge Ordering', description: 'White-glove logistics, start to finish.' },
    { title: 'Showroom Experiences', description: 'Design is felt, not just seen.' },
    { title: 'Custom Solutions', description: 'Tailored designs that reflect your unique vision.' },
    { title: 'Expert Consultations', description: 'Guidance from industry-leading specialists.' },
    { title: 'Project Management', description: 'Seamless coordination from concept to completion.' }
  ]

  return (
    <section id="services" className="services-section">
      <div className="container">
        <p className="section-subtitle">Authority Through Simplicity</p>
        <h2 className="section-title">Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="service-card fade-in"
            >
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

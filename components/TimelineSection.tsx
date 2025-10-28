'use client'

import { useEffect, useRef } from 'react'

export default function TimelineSection() {
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('fade-in-visible')
            }, index * 150)
          }
        })
      },
      { threshold: 0.2 }
    )

    stepsRef.current.forEach((step) => {
      if (step) observer.observe(step)
    })

    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      number: '01',
      title: 'Inspiration Ignited',
      description: 'Book or explore Signature Select.'
    },
    {
      number: '02',
      title: 'Design Aligned',
      description: 'Curate, specify, tailor.'
    },
    {
      number: '03',
      title: 'Precision Secured',
      description: 'Orders placed, logistics synchronized.'
    },
    {
      number: '04',
      title: 'White-Glove Delivery',
      description: 'What others complicate, we simplify.'
    },
    {
      number: '05',
      title: 'Legacy Installed',
      description: "The finish becomes part of the home's story."
    }
  ]

  return (
    <section id="timeline" className="timeline-section">
      <div className="container">
        <p className="section-subtitle">Making Complexity Feel Effortless</p>
        <h2 className="section-title">Timeline</h2>
        <div className="timeline-steps">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => { stepsRef.current[index] = el; }}
              className="timeline-step fade-in"
            >
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'

export default function DifferentiationSection() {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible')
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item)
    })

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Animated counter
  const AnimatedCounter = ({ target, label, suffix = '' }: { target: number, label: string, suffix?: string }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (!isVisible) return
      
      const duration = 2000
      const steps = 60
      const increment = target / steps
      const stepDuration = duration / steps

      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, stepDuration)

      return () => clearInterval(timer)
    }, [isVisible, target])

    return (
      <div className="stat-card">
        <div className="stat-number">{count}{suffix}</div>
        <div className="stat-label">{label}</div>
      </div>
    )
  }

  const features = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5"></path>
          <path d="M2 12l10 5 10-5"></path>
        </svg>
      ),
      text: '60+ years of collective design + construction experience.'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      ),
      text: 'Exclusive vendor partnerships.'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <rect x="7" y="7" width="3" height="3"></rect>
          <rect x="14" y="7" width="3" height="3"></rect>
          <rect x="14" y="14" width="3" height="3"></rect>
          <rect x="7" y="14" width="3" height="3"></rect>
        </svg>
      ),
      text: 'Integrated AI-powered customer experience.'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
      text: 'Miracle Mile location.'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
      text: 'Zero-compromise approach to detail.'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      text: 'White-glove service & hospitality.'
    }
  ]

  return (
    <section id="differentiation" ref={sectionRef} className="differentiation-section">
      <div className="container">
        <p className="section-subtitle">Built for Excellence</p>
        <h2 className="section-title">Why Iron & Water Co.?</h2>
        <div className="differentiation-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="diff-item fade-in"
            >
              <div className="diff-icon">{feature.icon}</div>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
        <p className="differentiation-close">
          "Because when you work with us, you don't just choose fixtures. You shape legacy."
        </p>
        <div className="stats-grid">
          <AnimatedCounter target={60} label="Years of Combined Experience" suffix="+" />
          <AnimatedCounter target={10000} label="Successful Projects" suffix="+" />
          <AnimatedCounter target={500} label="Satisfied Clients" suffix="+" />
          <AnimatedCounter target={7} label="Showroom Open Days" suffix="/7" />
        </div>
      </div>
    </section>
  )
}

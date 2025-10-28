'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function TeamSection() {
  const membersRef = useRef<(HTMLDivElement | null)[]>([])

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

    membersRef.current.forEach((member) => {
      if (member) observer.observe(member)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="team" className="team-section">
      <div className="container">
        <p className="section-subtitle">Authority with a Human Face</p>
        <h2 className="section-title">Our A-Star Team</h2>
        <div className="team-grid">
          <div
            ref={(el) => (membersRef.current[0] = el)}
            className="team-member fade-in"
          >
            <div className="team-photo">R</div>
            <h3>Richard Segal</h3>
            <p className="team-role">General Manager</p>
          </div>
          
          <div
            ref={(el) => (membersRef.current[1] = el)}
            className="team-member fade-in"
          >
            <div className="team-photo">R</div>
            <h3>Raynny Soto</h3>
            <p className="team-role">Principal</p>
          </div>
          
          <div
            ref={(el) => (membersRef.current[2] = el)}
            className="team-member fade-in"
          >
            <div className="team-photo">E</div>
            <h3>Ebony Howard</h3>
            <p className="team-role">Customer Concierge</p>
          </div>
          
          <div
            ref={(el) => (membersRef.current[3] = el)}
            className="team-member fade-in"
          >
            <div className="team-photo">C</div>
            <h3>Carissa Fishman</h3>
            <p className="team-role">Operations</p>
          </div>
          
          <div
            ref={(el) => (membersRef.current[4] = el)}
            className="team-member fade-in"
          >
            <div className="team-photo team-photo-image">
              <Image src="/alex-shick.jpg" alt="Alex Shick" width={80} height={80} />
            </div>
            <h3>Alex Shick</h3>
            <p className="team-role">IT & Systems</p>
          </div>
        </div>
      </div>
    </section>
  )
}

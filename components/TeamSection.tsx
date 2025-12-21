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
    <section id="team" className="team-section" aria-labelledby="team-heading">
      <div className="container">
        <p className="section-subtitle">Authority with a Human Face</p>
        <h2 id="team-heading" className="section-title">Our A-Star Team</h2>
        <div className="team-grid" role="list">
          <article
            ref={(el) => { membersRef.current[0] = el; }}
            className="team-member fade-in"
            role="listitem"
            itemScope
            itemType="https://schema.org/Person"
          >
            <div className="team-card">
              <div className="team-photo-wrapper">
                <div className="team-photo team-photo-image">
                  <Image 
                    src="/Richard-Segal.jpeg" 
                    alt="Richard Segal - General Manager at Iron & Water Co. Architectural Hardware Showroom" 
                    width={100} 
                    height={100} 
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="team-info">
                <h3 itemProp="name">Richard Segal</h3>
                <p className="team-role" itemProp="jobTitle">General Manager</p>
              </div>
            </div>
          </article>
          
          <article
            ref={(el) => { membersRef.current[1] = el; }}
            className="team-member fade-in"
            role="listitem"
            itemScope
            itemType="https://schema.org/Person"
          >
            <div className="team-card">
              <div className="team-photo-wrapper">
                <div className="team-photo team-photo-image">
                  <Image 
                    src="/Raynny-Soto.jpeg" 
                    alt="Raynny Soto Rodriguez - Principal at Iron & Water Co. Architectural Hardware & Plumbing" 
                    width={100} 
                    height={100} 
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="team-info">
                <h3 itemProp="name">Raynny Soto Rodriguez</h3>
                <p className="team-role" itemProp="jobTitle">Principal</p>
              </div>
            </div>
          </article>
          
          <article
            ref={(el) => { membersRef.current[2] = el; }}
            className="team-member fade-in"
            role="listitem"
            itemScope
            itemType="https://schema.org/Person"
          >
            <div className="team-card">
              <div className="team-photo-wrapper">
                <div className="team-photo" aria-label="Ebony Howard">E</div>
              </div>
              <div className="team-info">
                <h3 itemProp="name">Ebony Howard</h3>
                <p className="team-role" itemProp="jobTitle">Customer Concierge</p>
              </div>
            </div>
          </article>
          
          <article
            ref={(el) => { membersRef.current[3] = el; }}
            className="team-member fade-in"
            role="listitem"
            itemScope
            itemType="https://schema.org/Person"
          >
            <div className="team-card">
              <div className="team-photo-wrapper">
                <div className="team-photo" aria-label="Carissa Ahearn">C</div>
              </div>
              <div className="team-info">
                <h3 itemProp="name">Carissa Ahearn</h3>
                <p className="team-role" itemProp="jobTitle">Operations</p>
              </div>
            </div>
          </article>
          
          <article
            ref={(el) => { membersRef.current[4] = el; }}
            className="team-member fade-in"
            role="listitem"
            itemScope
            itemType="https://schema.org/Person"
          >
            <div className="team-card">
              <div className="team-photo-wrapper">
                <div className="team-photo team-photo-image">
                  <Image 
                    src="/alex-shick.JPG" 
                    alt="Alex Shick - IT & Systems Specialist at Iron & Water Co. Architectural Hardware Showroom" 
                    width={100} 
                    height={100} 
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="team-info">
                <h3 itemProp="name">Alex Shick</h3>
                <p className="team-role" itemProp="jobTitle">IT & Systems</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

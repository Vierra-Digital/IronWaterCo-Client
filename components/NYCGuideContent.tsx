'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function NYCGuideContent() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [currentUrl, setCurrentUrl] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
    
    // Parallax scrolling effect (disabled on mobile for performance)
    if (window.innerWidth > 768) {
      const handleScroll = () => {
        if (headerRef.current && bodyRef.current) {
          const scrolled = window.pageYOffset
          const rate = scrolled * 0.2
          headerRef.current.style.transform = `translateY(${rate}px)`
          bodyRef.current.style.transform = `translateY(${-rate * 0.1}px)`
        }
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll('.guide-section')
      elements.forEach((el) => observer.observe(el))

      return () => observer.disconnect()
    }
  }, [])

  return (
    <article className={`guide-page ${isVisible ? 'guide-page-visible' : ''}`} ref={contentRef}>
      <div className="guide-header" ref={headerRef}>
        <div className="container">
          <h1 className="guide-title fade-in">
            Wall-Hung Toilets in NYC Co-Op & Condo Buildings: Local Approval Notes & Planning Considerations
          </h1>
          <div className="guide-meta-info">
            <span className="guide-date">December 27th, 2025</span>
            <span className="guide-meta-separator">•</span>
            <span className="guide-read-time">6 min read</span>
          </div>
          <p className="guide-subtitle fade-in">
            Local Approval Notes & Planning Considerations
          </p>
        </div>
      </div>

      <div className="guide-body" ref={bodyRef}>
        <div className="container">
          <div className="guide-content">
            <section className="guide-section fade-in">
              <h2>How This Relates To The Core Guide</h2>
              <p>
                This page supplements our primary guide on{' '}
                <Link href="/guides/wall-hung-toilets-in-wall-carriers-coop-approval" className="guide-inline-link">
                  wall-hung toilets and in-wall carriers
                </Link>.
                If you're new to these systems, start there first.
              </p>
            </section>

            <section className="guide-section fade-in">
              <h2>Common NYC Building Conditions</h2>
              <p>Understanding the physical realities of NYC buildings is crucial for successful wall-hung toilet installations:</p>
              
              <div className="guide-subsection">
                <h3>Masonry + Furred Walls</h3>
                <p>Many NYC buildings feature masonry construction with furred (framed) walls added for modern plumbing. This creates depth constraints and requires careful carrier system selection.</p>
              </div>

              <div className="guide-subsection">
                <h3>Pre-War vs Post-War Plumbing Chases</h3>
                <p>Pre-war buildings often have different chase configurations than post-war construction. Understanding your building's plumbing infrastructure is essential for proper rough-in planning.</p>
              </div>

              <div className="guide-subsection">
                <h3>Limited Depth in Wet Walls</h3>
                <p>NYC bathrooms frequently have tight wet wall dimensions. Carrier systems must be matched to available depth, not just aesthetic preferences.</p>
              </div>

              <div className="guide-subsection">
                <h3>Noise Sensitivity Between Stacked Apartments</h3>
                <p>Vertical sound transmission is a primary concern in multi-unit buildings. Wall assembly and isolation details become specification-critical, not optional.</p>
              </div>
            </section>

            <section className="guide-section fade-in">
              <h2>What NYC Co-Op Boards Typically Ask</h2>
              <p>NYC co-op boards have specific concerns that differ from other markets. Be prepared to address:</p>
              
              <div className="guide-subsection">
                <h3>Service Access Confirmation</h3>
                <p>Boards want explicit documentation that routine service can occur without opening finished walls. Specify the flush actuator opening access method clearly.</p>
              </div>

              <div className="guide-subsection">
                <h3>Leak Containment Language</h3>
                <p>NYC boards are particularly sensitive to water damage liability. Include language about shutoff locations, access plans, and containment strategies.</p>
              </div>

              <div className="guide-subsection">
                <h3>Licensed Plumber + Pressure Testing</h3>
                <p>NYC requires licensed plumbers for all work. Boards want confirmation that pressure testing will occur before wall closure, with documentation.</p>
              </div>

              <div className="guide-subsection">
                <h3>DOB Sign-Off Expectations</h3>
                <p>Department of Buildings sign-off is required for plumbing alterations. Boards want assurance that all permits and inspections will be completed properly.</p>
              </div>

              <div className="guide-subsection">
                <h3>Managing Agent Review Cycles</h3>
                <p>Many NYC buildings route approvals through managing agents who may have their own review timelines. Factor in additional processing time.</p>
              </div>
            </section>

            <section className="guide-section fade-in">
              <h2>Language That Helps Approval</h2>
              <p>Use board-fluent phrasing that demonstrates understanding of their concerns:</p>
              
              <div className="guide-subsection">
                <h3>Structural Assurance</h3>
                <blockquote className="guide-quote">
                  "No structural members altered. The carrier system attaches to existing framing per manufacturer specifications."
                </blockquote>
              </div>

              <div className="guide-subsection">
                <h3>Serviceability Statement</h3>
                <blockquote className="guide-quote">
                  "System serviceable through flush actuator opening. No specialty demolition required for standard valve maintenance."
                </blockquote>
              </div>

              <div className="guide-subsection">
                <h3>Code Compliance</h3>
                <blockquote className="guide-quote">
                  "Installed per manufacturer instructions and NYC Plumbing Code. All work performed by licensed plumber with appropriate permits."
                </blockquote>
              </div>

              <div className="guide-subsection">
                <h3>Warranty & Responsibility</h3>
                <blockquote className="guide-quote">
                  "Owner assumes responsibility for system maintenance. Manufacturer warranty covers carrier components. Licensed plumber provides installation warranty per standard industry practice."
                </blockquote>
              </div>
            </section>

            <section className="guide-section fade-in">
              <h2>When to Flag Early</h2>
              <p>Certain building conditions require advance planning and may need special consideration:</p>
              
              <div className="guide-subsection">
                <h3>Landmark Buildings</h3>
                <p>Landmark designation adds LPC (Landmarks Preservation Commission) review to the approval process. Factor in additional time and documentation requirements.</p>
              </div>

              <div className="guide-subsection">
                <h3>Thick Masonry Walls</h3>
                <p>Buildings with substantial masonry construction may require structural engineering review if any modifications are proposed. Flag this early in planning.</p>
              </div>

              <div className="guide-subsection">
                <h3>Buildings With Historic Plumbing Stacks</h3>
                <p>Older buildings may have cast iron or other historic plumbing that requires special connection considerations. Coordinate with plumber and building management early.</p>
              </div>

              <div className="guide-subsection">
                <h3>Sound Transmission Sensitivity</h3>
                <p>If the building has a history of noise complaints or thin floor/ceiling assemblies, emphasize sound isolation details in your submission from the start.</p>
              </div>
            </section>

            <section className="guide-section fade-in guide-cta-section">
              <h2>Need Help With Your NYC Project?</h2>
              <p>
                If you're working in a NYC co-op or condo and want to sanity-check a wall-hung toilet plan before submission, we're happy to review the documentation.
              </p>
              <div className="guide-cta-buttons">
                <a 
                  href="mailto:customerexperience@ironandwaterco.com?subject=NYC Wall-Hung Toilet Plan Review" 
                  className="guide-cta-button"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  Request Documentation Review
                </a>
                <Link 
                  href="/guides/wall-hung-toilets-in-wall-carriers-coop-approval" 
                  className="guide-cta-button-secondary"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                  </svg>
                  Read Full Guide
                </Link>
              </div>
            </section>

            <section className="guide-section fade-in guide-share-section">
              <h2>Share This Guide</h2>
              <p>Found this guide helpful? Share it with your team or colleagues.</p>
              <div className="guide-share-buttons">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="guide-share-button linkedin"
                  aria-label="Share on LinkedIn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                  </svg>
                  LinkedIn
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent('Wall-Hung Toilets in NYC Co-Op & Condo Buildings: Local Approval Notes & Planning Considerations')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="guide-share-button twitter"
                  aria-label="Share on X (Twitter)"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                  X (Twitter)
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="guide-share-button facebook"
                  aria-label="Share on Facebook"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                  </svg>
                  Facebook
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent('Wall-Hung Toilets in NYC Guide')}&body=${encodeURIComponent(`Check out this guide: ${currentUrl}`)}`}
                  className="guide-share-button email"
                  aria-label="Share via Email"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  Email
                </a>
                <button
                  onClick={() => {
                    if (currentUrl) {
                      navigator.clipboard.writeText(currentUrl)
                      alert('Link copied to clipboard!')
                    }
                  }}
                  className="guide-share-button copy-link"
                  aria-label="Copy link"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                  Copy Link
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
  )
}


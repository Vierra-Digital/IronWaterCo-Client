'use client'

import { useEffect, useRef, useState } from 'react'

export default function KosherGuideContent() {
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
      const elements = contentRef.current.querySelectorAll('.guide-section, .guide-checklist-item')
      elements.forEach((el) => observer.observe(el))

      return () => observer.disconnect()
    }
  }, [])

  return (
    <article className={`guide-page ${isVisible ? 'guide-page-visible' : ''}`} ref={contentRef}>
      <div className="guide-header" ref={headerRef}>
        <div className="container">
          <h1 className="guide-title fade-in">
            Kosher Material Reference: Blanco Silgranit Kitchen Sinks
          </h1>
          <div className="guide-meta-info">
            <span className="guide-date">January 18th, 2026</span>
            <span className="guide-meta-separator">•</span>
            <span className="guide-read-time">5 min read</span>
          </div>
          <p className="guide-intro fade-in">
            This page is provided as a supporting reference for clients who maintain kosher kitchens and wish to review material considerations related to kitchen sinks.
          </p>
        </div>
      </div>

      <div className="guide-body" ref={bodyRef}>
        <div className="container">
          <div className="guide-content">
            <section className="guide-section fade-in">
              <h2>Purpose of This Reference</h2>
              <p>This page is provided as a supporting reference for clients who maintain kosher kitchens and wish to review material considerations related to kitchen sinks.</p>
              <p>The enclosed document was issued by Rabbi Yisrael Rozen of the Zomet Institute and pertains specifically to kitchen sinks manufactured by BLANCO from Silgranit material.</p>
              <p className="guide-note">
                <strong>Important:</strong> Iron & Water Co. does not interpret or apply religious law. We provide this material so clients may review it with their rabbinical authority as part of their own decision-making process.
              </p>
            </section>

            <section className="guide-section fade-in">
              <h2>Scope and Context</h2>
              <p>This reference applies only to Blanco kitchen sinks manufactured from Silgranit.</p>
              <p>The document addresses material status and standard kashering guidance following non-kosher use or when transitioning between kitchen designations.</p>
              <ul className="guide-list">
                <li>Practices and requirements may vary based on individual rabbinical guidance.</li>
                <li>Clients are encouraged to consult their rabbi or mashgiach to confirm applicability to their specific kitchen and use case.</li>
              </ul>
            </section>

            <section className="guide-section fade-in">
              <h2>Source Document</h2>
              <p>The following letter was issued by Rabbi Yisrael Rozen, Dean of the Zomet Institute, and is provided unaltered and in full for reference purposes.</p>
              
              <div className="guide-subsection">
                <h3>Kosher Certificate</h3>
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-start' }}>
                  <a
                    href="/kosher-material-reference-blanco-silgranit-kitchen-sinks.pdf"
                    download="kosher-material-reference-blanco-silgranit-kitchen-sinks.pdf"
                    className="guide-pdf-download-button"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download PDF
                  </a>
                </div>
                <div className="guide-pdf-embed">
                  <iframe
                    src="/kosher-material-reference-blanco-silgranit-kitchen-sinks.pdf"
                    title="Kosher Certificate - Zomet Institute"
                  />
                </div>
                <p className="guide-note" style={{ marginTop: '1rem' }}>
                  <strong>Note:</strong> This document is provided as a reference. If you have trouble viewing the PDF, please use the download button above.
                </p>
              </div>
            </section>

            <section className="guide-section fade-in">
              <h2>Questions or Further Review</h2>
              <p>If you would like assistance locating product specifications, material details, or manufacturer documentation to support a conversation with your rabbinical authority, our team is happy to help.</p>
              <p className="guide-note">
                <strong>Important:</strong> Iron & Water Co. provides access to information. Final determination rests with the client and their chosen religious authority.
              </p>
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
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent('Kosher Material Reference: Blanco Silgranit Kitchen Sinks')}`}
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
                  href={`mailto:?subject=${encodeURIComponent('Kosher Material Reference: Blanco Silgranit Kitchen Sinks')}&body=${encodeURIComponent(`Check out this guide: ${currentUrl}`)}`}
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

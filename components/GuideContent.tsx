'use client'

import { useEffect, useRef, useState } from 'react'

export default function GuideContent() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [currentUrl, setCurrentUrl] = useState('')

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
    <article className="guide-page" ref={contentRef}>
      <div className="guide-header">
        <div className="container">
          <h1 className="guide-title fade-in">
            Wall-Hung Toilets + In-Wall Carriers: Co-op Approval, Specs, and Pitfalls
          </h1>
          <div className="guide-meta-info">
            <span className="guide-date">December 27th, 2025</span>
            <span className="guide-meta-separator">•</span>
            <span className="guide-read-time">8 min read</span>
          </div>
          <p className="guide-intro fade-in">
            Wall-hung toilets can look effortless—floating bowl, clean floor line, quieter modern flushing—but behind the wall is a structural carrier frame + concealed tank system that must be specified correctly before walls close.
          </p>
        </div>
      </div>

      <div className="guide-body">
        <div className="container">
          <div className="guide-content">
            <section className="guide-section fade-in">
              <h2>This Guide Explains:</h2>
              <ul className="guide-list">
                <li>What a wall-hung toilet system really is (bowl + carrier + flush actuation).</li>
                <li>What typically triggers co-op / condo board questions.</li>
                <li>The specification details that prevent service, noise, and performance problems later.</li>
                <li>A simple approval checklist you can hand to your architect, plumber, or managing agent.</li>
              </ul>
              <p className="guide-note">
                <strong>Important distinction:</strong> Many brands make beautiful bowls, but carriers/concealed tanks are a separate category. Well-known concealed carrier platforms include manufacturers such as Geberit, TOTO, Duravit, and OLI.
              </p>
            </section>

            <section className="guide-section fade-in">
              <h2>What Is a Wall-Hung Toilet "System"?</h2>
              <p>A complete wall-hung toilet installation typically includes:</p>
              <ul className="guide-list">
                <li><strong>The bowl</strong> (the visible "floating" toilet).</li>
                <li><strong>The in-wall carrier frame + concealed tank</strong> (the hidden structural and flushing core).</li>
                <li><strong>The flush actuator plate / panel</strong> (the visible control).</li>
              </ul>
              <p>The carrier is doing two jobs simultaneously:</p>
              <ul className="guide-list">
                <li>Structural support for the wall-hung bowl.</li>
                <li>Concealed flushing tank and valve system (dual-flush is common).</li>
              </ul>
            </section>

            <section className="guide-section fade-in">
              <h2>Why Co-Ops and Condos Scrutinize Wall-Hung Toilets</h2>
              <p>Boards and managing agents care less about "floating aesthetics" and more about:</p>
              
              <div className="guide-subsection">
                <h3>1) Risk Containment</h3>
                <p>Anything in a wall raises a familiar question: "If it leaks, how do we access it?"</p>
                <p>Carrier systems are designed so key service items are reachable through the flush plate opening (depending on model), but boards want documentation.</p>
              </div>

              <div className="guide-subsection">
                <h3>2) Noise + Neighbor Impact</h3>
                <p>Wall assemblies can transmit sound. A good spec anticipates:</p>
                <ul className="guide-list">
                  <li>Proper framing.</li>
                  <li>Isolation details.</li>
                  <li>Correct waste/vent layout.</li>
                  <li>Manufacturer installation rules.</li>
                </ul>
              </div>

              <div className="guide-subsection">
                <h3>3) Structural Confidence</h3>
                <p>A wall-hung bowl must be supported by the carrier/frame system and correct rough framing approach. Some manufacturers publish explicit system constraints (framing depth, spacing, etc.).</p>
              </div>

              <div className="guide-subsection">
                <h3>4) Long-Term Serviceability</h3>
                <p>Co-ops think in decades: "Will this be serviceable without opening a finished wall?"</p>
              </div>
            </section>

            <section className="guide-section fade-in">
              <h2>The Biggest Specification Mistakes (And How to Avoid Them)</h2>
              
              <div className="guide-subsection">
                <h3>Mistake A: Choosing the Bowl First and Assuming Any Carrier Works</h3>
                <p>Different bowls and carriers can have compatibility constraints (mounting geometry, outlet alignment, actuator interface, rough depth). Start with system compatibility early.</p>
              </div>

              <div className="guide-subsection">
                <h3>Mistake B: Not Matching the Carrier to the Wall Condition</h3>
                <p>Common wall conditions include:</p>
                <ul className="guide-list">
                  <li>2x4 "in-wall" builds (tight).</li>
                  <li>2x6 builds (easier service space).</li>
                  <li>Pre-wall / chase conditions (common in renovations).</li>
                </ul>
                <p>Carrier lines are often offered in multiple configurations for these conditions.</p>
              </div>

              <div className="guide-subsection">
                <h3>Mistake C: Ignoring "Service Access" in the Approval Narrative</h3>
                <p>Approvals go smoother when you explicitly state:</p>
                <ul className="guide-list">
                  <li>Service occurs through actuator opening (where applicable).</li>
                  <li>Shutoff location and access plan.</li>
                  <li>Who holds warranty/service responsibility (owner vs plumber vs building).</li>
                </ul>
              </div>

              <div className="guide-subsection">
                <h3>Mistake D: Flushing Performance Assumptions</h3>
                <p>Modern concealed tanks often support dual-flush configurations and specified flush volumes; your submittal should state the exact flush rates being proposed.</p>
              </div>
            </section>

            <section className="guide-section fade-in">
              <h2>Co-Op / Condo Approval Package</h2>
              <p>If you want approvals to feel routine, submit a clean, board-friendly packet. Typical components:</p>
              
              <div className="guide-subsection">
                <h3>1) Product Spec Sheets (PDF)</h3>
                <p>Include:</p>
                <ul className="guide-list">
                  <li>Bowl spec sheet.</li>
                  <li>Carrier/concealed tank spec sheet.</li>
                  <li>Actuator plate spec sheet.</li>
                  <li>Any listed load rating / framing requirements if shown.</li>
                </ul>
                <p className="guide-note">(Example: Manufacturers provide detailed carrier spec sheets that describe framing minimums and system requirements.)</p>
              </div>

              <div className="guide-subsection">
                <h3>2) Plumbing Plan Excerpt</h3>
                <p>A single page that shows:</p>
                <ul className="guide-list">
                  <li>Fixture location.</li>
                  <li>Waste/vent routing.</li>
                  <li>Shutoff strategy.</li>
                </ul>
              </div>

              <div className="guide-subsection">
                <h3>3) Wall Assembly Note</h3>
                <p>A brief note stating:</p>
                <ul className="guide-list">
                  <li>Wall thickness/condition (2x4, 2x6, chase).</li>
                  <li>Whether any structural modifications occur.</li>
                  <li>Sound isolation approach (if applicable).</li>
                </ul>
              </div>

              <div className="guide-subsection">
                <h3>4) Serviceability Statement (One Paragraph)</h3>
                <p>Example language you can reuse:</p>
                <blockquote className="guide-quote">
                  "The concealed tank and carrier system is designed for routine service through the flush actuator opening. No specialty demolition is required for standard valve maintenance. The plumber will pressure test supply connections prior to closing the wall, and the installation will follow the manufacturer's published requirements."
                </blockquote>
              </div>

              <div className="guide-subsection">
                <h3>5) Installer Acknowledgment</h3>
                <p>Boards love one line from the licensed plumber:</p>
                <blockquote className="guide-quote">
                  "Installed per manufacturer instructions and local code."
                </blockquote>
              </div>
            </section>

            <section className="guide-section fade-in">
              <h2>Builder/Architect Specification Checklist</h2>
              <p>Use this as the "did we miss anything?" section.</p>
              <div className="guide-checklist">
                <div className="guide-checklist-item fade-in">
                  <input type="checkbox" id="check-1" />
                  <label htmlFor="check-1">Confirm wall condition (2x4 vs 2x6 vs chase / pre-wall).</label>
                </div>
                <div className="guide-checklist-item fade-in">
                  <input type="checkbox" id="check-2" />
                  <label htmlFor="check-2">Confirm bowl-to-carrier compatibility (model pairing).</label>
                </div>
                <div className="guide-checklist-item fade-in">
                  <input type="checkbox" id="check-3" />
                  <label htmlFor="check-3">Confirm flush actuation series compatibility.</label>
                </div>
                <div className="guide-checklist-item fade-in">
                  <input type="checkbox" id="check-4" />
                  <label htmlFor="check-4">Confirm shutoff location + access.</label>
                </div>
                <div className="guide-checklist-item fade-in">
                  <input type="checkbox" id="check-5" />
                  <label htmlFor="check-5">Confirm rough-in height for comfort/ADA intent (where relevant).</label>
                </div>
                <div className="guide-checklist-item fade-in">
                  <input type="checkbox" id="check-6" />
                  <label htmlFor="check-6">Confirm sound isolation approach (especially in co-ops/condos).</label>
                </div>
                <div className="guide-checklist-item fade-in">
                  <input type="checkbox" id="check-7" />
                  <label htmlFor="check-7">Confirm pressure test plan before wall close.</label>
                </div>
                <div className="guide-checklist-item fade-in">
                  <input type="checkbox" id="check-8" />
                  <label htmlFor="check-8">Confirm finish wall thickness constraints and carrier placement allowances (varies by system).</label>
                </div>
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
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent('Wall-Hung Toilets + In-Wall Carriers: Co-op Approval, Specs, and Pitfalls')}`}
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
                  href={`mailto:?subject=${encodeURIComponent('Wall-Hung Toilets + In-Wall Carriers Guide')}&body=${encodeURIComponent(`Check out this guide: ${currentUrl}`)}`}
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


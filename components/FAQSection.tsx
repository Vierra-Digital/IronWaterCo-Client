'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const faqs = [
  {
    question: 'Are wall-hung toilets safe and strong?',
    answer: 'Yes—when the correct carrier system is used and installed per the manufacturer\'s requirements. Many systems are engineered as structural frames intended to support the fixture load; the key is correct framing + correct installation.'
  },
  {
    question: 'Do you have to open the wall to service the tank?',
    answer: 'Routine service is commonly designed to occur through the flush actuator opening, depending on system. For board approvals, document the service plan clearly and include spec sheets.'
  },
  {
    question: 'Are wall-hung toilets louder?',
    answer: 'They can be quiet or loud depending on wall build, isolation details, and installation quality. In multi-family buildings, sound strategy should be treated as a specification item, not a hope.'
  },
  {
    question: 'What do co-op boards usually require?',
    answer: 'Typically: spec sheets, a plumbing plan excerpt, a wall/structural note, and a short serviceability statement. The cleaner the packet, the fewer questions.'
  },
  {
    question: 'Which brands make the in-wall carrier systems?',
    answer: 'Common concealed carrier platforms include manufacturers such as Geberit, TOTO, Duravit, and OLI. (Many other brands exist; these are simply widely recognized system families.)',
    relatedBrands: ['Geberit USA', 'TOTO USA', 'Duravit', 'OLI']
  }
]

const relatedGuides = [
  {
    title: 'Wall-Hung Toilets + In-Wall Carriers: Co-op Approval, Specs, and Pitfalls',
    href: '/guides/wall-hung-toilets-in-wall-carriers-coop-approval',
    description: 'A practical guide to wall-hung toilets and in-wall carrier systems—what to specify, common mistakes, and the exact documents co-ops/condos typically require for approval.'
  },
  {
    title: 'Wall-Hung Toilets in NYC Co-Op & Condo Buildings: Local Approval Notes & Planning Considerations',
    href: '/guides/wall-hung-toilets-nyc-coop-condo',
    description: 'NYC-specific guidance for wall-hung toilet installations. Learn what boards typically ask, approval language, and local building considerations.'
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const faqRefs = useRef<(HTMLDivElement | null)[]>([])
  const guideRefs = useRef<(HTMLElement | null)[]>([])

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

    faqRefs.current.forEach((faq) => {
      if (faq) observer.observe(faq)
    })

    guideRefs.current.forEach((guide) => {
      if (guide) observer.observe(guide)
    })

    return () => observer.disconnect()
  }, [])

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-heading">
      <div className="container">
        <p className="section-subtitle">Expert Guidance</p>
        <h1 id="faq-heading" className="section-title">Frequently Asked Questions</h1>
        <p className="faq-intro">
          Common questions about wall-hung toilets, carrier systems, and installation requirements. 
          Get the answers you need for your next project.
        </p>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => { faqRefs.current[index] = el; }}
              className={`faq-item fade-in ${openIndex === index ? 'open' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{faq.question}</span>
                <svg
                  className="faq-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div
                id={`faq-answer-${index}`}
                className="faq-answer"
                aria-hidden={openIndex !== index ? 'true' : 'false'}
              >
                <p>{faq.answer}</p>
                {faq.relatedBrands && (
                  <div className="faq-brands">
                    {faq.relatedBrands.map((brand, brandIndex) => (
                      <span key={brandIndex} className="faq-brand-tag">{brand}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {relatedGuides.length > 0 && (
          <div className="related-guides-section">
            <h2 className="related-guides-title">Related Guides</h2>
            <div className="related-guides-grid">
              {relatedGuides.map((guide, index) => (
                <Link
                  key={index}
                  href={guide.href}
                  ref={(el) => { guideRefs.current[index] = el; }}
                  className="guide-card fade-in"
                >
                  <h3 className="related-guide-title">{guide.title}</h3>
                  <p className="guide-description">{guide.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}


'use client'

import { useEffect, useRef, useState } from 'react'

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

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const faqRefs = useRef<(HTMLDivElement | null)[]>([])

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

        <div className="faq-contact-cta">
          <a 
            href="mailto:customerexperience@ironandwaterco.com?subject=FAQ Question" 
            className="faq-contact-button"
            aria-label="Contact us if you have any questions"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Contact Us If You Have Any Questions
          </a>
        </div>
      </div>
    </section>
  )
}


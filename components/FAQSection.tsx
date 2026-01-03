'use client'

import { useEffect, useRef, useState } from 'react'

interface FAQ {
  question: string
  answer: string
  bullets?: string[]
  answerAfter?: string
  relatedBrands?: string[]
}

const faqs: FAQ[] = [
  {
    question: 'Who is Iron & Water Co.?',
    answer: 'We are Iron & Water Co.—Long Island\'s pre-eminent showroom for architectural door and decorative hardware, decorative plumbing, and lighting. We are located on the Miracle Mile in Manhasset, making us easily accessible from anywhere in the Tri-State area.'
  },
  {
    question: 'What makes Iron & Water Co. different from other showrooms?',
    answer: 'We\'re not a speed shop, and we\'re not appointment-only. We\'re built for people who value comfort and authority in the same room. In practice, that means:',
    bullets: [
      'We know our product—and how it performs in real-world conditions.',
      'We are patient, not pushy. If you\'re not ready to decide, that\'s respected.',
      'Our selection is highly curated. We don\'t try to be everything to everyone.'
    ]
  },
  {
    question: 'Do I need an appointment to receive assistance?',
    answer: 'No. We are structured so clients can walk in and be taken care of without needing to schedule in advance. For complex or multi-phase projects, we are always happy to plan dedicated time—but it\'s never a requirement to be helped.'
  },
  {
    question: 'Are you a trade-only showroom?',
    answer: 'We work primarily with members of the trade—designers, architects, and contractors—but we intentionally remain accessible to homeowners. We are open seven days a week to provide flexibility for homeowners while continuing to support the trade with a showroom that respects real project timelines.'
  },
  {
    question: 'What\'s your philosophy when helping homeowners make selections?',
    answer: 'We bring product authority and a steady hand—but we never override your vision. Our role is to bring clarity to the process so decisions feel confident, informed, and grounded in reality. We guide the process by:',
    bullets: [
      'Asking the right questions (consistently, not aggressively).',
      'Educating without overwhelming.',
      'And helping you land decisions you\'ll still feel proud of a year from now.'
    ]
  },
  {
    question: 'What does "highly curated" mean?',
    answer: 'Curated means we are intentional about what we present—and just as intentional about what we don\'t. Our selections are based on:',
    bullets: [
      'Long-term quality and performance.',
      'Aesthetic integrity across finishes and collections.',
      'And value at each price point.'
    ],
    answerAfter: 'We also feature products that are not commonly seen in our market, allowing us to present design-forward options without chasing trends or volume.'
  },
  {
    question: 'Do you carry commodity brands?',
    answer: 'No. We are not a commodity showroom. If the priority is the lowest possible price or the fastest possible transaction, we may not be the right fit—and we believe it\'s important to be transparent about that from the start.'
  },
  {
    question: 'How do you work with designers, architects, and contractors?',
    answer: 'We are built to support specification and execution—not just selection. We assist the trade by:',
    bullets: [
      'Confirming compatibility across trims, valves, finishes, and rough-in requirements.',
      'Identifying conflicts early.',
      'And ensuring specifications are clean, accurate, and buildable.'
    ],
    answerAfter: 'This approach reduces rework, delays, and unnecessary stress downstream.'
  },
  {
    question: 'How much experience does Iron & Water Co. have?',
    answer: 'We bring over 70 years of combined experience assisting homeowners and the trade—guiding selections, protecting specifications, and solving challenges before they become problems.'
  },
  {
    question: 'What happens if something goes wrong after delivery?',
    answer: 'We do everything we can to prevent issues before they occur. But construction—like life—doesn\'t always move in straight lines. When challenges arise:',
    bullets: [
      'We do not place blame.',
      'We focus on identifying the issue.',
      'And we work toward the most fair and practical solution for all parties involved.'
    ],
    answerAfter: 'Solving the problem is the priority.'
  },
  {
    question: 'What does "Unreasonable Hospitality" mean at Iron & Water Co.?',
    answer: 'It means we treat people like guests, not transactions. Hospitality, to us, includes:',
    bullets: [
      'Being attentive without hovering.',
      'Creating a calm, supportive environment.',
      'Following through consistently.',
      'And paying attention to details that affect how a space feels.'
    ],
    answerAfter: 'Yes—the showroom itself smells good, too. The details matter.'
  },
  {
    question: 'How should the showroom experience feel?',
    answer: 'Being in Iron & Water Co. feels comfortable, confident, and considered. Our goal is for clients to feel at ease, informed, and respected—without pressure, posturing, or intimidation.'
  },
  {
    question: 'Where are you located?',
    answer: 'We are located on the Miracle Mile in Manhasset, Long Island, and are easily accessible from Nassau County, Queens, Suffolk County, New York City, Westchester, and New Jersey.'
  },
  {
    question: 'What are your hours?',
    answer: 'We are open seven days a week to support both trade professionals and homeowners with real-world schedules.'
  },
  {
    question: 'What should I bring when I visit?',
    answer: 'If available, bring inspiration images, plans, elevations, finish samples, or notes about what you\'re trying to accomplish. If you don\'t have any of that yet, that\'s perfectly fine. We\'ll begin with questions and build from there.'
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const faqRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
    
    // Parallax scrolling effect (disabled on mobile for performance)
    if (window.innerWidth > 768) {
      const handleScroll = () => {
        if (headerRef.current && listRef.current) {
          const scrolled = window.pageYOffset
          const rate = scrolled * 0.2
          headerRef.current.style.transform = `translateY(${rate}px)`
          listRef.current.style.transform = `translateY(${-rate * 0.1}px)`
        }
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
    <section id="faq" className={`faq-section ${isVisible ? 'faq-section-visible' : ''}`} ref={sectionRef} aria-labelledby="faq-heading">
      <div className="container">
        <div ref={headerRef}>
          <p className="section-subtitle">Expert Guidance</p>
          <h1 id="faq-heading" className="section-title">Frequently Asked Questions</h1>
          <p className="faq-intro">
            Common questions about our showroom, services, and approach. 
            Get the answers you need to understand how we work.
          </p>
        </div>
        
        <div className="faq-list" ref={listRef}>
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
                {faq.bullets && (
                  <ul className="faq-bullets">
                    {faq.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>{bullet}</li>
                    ))}
                  </ul>
                )}
                {faq.answerAfter && <p>{faq.answerAfter}</p>}
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


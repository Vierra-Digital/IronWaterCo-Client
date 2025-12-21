'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css'

export default function ReviewsSection() {
  const reviews = [
    {
      text: "A partner who understood what we couldn't articulate.",
      author: "Tara M.",
      role: "Designer",
      initials: "TM"
    },
    {
      text: "Every detail anticipated, every deadline met.",
      author: "Alan T.",
      role: "Builder",
      initials: "AT"
    },
    {
      text: "Transformative service. They elevated our entire vision.",
      author: "Sarah K.",
      role: "Architect",
      initials: "SK"
    },
    {
      text: "White-glove treatment from start to finish.",
      author: "Michael R.",
      role: "Homeowner",
      initials: "MR"
    },
    {
      text: "Attention to detail that's simply unmatched.",
      author: "Jennifer L.",
      role: "Designer",
      initials: "JL"
    }
  ]

  return (
    <section id="reviews" className="reviews-section" aria-labelledby="reviews-heading">
      <div className="container">
        <p className="section-subtitle">Social Proof as Whisper, Not Shout</p>
        <h2 id="reviews-heading" className="section-title">Testimonials</h2>
        <div className="reviews-slider">
          <Swiper
            modules={[Autoplay]}
            direction="vertical"
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={800}
            className="swiper-reviews"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <article className="review-slide" itemScope itemType="https://schema.org/Review">
                  <div className="review-card">
                    <div className="review-quote-icon" aria-hidden="true">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                      </svg>
                    </div>
                    <p className="review-text" itemProp="reviewBody">{review.text}</p>
                    <div className="review-author-info" itemProp="author" itemScope itemType="https://schema.org/Person">
                      <div className="review-avatar" aria-hidden="true">
                        <div className="review-avatar-initials">{review.initials}</div>
                      </div>
                      <div className="review-author-details">
                        <p className="review-author" itemProp="name">{review.author}</p>
                        <p className="review-role" itemProp="jobTitle">{review.role}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css'

export default function ReviewsSection() {
  const reviews: {
    text: string
    author: string
    role: string
    initials: string
    imageSrc?: string
  }[] = [
    {
      text: 'Richard\'s Dumbo showroom is a true one-stop shop for fixtures, tile, and hardware. He goes to great lengths to make projects successful, from home renovations to large-scale builds.',
      author: 'Susan Vehaskari, MBA, LEED GA',
      role: 'Regional Vice President - Durkan / Mohawk',
      initials: 'SV',
      imageSrc: '/testimonials/susan-vehaskari.png'
    },
    {
      text: 'Richard is one of the most professional, reliable, and trustworthy people I\'ve worked with. His product knowledge helped close deals, and his integrity kept clients confident.',
      author: 'Tamara D.',
      role: 'Regional Account Manager | Certified Paralegal',
      initials: 'TD',
      imageSrc: '/testimonials/tamara-d.png'
    },
    {
      text: 'Richard was amazing to work with. His design and sales experience is impressive, he listens closely, and he consistently guides clients to the right products for their needs.',
      author: 'Gretchen Auer',
      role: 'UX Designer and Writer',
      initials: 'GA',
      imageSrc: '/testimonials/gretchen-auer.png'
    },
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
                <article className="review-slide">
                  <div className="review-card">
                    <div className="review-quote-icon" aria-hidden="true">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                      </svg>
                    </div>
                    <p className="review-text">{review.text}</p>
                    <div className="review-author-info">
                      <div className="review-avatar" aria-hidden="true">
                        {review.imageSrc ? (
                          <Image
                            src={review.imageSrc}
                            alt={`${review.author} headshot`}
                            width={48}
                            height={48}
                            className="review-avatar-image"
                          />
                        ) : (
                          <div className="review-avatar-initials">{review.initials}</div>
                        )}
                      </div>
                      <div className="review-author-details">
                        <p className="review-author">{review.author}</p>
                        <p className="review-role">{review.role}</p>
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

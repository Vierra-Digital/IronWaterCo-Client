'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

import 'swiper/css'

export default function ReviewsSection() {
  const reviews = [
    {
      text: "A partner who understood what we couldn't articulate.",
      author: "Tara M., Designer"
    },
    {
      text: "Every detail anticipated, every deadline met.",
      author: "Alan T., Builder"
    },
    {
      text: "Transformative service. They elevated our entire vision.",
      author: "Sarah K., Architect"
    },
    {
      text: "White-glove treatment from start to finish.",
      author: "Michael R., Homeowner"
    },
    {
      text: "Attention to detail that's simply unmatched.",
      author: "Jennifer L., Designer"
    }
  ]

  return (
    <section id="reviews" className="reviews-section">
      <div className="container">
        <p className="section-subtitle">Social Proof as Whisper, Not Shout</p>
        <h2 className="section-title">Testimonials</h2>
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
                <div className="review-slide">
                  <div className="review-card">
                    <p className="review-text">"{review.text}"</p>
                    <p className="review-author">— {review.author}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

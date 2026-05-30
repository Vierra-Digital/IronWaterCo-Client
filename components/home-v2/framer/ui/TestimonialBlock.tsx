'use client'

import Image from 'next/image'
import type { CSSProperties } from 'react'
import styles from '../framer-ui.module.css'

export type TestimonialBlockProps = {
  quote: string
  author: string
  role: string
  imageUrl: string
  style?: CSSProperties
}

export default function TestimonialBlock({
  quote,
  author,
  role,
  imageUrl,
  style,
}: TestimonialBlockProps) {
  return (
    <div style={style}>
      <p className={styles.testimonialQuote}>&ldquo;{quote}&rdquo;</p>
      <div className={styles.testimonialAuthor}>
        <div className={styles.testimonialAvatar}>
          <Image
            src={imageUrl}
            alt=""
            width={64}
            height={64}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </div>
        <div>
          <p className={styles.testimonialName}>{author}</p>
          <p className={styles.testimonialRole}>{role}</p>
        </div>
      </div>
    </div>
  )
}

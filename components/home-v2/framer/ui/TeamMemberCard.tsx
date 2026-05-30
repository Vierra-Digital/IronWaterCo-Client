'use client'

import Image from 'next/image'
import type { CSSProperties } from 'react'
import styles from '../framer-ui.module.css'

export type TeamMemberCardProps = {
  name: string
  role: string
  imageUrl?: string
  initials?: string
  style?: CSSProperties
}

export default function TeamMemberCard({
  name,
  role,
  imageUrl,
  initials,
  style,
}: TeamMemberCardProps) {
  return (
    <article className={styles.teamCard} style={style}>
      <div className={styles.teamPhoto}>
        {imageUrl ? (
          <Image src={imageUrl} alt={name} width={88} height={88} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        ) : (
          <span>{initials ?? name.slice(0, 1)}</span>
        )}
      </div>
      <h3 className={styles.teamName}>{name}</h3>
      <p className={styles.teamRole}>{role}</p>
    </article>
  )
}

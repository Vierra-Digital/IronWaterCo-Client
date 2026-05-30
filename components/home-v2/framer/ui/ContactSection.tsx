'use client'

import { useState, type FormEvent } from 'react'
import { contactInfo } from '../../../../data/homepage'
import Grain from './Grain'
import styles from '../framer-sections.module.css'

export default function ContactSection() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className={`${styles.section} ${styles.sectionAlt}`}>
      <Grain />
      <div className={styles.inner}>
        <h2 className={`${styles.sectionTitle} ${styles.sectionTitleCenter}`}>Contact</h2>
        <div className={styles.contactGrid}>
          <div className={styles.contactBlock}>
            <p>
              <strong>Address</strong>
              {contactInfo.street}
              <br />
              {contactInfo.city}, {contactInfo.state} {contactInfo.zip}
            </p>
            <p>
              <strong>Phone</strong>
              <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}>{contactInfo.phone}</a>
            </p>
            <p>
              <strong>Email</strong>
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </p>
            <p style={{ marginBottom: 0 }}>
              <strong>Hours</strong>
              <span style={{ whiteSpace: 'pre-line', display: 'block' }}>{contactInfo.hours}</span>
            </p>
          </div>
          <form className={styles.form} onSubmit={onSubmit}>
            <input required name="name" placeholder="Name" className={styles.input} />
            <input required name="email" type="email" placeholder="Email" className={styles.input} />
            <textarea required name="message" placeholder="Message" rows={5} className={styles.input} />
            <button
              type="submit"
              className={`${styles.submitBtn} ${sent ? styles.submitBtnSent : ''}`}
              disabled={sent}
            >
              {sent ? 'Sent' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

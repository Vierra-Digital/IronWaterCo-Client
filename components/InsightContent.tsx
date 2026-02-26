'use client'

import { useEffect, useRef, useState, Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Insight, InsightBlock } from '../data/insights'

interface InsightContentProps {
  insight: Insight
}

export default function InsightContent({ insight }: InsightContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [currentUrl, setCurrentUrl] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)

    if (window.innerWidth > 768) {
      const handleScroll = () => {
        if (headerRef.current && bodyRef.current) {
          const scrolled = window.pageYOffset
          const rate = scrolled * 0.2
          headerRef.current.style.transform = `translateY(${rate}px)`
          bodyRef.current.style.transform = `translateY(${-rate * 0.1}px)`
        }
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
      const elements = contentRef.current.querySelectorAll('.insight-block')
      elements.forEach((el) => observer.observe(el))

      return () => observer.disconnect()
    }
  }, [])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T12:00:00')
    const day = date.getDate()
    const getOrdinal = (n: number) => {
      const s = ['th', 'st', 'nd', 'rd']
      const v = n % 100
      return n + (s[(v - 20) % 10] || s[v] || s[0])
    }
    const month = date.toLocaleDateString('en-US', { month: 'long' })
    const year = date.getFullYear()
    return `${month} ${getOrdinal(day)}, ${year}`
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = currentUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const renderTextWithBreaks = (content: string) => {
    const lines = content.split('\n')
    if (lines.length === 1) return content
    return lines.map((line, i) => (
      <Fragment key={i}>
        {line}
        {i < lines.length - 1 && <br />}
      </Fragment>
    ))
  }

  const renderBlock = (block: InsightBlock, index: number) => {
    switch (block.type) {
      case 'heading':
        return (
          <div key={index} className="insight-block insight-block-heading fade-in">
            <h2>{block.content}</h2>
            {block.subtitle && <p className="insight-block-subtitle">{block.subtitle}</p>}
          </div>
        )
      case 'list':
        return (
          <ul key={index} className="insight-block insight-block-list fade-in">
            {block.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )
      case 'image':
        return (
          <figure key={index} className="insight-block insight-block-image fade-in">
            <Image
              src={block.src}
              alt={block.alt}
              width={1200}
              height={900}
              className="insight-image"
            />
            {block.caption && <figcaption className="insight-image-caption">{block.caption}</figcaption>}
          </figure>
        )
      case 'paragraph':
      default:
        return (
          <p key={index} className="insight-block insight-paragraph fade-in">
            {renderTextWithBreaks(block.content)}
          </p>
        )
    }
  }

  const encodedUrl = encodeURIComponent(currentUrl)
  const encodedTitle = encodeURIComponent(insight.title)

  return (
    <article className={`insight-page ${isVisible ? 'insight-page-visible' : ''}`} ref={contentRef}>
      <div className="insight-header" ref={headerRef}>
        <div className="container">
          <h1 className="insight-title">{insight.title}</h1>
          {insight.subtitle && (
            <p className="insight-subtitle">{insight.subtitle}</p>
          )}
          <div className="insight-header-meta">
            <time className="insight-header-date" dateTime={insight.date}>{formatDate(insight.date)}</time>
            <span className="insight-header-separator">&bull;</span>
            <span className="insight-header-read-time">{insight.readTime}</span>
          </div>
        </div>
      </div>

      <div className="insight-body" ref={bodyRef}>
        <div className="container">
          <div className="insight-content">
            {insight.body.map((block, index) => renderBlock(block, index))}
          </div>

          <div className="insight-footer">
            <div className="insight-share">
              <span className="insight-share-label">Share this insight</span>
              <div className="insight-share-links">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="insight-share-btn insight-share-facebook"
                  aria-label="Share on Facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="insight-share-btn insight-share-x"
                  aria-label="Share on X (Twitter)"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="insight-share-btn insight-share-linkedin"
                  aria-label="Share on LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href={`mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`I thought you might find this insight from Iron & Water Co. interesting:\n\n${insight.title}\n${insight.summary}\n\nRead more: ${currentUrl}`)}`}
                  className="insight-share-btn insight-share-email"
                  aria-label="Share via email"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </a>
                <button
                  onClick={handleCopyLink}
                  className={`insight-share-btn insight-share-copy ${copied ? 'insight-share-copied' : ''}`}
                  aria-label={copied ? 'Link copied!' : 'Copy link to clipboard'}
                >
                  {copied ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <Link href="/insights" className="insight-back-cta">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              All Insights
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

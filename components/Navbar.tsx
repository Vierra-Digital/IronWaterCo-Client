'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import FormModal from './FormModal'

interface NavbarProps {
  activePage?: 'home' | 'store' | 'vendors' | 'faq' | 'knowledgebase' | 'insights'
}

export default function Navbar({ activePage = 'home' }: NavbarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <nav className={`navbar ${isLoaded ? 'navbar-loaded' : ''}`} aria-label="Main navigation">
        <div className="navbar-content">
          <Link href="/" className="navbar-brand" aria-label="Iron & Water Co. Home">
            <div className="navbar-logo">
              <Image
                src="/logo.png"
                alt="Iron & Water Co. - Premium Architectural Hardware & Plumbing Logo"
                width={50}
                height={50}
                className="navbar-logo-img"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div className="navbar-text">
              <span className="navbar-title">Iron & Water Co.</span>
            </div>
          </Link>
          <div className="navbar-links" role="list">
            <Link href="/store" className={`nav-link ${activePage === 'store' ? 'nav-link-active' : ''}`} role="listitem">Store</Link>
            <Link href="/vendors" className={`nav-link ${activePage === 'vendors' ? 'nav-link-active' : ''}`} role="listitem">Vendors</Link>
            <Link href="/knowledgebase" className={`nav-link ${activePage === 'knowledgebase' ? 'nav-link-active' : ''}`} role="listitem">Knowledgebase</Link>
            <Link href="/insights" className={`nav-link ${activePage === 'insights' ? 'nav-link-active' : ''}`} role="listitem">Insights</Link>
            <Link href="/faq" className={`nav-link ${activePage === 'faq' ? 'nav-link-active' : ''}`} role="listitem">FAQ</Link>
            <Link href="/#contact" className="nav-link" role="listitem">Contact</Link>
            <button className="nav-cta" onClick={openModal} aria-label="Join Our Founders Circle - Early Access Form">Join Our Founders Circle</button>
          </div>
        </div>
      </nav>
      <FormModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}


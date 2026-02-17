'use client'

import { useEffect, useRef, useState } from 'react'

const vendors = [
  'Accurate Hardware',
  'Alice Ceramica',
  'Alt',
  'Alno Inc',
  'Amba',
  'AquaBrass',
  'AquaBrass Xpress',
  'Armadi Art',
  'Artos',
  'Ashley Norton',
  'Axent',
  'Baden Haus',
  'Barber Wilsons',
  'Bates & Bates',
  'Beloni Bagno',
  'Bemis',
  'Blanco',
  'Buster & Punch',
  'CaBano',
  'Cavity Sliders',
  'Century Bathworks',
  'Cheviot Products',
  'Cinier',
  'Colombo Design',
  'Cool Lines USA',
  'Croft Co',
  'Decor Walther',
  'Deltana',
  'Devon & Devon',
  'DND Handles',
  'Duravit',
  'Electric Mirror',
  'Elkay',
  'Emtek',
  'Fiora',
  'Galerie by Neptune',
  'Ged Kennett',
  'Geberit',
  'GlassCrafters Inc.',
  'Hafele',
  'Hapny Home',
  'Hendel & Hendel',
  'Herbeau',
  'HydroSystems',
  'Incinerator',
  'Jaclo',
  'Jorger',
  'Kartners',
  'Kingston Brass',
  'Laufen',
  'LinkaSink',
  'Mac Faucets',
  'Madeli',
  'Maestro Bath',
  'Matthew Studios',
  'Mountain Plumbing',
  'Mr. Steam',
  'Oatey',
  'Perrin & Rowe',
  'Produits Neptune',
  'Rajack',
  'Riobel',
  'House Of Rohl',
  'Rubinetterie Treeme',
  'Schaub & Company',
  'Schmidlin',
  'Shaw\'s',
  'Simas',
  'Sterlingham',
  'StoneTouch',
  'Studio Lux',
  'Sugatsune',
  'Trim to the Trade',
  'Vast Studio',
  'Victoria & Albert',
  'Vogue UK',
  'Wasserwerk',
].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))

export default function VendorsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const vendorsRef = useRef<(HTMLElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('fade-in-visible')
            }, index * 50)
          }
        })
      },
      { threshold: 0.1 }
    )

    vendorsRef.current.forEach((vendor) => {
      if (vendor) observer.observe(vendor)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="vendors" className={`vendors-section ${isVisible ? 'vendors-section-visible' : ''}`} ref={sectionRef} aria-labelledby="vendors-heading">
      <div className="container">
        <div ref={headerRef}>
          <p className="section-subtitle">Curated Excellence</p>
          <h1 id="vendors-heading" className="section-title">Our Vendors</h1>
          <p className="vendors-intro">
            We partner with the world's finest manufacturers to bring you exceptional architectural hardware and plumbing fixtures. 
            Each vendor in our collection has been carefully selected for their commitment to quality, craftsmanship, and design excellence.
          </p>
        </div>
        <div className="vendors-grid" ref={gridRef} role="list">
          {vendors.map((vendor, index) => (
            <div
              key={index}
              ref={(el) => { vendorsRef.current[index] = el; }}
              className="vendor-card fade-in"
              role="listitem"
            >
              <div className="vendor-name">{vendor}</div>
            </div>
          ))}
        </div>
        <div className="vendors-cta">
          <a 
            href="mailto:customerexperience@ironandwaterco.com?subject=Vendor Inquiry" 
            className="vendor-email-button"
            aria-label="Inquire about joining our elite collection of vendors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Inquire About Joining Our Elite Collection Of Vendors
          </a>
        </div>
      </div>
    </section>
  )
}


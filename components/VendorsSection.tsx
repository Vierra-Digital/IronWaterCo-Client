'use client'

import { useEffect, useRef } from 'react'

const vendors = [
  'Alice Ceramica',
  'Alt',
  'Amba',
  'AquaBrass',
  'AquaBrass Xpress',
  'Armadi Art',
  'Axent',
  'Baden Haus',
  'Barber Wilsons',
  'Bates & Bates',
  'Beloni Bagno',
  'Bemis',
  'Blanco',
  'Buster & Punch',
  'CaBano',
  'Century Bathworks',
  'Cheviot Products',
  'Cinier',
  'Cool Lines USA',
  'Decor Walther',
  'Devon & Devon',
  'Duravit',
  'Electric Mirror',
  'Elkay',
  'Fiora',
  'Galerie by Neptune',
  'Geberit',
  'GlassCrafters Inc.',
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
  'Mountain Plumbing',
  'Mr. Steam',
  'Oatey',
  'Perrin & Rowe',
  'Produits Neptune',
  'Riobel',
  'House Of Rohl',
  'Rubinetterie Treeme',
  'Schmidlin',
  'Shaw\'s',
  'Simas',
  'Sterlingham',
  'StoneTouch',
  'Studio Lux',
  'Trim to the Trade',
  'Vast Studio',
  'Victoria & Albert',
  'Vogue UK',
  'Wasserwerk',
].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))

export default function VendorsSection() {
  const vendorsRef = useRef<(HTMLElement | null)[]>([])

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
    <section id="vendors" className="vendors-section" aria-labelledby="vendors-heading">
      <div className="container">
        <p className="section-subtitle">Curated Excellence</p>
        <h1 id="vendors-heading" className="section-title">Our Vendors</h1>
        <p className="vendors-intro">
          We partner with the world's finest manufacturers to bring you exceptional architectural hardware and plumbing fixtures. 
          Each vendor in our collection has been carefully selected for their commitment to quality, craftsmanship, and design excellence.
        </p>
        <div className="vendors-grid" role="list">
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


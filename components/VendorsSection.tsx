'use client'

import { useEffect, useRef } from 'react'

const vendors = [
  'Rohl',
  'Perrin & Rowe',
  'Riobel',
  'Victoria & Albert',
  'Shaw\'s',
  'HydroSystems',
  'Century Bathworks',
  'Cool Lines USA',
  'Electric Mirror',
  'Armadi Art',
  'LinkaSink',
  'Mountain Plumbing',
  'Axent',
  'Studio Lux',
  'Buster & Punch',
  'Beloni Bagno',
  'Baden Haus',
  'Alice Ceramica',
  'Decor Walther',
  'Schmidlin',
  'Jorger',
  'Produits Neptune',
  'Galerie by Neptune',
  'Wasserwerk',
  'Herbeau',
  'Vast Studio',
  'Mac Faucets',
  'Barber Wilsons',
  'Sterlingham',
  'Devon & Devon',
  'Maestro Bath',
  'Rubinetterie Treeme',
  'AquaBrass',
  'AquaBrass Xpress',
  'Alt',
  'CaBano',
  'StoneTouch',
  'Fiora',
  'Simas',
  'Geberit',
  'Duravit',
  'Bemis',
  'Elkay',
  'Incinerator',
  'Mr. Steam',
  'Oatey',
  'Blanco',
  'Laufen',
  'GlassCrafters Inc.',
  'Kartners',
  'Madeli',
  'Vogue UK',
  'Amba',
  'Cinier',
  'Kingston Brass',
  'Jaclo',
  'Trim to the Trade',
  'Cheviot Products',
  'Bates & Bates',
]

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


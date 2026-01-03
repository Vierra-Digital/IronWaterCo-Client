import HeroSection from '../components/HeroSection'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ironandwaterco.com'

export const metadata: Metadata = {
  title: 'Plumbing and Construction Products',
  description: 'Iron & Water Co. curates extraordinary architectural hardware and plumbing for designers, architects, builders & homeowners on Long Island\'s Miracle Mile.',
}

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}#organization`,
    name: 'Iron & Water Co.',
    description: 'Curating extraordinary architectural hardware and plumbing for the trade on Long Island\'s Miracle Mile. Elevating the design trade through exceptional detail, service, and partnership.',
    url: siteUrl,
    logo: `${siteUrl}/logo-long.jpg`,
    image: `${siteUrl}/logo-long.jpg`,
    telephone: '329-233-6638',
    email: 'customerexperience@ironandwaterco.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1506 Northern Blvd',
      addressLocality: 'Manhasset',
      addressRegion: 'NY',
      postalCode: '11030',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7919,
      longitude: -73.6985,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$$',
    areaServed: {
      '@type': 'City',
      name: 'Long Island',
    },
    sameAs: [
      'https://www.instagram.com/ironandwaterco/',
      'https://www.linkedin.com/company/iron-water-co/',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '10',
    },
  }

  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: 'Iron & Water Co.',
    url: siteUrl,
    logo: `${siteUrl}/logo-long.jpg`,
    description: 'Curating extraordinary architectural hardware and plumbing for the trade on Long Island\'s Miracle Mile.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '329-233-6638',
      contactType: 'Customer Service',
      email: 'customerexperience@ironandwaterco.com',
      areaServed: 'US',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://www.instagram.com/ironandwaterco/',
      'https://www.linkedin.com/company/iron-water-co/',
    ],
  }

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
    <main>
      <HeroSection />
    </main>
    </>
  )
}

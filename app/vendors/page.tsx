import VendorsSection from '../../components/VendorsSection'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ironandwaterco.com'

export const metadata: Metadata = {
  title: 'Vendors',
  description: 'Discover our curated selection of premium architectural hardware and plumbing vendors. Partnering with the world\'s finest manufacturers for exceptional quality and design.',
  keywords: [
    'plumbing vendors',
    'architectural hardware vendors',
    'premium plumbing manufacturers',
    'luxury hardware suppliers',
    'trade vendors',
    'Geberit',
    'TOTO',
    'Duravit',
    'plumbing fixtures vendors',
    'architectural hardware manufacturers',
  ],
  openGraph: {
    title: 'Vendors | Iron & Water Co.',
    description: 'Discover our curated selection of premium architectural hardware and plumbing vendors. Partnering with the world\'s finest manufacturers.',
    url: `${siteUrl}/vendors`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Vendors | Iron & Water Co.',
    description: 'Discover our curated selection of premium architectural hardware and plumbing vendors.',
  },
  alternates: {
    canonical: `${siteUrl}/vendors`,
  },
}

export default function VendorsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Vendors | Iron & Water Co.',
    description: 'Curated selection of premium architectural hardware and plumbing vendors',
    url: `${siteUrl}/vendors`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Premium Plumbing and Architectural Hardware Vendors',
        },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar activePage="vendors" />
      <VendorsSection />
      <Footer />
    </>
  )
}


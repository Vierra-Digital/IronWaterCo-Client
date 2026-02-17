import StoreSection from '@/components/StoreSection'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ironandwaterco.com'

export const metadata: Metadata = {
  title: 'Store',
  description: 'Browse our curated collection of plumbing fixtures, hardware, and construction products. Quality products for architects, designers, builders, and homeowners.',
  keywords: [
    'plumbing products',
    'construction products',
    'plumbing fixtures',
    'hardware',
    'architectural hardware',
    'bathroom fixtures',
    'kitchen fixtures',
    'trade products',
    'professional plumbing',
  ],
  openGraph: {
    title: 'Store | Iron & Water Co.',
    description: 'Browse our curated collection of plumbing fixtures, hardware, and construction products.',
    url: `${siteUrl}/store`,
    siteName: 'Iron & Water Co.',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/logo-long.jpg`,
        width: 1200,
        height: 630,
        alt: 'Iron & Water Co. Store',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Store | Iron & Water Co.',
    description: 'Browse our curated collection of plumbing fixtures, hardware, and construction products.',
    images: [`${siteUrl}/logo-long.jpg`],
    creator: '@ironandwaterco',
  },
  alternates: {
    canonical: `${siteUrl}/store`,
  },
}

export default function StorePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': `${siteUrl}/store#store`,
    name: 'Iron & Water Co. Store',
    description: 'Curated collection of plumbing fixtures, hardware, and construction products',
    url: `${siteUrl}/store`,
    image: `${siteUrl}/logo-long.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1506 Northern Blvd',
      addressLocality: 'Manhasset',
      addressRegion: 'NY',
      postalCode: '11030',
      addressCountry: 'US',
    },
    priceRange: '$$$',
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
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Store',
        item: `${siteUrl}/store`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <Navbar activePage="store" />
      <main>
        <StoreSection />
      </main>
      <Footer />
    </>
  )
}


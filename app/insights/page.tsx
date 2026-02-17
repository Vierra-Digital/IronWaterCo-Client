import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import InsightsSection from '../../components/InsightsSection'
import type { Metadata } from 'next'
import { insights } from '../../data/insights'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ironandwaterco.com'

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Quick reads on materials, design decisions, and the details that make a difference in architectural hardware and plumbing. Expert perspectives from Iron & Water Co.',
  keywords: [
    'architectural hardware insights',
    'plumbing insights',
    'design materials',
    'hardware selection',
    'plumbing fixtures',
    'brass hardware',
    'faucet selection',
    'showroom insights',
    'Long Island hardware',
    'Manhasset showroom',
    'design advice',
    'trade insights',
  ],
  openGraph: {
    title: 'Insights | Iron & Water Co.',
    description: 'Quick reads on materials, design decisions, and the details that make a difference in architectural hardware and plumbing.',
    url: `${siteUrl}/insights`,
    siteName: 'Iron & Water Co.',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/logo-long.jpg`,
        width: 1200,
        height: 630,
        alt: 'Iron & Water Co. Insights',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insights | Iron & Water Co.',
    description: 'Quick reads on materials, design decisions, and the details that make a difference in architectural hardware and plumbing.',
    images: [`${siteUrl}/logo-long.jpg`],
    creator: '@ironandwaterco',
  },
  alternates: {
    canonical: `${siteUrl}/insights`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
}

export default function InsightsPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Insights | Iron & Water Co.',
    description: 'Quick reads on materials, design decisions, and the details that make a difference in architectural hardware and plumbing.',
    url: `${siteUrl}/insights`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: insights.map((insight, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: insight.title,
        url: `${siteUrl}/insights/${insight.slug}`,
      })),
    },
  }

  const breadcrumbSchema = {
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
        name: 'Insights',
        item: `${siteUrl}/insights`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar activePage="insights" />
      <InsightsSection />
      <Footer />
    </>
  )
}

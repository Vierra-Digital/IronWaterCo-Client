import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import NYCGuideContent from '../../../components/NYCGuideContent'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ironandwaterco.com'

export const metadata: Metadata = {
  title: 'Wall-Hung Toilets in NYC Co-Op & Condo Buildings: Local Approval Notes & Planning Considerations',
  description: 'NYC-specific guidance for wall-hung toilet installations in co-op and condo buildings. Learn what boards typically ask, approval language, and local building considerations.',
  keywords: [
    'NYC wall-hung toilets',
    'NYC co-op approval',
    'NYC condo approval',
    'NYC plumbing',
    'Manhattan co-op',
    'Brooklyn condo',
    'NYC building code',
    'DOB approval',
    'NYC plumbing permits',
    'co-op board approval NYC',
    'NYC plumbing installation',
    'wall-hung toilets NYC',
  ],
  openGraph: {
    title: 'Wall-Hung Toilets in NYC Co-Op & Condo Buildings: Local Approval Notes & Planning Considerations',
    description: 'NYC-specific guidance for wall-hung toilet installations in co-op and condo buildings. Learn what boards typically ask, approval language, and local building considerations.',
    url: `${siteUrl}/guides/wall-hung-toilets-nyc-coop-condo`,
    type: 'article',
    publishedTime: '2025-12-27',
    authors: ['Iron & Water Co.'],
    tags: ['plumbing', 'NYC', 'co-op approval', 'wall-hung toilets', 'NYC building code'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wall-Hung Toilets in NYC Co-Op & Condo Buildings: Local Approval Notes & Planning Considerations',
    description: 'NYC-specific guidance for wall-hung toilet installations. Learn what boards typically ask and approval language.',
  },
  alternates: {
    canonical: `${siteUrl}/guides/wall-hung-toilets-nyc-coop-condo`,
  },
}

export default function NYCWallHungToiletsGuide() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Wall-Hung Toilets in NYC Co-Op & Condo Buildings: Local Approval Notes & Planning Considerations',
    description: 'NYC-specific guidance for wall-hung toilet installations in co-op and condo buildings. Learn what boards typically ask, approval language, and local building considerations.',
    image: `${siteUrl}/logo-long.jpg`,
    datePublished: '2025-12-27',
    dateModified: '2025-12-27',
    author: {
      '@type': 'Organization',
      name: 'Iron & Water Co.',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Iron & Water Co.',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo-long.jpg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/guides/wall-hung-toilets-nyc-coop-condo`,
    },
    articleSection: 'Plumbing',
    keywords: 'NYC wall-hung toilets, NYC co-op approval, NYC plumbing, DOB approval',
    about: {
      '@type': 'Place',
      name: 'New York City',
      addressRegion: 'NY',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar activePage="home" />
      <NYCGuideContent />
      <Footer />
    </>
  )
}


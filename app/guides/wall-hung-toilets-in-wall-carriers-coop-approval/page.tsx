import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import GuideContent from '../../../components/GuideContent'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ironandwaterco.com'

export const metadata: Metadata = {
  title: 'Wall-Hung Toilets + In-Wall Carriers: Co-op Approval, Specs, and Pitfalls',
  description: 'A practical guide to wall-hung toilets and in-wall carrier systems—what to specify, common mistakes, and the exact documents co-ops/condos typically require for approval.',
  keywords: [
    'wall-hung toilets',
    'in-wall carriers',
    'co-op approval',
    'condo approval',
    'plumbing specifications',
    'carrier systems',
    'concealed tanks',
    'flush actuator',
    'plumbing installation',
    'co-op board requirements',
    'plumbing specs',
    'wall-hung toilet guide',
  ],
  openGraph: {
    title: 'Wall-Hung Toilets + In-Wall Carriers: Co-op Approval, Specs, and Pitfalls',
    description: 'A practical guide to wall-hung toilets and in-wall carrier systems—what to specify, common mistakes, and the exact documents co-ops/condos typically require for approval.',
    url: `${siteUrl}/guides/wall-hung-toilets-in-wall-carriers-coop-approval`,
    type: 'article',
    publishedTime: '2025-12-27',
    authors: ['Iron & Water Co.'],
    tags: ['plumbing', 'wall-hung toilets', 'co-op approval', 'installation guides'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wall-Hung Toilets + In-Wall Carriers: Co-op Approval Guide',
    description: 'A practical guide to wall-hung toilets and in-wall carrier systems—what to specify, common mistakes, and approval documents.',
  },
  alternates: {
    canonical: `${siteUrl}/guides/wall-hung-toilets-in-wall-carriers-coop-approval`,
  },
}

export default function WallHungToiletsGuide() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Wall-Hung Toilets + In-Wall Carriers: Co-op Approval, Specs, and Pitfalls',
    description: 'A practical guide to wall-hung toilets and in-wall carrier systems—what to specify, common mistakes, and the exact documents co-ops/condos typically require for approval.',
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
      '@id': `${siteUrl}/guides/wall-hung-toilets-in-wall-carriers-coop-approval`,
    },
    articleSection: 'Plumbing',
    keywords: 'wall-hung toilets, in-wall carriers, co-op approval, plumbing specifications',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar activePage="home" />
      <GuideContent />
      <Footer />
    </>
  )
}


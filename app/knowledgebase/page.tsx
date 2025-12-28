import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import KnowledgebaseSection from '../../components/KnowledgebaseSection'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ironandwaterco.com'

export const metadata: Metadata = {
  title: 'Knowledgebase',
  description: 'Expert guides and resources for architectural hardware, plumbing systems, and installation best practices.',
  keywords: [
    'plumbing guides',
    'architectural hardware guides',
    'installation guides',
    'wall-hung toilet guides',
    'co-op approval guides',
    'plumbing specifications',
    'building code guides',
    'plumbing best practices',
    'architectural hardware resources',
  ],
  openGraph: {
    title: 'Knowledgebase | Iron & Water Co.',
    description: 'Expert guides and resources for architectural hardware, plumbing systems, and installation best practices.',
    url: `${siteUrl}/knowledgebase`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Knowledgebase | Iron & Water Co.',
    description: 'Expert guides and resources for architectural hardware, plumbing systems, and installation best practices.',
  },
  alternates: {
    canonical: `${siteUrl}/knowledgebase`,
  },
}

export default function KnowledgebasePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Knowledgebase | Iron & Water Co.',
    description: 'Expert guides and resources for architectural hardware, plumbing systems, and installation best practices',
    url: `${siteUrl}/knowledgebase`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Wall-Hung Toilets + In-Wall Carriers: Co-op Approval, Specs, and Pitfalls',
          url: `${siteUrl}/guides/wall-hung-toilets-in-wall-carriers-coop-approval`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Wall-Hung Toilets in NYC Co-Op & Condo Buildings: Local Approval Notes & Planning Considerations',
          url: `${siteUrl}/guides/wall-hung-toilets-nyc-coop-condo`,
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
      <Navbar activePage="knowledgebase" />
      <KnowledgebaseSection />
      <Footer />
    </>
  )
}


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
    siteName: 'Iron & Water Co.',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/logo-long.jpg`,
        width: 1200,
        height: 630,
        alt: 'Iron & Water Co. Knowledgebase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Knowledgebase | Iron & Water Co.',
    description: 'Expert guides and resources for architectural hardware, plumbing systems, and installation best practices.',
    images: [`${siteUrl}/logo-long.jpg`],
    creator: '@ironandwaterco',
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
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Kosher Material Reference: Blanco Silgranit Kitchen Sinks',
          url: `${siteUrl}/guides/kosher-material-reference-blanco-silgranit-kitchen-sinks`,
        },
      ],
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Knowledgebase', item: `${siteUrl}/knowledgebase` },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar activePage="knowledgebase" />
      <KnowledgebaseSection />
      <Footer />
    </>
  )
}


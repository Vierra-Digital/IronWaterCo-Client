import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import KosherGuideContent from '../../../components/KosherGuideContent'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ironandwaterco.com'

export const metadata: Metadata = {
  title: 'Kosher Material Reference: Blanco Silgranit Kitchen Sinks',
  description: 'A supporting reference for clients who maintain kosher kitchens. Review material considerations related to Blanco Silgranit kitchen sinks with documentation from the Zomet Institute.',
  keywords: [
    'kosher kitchen sinks',
    'Blanco Silgranit',
    'kosher certification',
    'kashering',
    'Zomet Institute',
    'kosher kitchen materials',
    'Blanco sinks',
    'Silgranit material',
    'kosher kitchen design',
    'rabbinical guidance',
  ],
  openGraph: {
    title: 'Kosher Material Reference: Blanco Silgranit Kitchen Sinks',
    description: 'A supporting reference for clients who maintain kosher kitchens. Review material considerations related to Blanco Silgranit kitchen sinks with documentation from the Zomet Institute.',
    url: `${siteUrl}/guides/kosher-material-reference-blanco-silgranit-kitchen-sinks`,
    siteName: 'Iron & Water Co.',
    type: 'article',
    publishedTime: '2026-01-18',
    authors: ['Iron & Water Co.'],
    tags: ['kosher', 'kitchen sinks', 'Blanco', 'Silgranit', 'material reference'],
    images: [
      {
        url: `${siteUrl}/logo-long.jpg`,
        width: 1200,
        height: 630,
        alt: 'Kosher Material Reference Guide - Iron & Water Co.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kosher Material Reference: Blanco Silgranit Kitchen Sinks',
    description: 'A supporting reference for clients who maintain kosher kitchens. Review material considerations related to Blanco Silgranit kitchen sinks.',
    images: [`${siteUrl}/logo-long.jpg`],
    creator: '@ironandwaterco',
  },
  alternates: {
    canonical: `${siteUrl}/guides/kosher-material-reference-blanco-silgranit-kitchen-sinks`,
  },
}

export default function KosherMaterialReferenceGuide() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Kosher Material Reference: Blanco Silgranit Kitchen Sinks',
    description: 'A supporting reference for clients who maintain kosher kitchens. Review material considerations related to Blanco Silgranit kitchen sinks with documentation from the Zomet Institute.',
    image: `${siteUrl}/logo-long.jpg`,
    datePublished: '2026-01-18',
    dateModified: '2026-01-18',
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
      '@id': `${siteUrl}/guides/kosher-material-reference-blanco-silgranit-kitchen-sinks`,
    },
    articleSection: 'Material Reference',
    keywords: 'kosher kitchen sinks, Blanco Silgranit, kosher certification, kashering, Zomet Institute',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Knowledgebase', item: `${siteUrl}/knowledgebase` },
      { '@type': 'ListItem', position: 3, name: 'Kosher Material Reference: Blanco Silgranit', item: `${siteUrl}/guides/kosher-material-reference-blanco-silgranit-kitchen-sinks` },
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
      <KosherGuideContent />
      <Footer />
    </>
  )
}

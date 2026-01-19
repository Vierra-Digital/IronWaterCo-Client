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
    type: 'article',
    publishedTime: '2026-01-18',
    authors: ['Iron & Water Co.'],
    tags: ['kosher', 'kitchen sinks', 'Blanco', 'Silgranit', 'material reference'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kosher Material Reference: Blanco Silgranit Kitchen Sinks',
    description: 'A supporting reference for clients who maintain kosher kitchens. Review material considerations related to Blanco Silgranit kitchen sinks.',
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar activePage="home" />
      <KosherGuideContent />
      <Footer />
    </>
  )
}

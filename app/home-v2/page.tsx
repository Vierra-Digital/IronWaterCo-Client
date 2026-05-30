import type { Metadata } from 'next'
import HomeV2Page from '../../components/home-v2/HomeV2Page'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ironandwaterco.com'

export const metadata: Metadata = {
  title: 'Iron & Water Co. | Architectural Hardware & Plumbing',
  description:
    "Iron & Water Co. curates extraordinary architectural hardware and plumbing for designers, architects, builders & homeowners on Long Island's Miracle Mile.",
  alternates: {
    canonical: `${siteUrl}/home-v2`,
  },
}

export default function HomeV2Route() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}#organization`,
    name: 'Iron & Water Co.',
    description:
      "Curating extraordinary architectural hardware and plumbing for the trade on Long Island's Miracle Mile.",
    url: siteUrl,
    logo: `${siteUrl}/logo-long.jpg`,
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
  }

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Home V2 Preview', item: `${siteUrl}/home-v2` },
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
      <HomeV2Page />
    </>
  )
}

import FAQSection from '../../components/FAQSection'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ironandwaterco.com'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about wall-hung toilets, carrier systems, and installation requirements. Get expert guidance for your next project.',
  keywords: [
    'wall-hung toilet FAQ',
    'in-wall carrier questions',
    'co-op approval FAQ',
    'plumbing installation questions',
    'wall-hung toilet safety',
    'carrier system FAQ',
    'plumbing specifications',
    'co-op board requirements',
    'condo approval questions',
  ],
  openGraph: {
    title: 'FAQ | Iron & Water Co.',
    description: 'Frequently asked questions about wall-hung toilets, carrier systems, and installation requirements. Get expert guidance for your next project.',
    url: `${siteUrl}/faq`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'FAQ | Iron & Water Co.',
    description: 'Frequently asked questions about wall-hung toilets, carrier systems, and installation requirements.',
  },
  alternates: {
    canonical: `${siteUrl}/faq`,
  },
}

export default function FAQPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are wall-hung toilets safe and strong?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes—when the correct carrier system is used and installed per the manufacturer\'s requirements. Many systems are engineered as structural frames intended to support the fixture load; the key is correct framing + correct installation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you have to open the wall to service the tank?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Routine service is commonly designed to occur through the flush actuator opening, depending on system. For board approvals, document the service plan clearly and include spec sheets.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are wall-hung toilets louder?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'They can be quiet or loud depending on wall build, isolation details, and installation quality. In multi-family buildings, sound strategy should be treated as a specification item, not a hope.',
        },
      },
      {
        '@type': 'Question',
        name: 'What do co-op boards usually require?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Typically: spec sheets, a plumbing plan excerpt, a wall/structural note, and a short serviceability statement. The cleaner the packet, the fewer questions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which brands make the in-wall carrier systems?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Common concealed carrier platforms include manufacturers such as Geberit, TOTO, Duravit, and OLI. (Many other brands exist; these are simply widely recognized system families.)',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar activePage="faq" />
      <FAQSection />
      <Footer />
    </>
  )
}


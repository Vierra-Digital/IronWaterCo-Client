import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ironandwaterco.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Iron & Water Co. | Architectural Hardware & Plumbing for the Trade',
    template: '%s | Iron & Water Co.',
  },
  description: 'Iron & Water Co. curates extraordinary architectural hardware and plumbing for designers, architects, builders & homeowners on Long Island\'s Miracle Mile. Elevating the design trade through exceptional detail, service, and partnership.',
  keywords: [
    'architectural hardware',
    'plumbing fixtures',
    'design trade',
    'Long Island',
    'Manhasset',
    'architects',
    'designers',
    'builders',
    'homeowners',
    'luxury hardware',
    'custom hardware',
    'trade program',
    'showroom',
    'specification support',
    'concierge ordering',
  ],
  authors: [{ name: 'Iron & Water Co.' }],
  creator: 'Iron & Water Co.',
  publisher: 'Iron & Water Co.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Iron & Water Co.',
    title: 'Iron & Water Co. | Architectural Hardware & Plumbing for the Trade',
    description: 'Curating extraordinary architectural hardware and plumbing for the trade on Long Island\'s Miracle Mile. Elevating the design trade through exceptional detail, service, and partnership.',
    images: [
      {
        url: '/logo-long.jpg',
        width: 1200,
        height: 630,
        alt: 'Iron & Water Co. - Architectural Hardware & Plumbing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Iron & Water Co. | Architectural Hardware & Plumbing for the Trade',
    description: 'Curating extraordinary architectural hardware and plumbing for the trade on Long Island\'s Miracle Mile.',
    images: ['/logo-long.jpg'],
    creator: '@ironandwaterco',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  alternates: {},
  category: 'Architecture & Design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0a0e1a" />
        <meta name="geo.region" content="US-NY" />
        <meta name="geo.placename" content="Manhasset" />
        <meta name="geo.position" content="40.7919;-73.6985" />
        <meta name="ICBM" content="40.7919, -73.6985" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Iron & Water Co." />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import InsightContent from '../../../components/InsightContent'
import { insights, getInsightWordCount } from '../../../data/insights'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ironandwaterco.com'

interface InsightPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return insights.map((insight) => ({
    slug: insight.slug,
  }))
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params
  const insight = insights.find((i) => i.slug === slug)

  if (!insight) {
    return { title: 'Insight Not Found' }
  }

  const heroImage = insight.body.find((block) => block.type === 'image')?.src || '/logo-long.jpg'

  return {
    title: insight.title,
    description: insight.summary,
    keywords: [
      insight.category.toLowerCase(),
      'architectural hardware',
      'plumbing',
      'iron and water co',
      'showroom insights',
      'design advice',
      'hardware selection',
      'Long Island showroom',
      'Manhasset',
    ],
    openGraph: {
      title: `${insight.title} | Iron & Water Co.`,
      description: insight.summary,
      url: `${siteUrl}/insights/${insight.slug}`,
      siteName: 'Iron & Water Co.',
      type: 'article',
      publishedTime: insight.date,
      modifiedTime: insight.date,
      authors: ['Iron & Water Co.'],
      tags: [insight.category, 'architectural hardware', 'plumbing', 'design'],
      images: [
        {
          url: `${siteUrl}${heroImage}`,
          width: 1200,
          height: 630,
          alt: `${insight.title} - Iron & Water Co.`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${insight.title} | Iron & Water Co.`,
      description: insight.summary,
      images: [`${siteUrl}${heroImage}`],
      creator: '@ironandwaterco',
    },
    alternates: {
      canonical: `${siteUrl}/insights/${insight.slug}`,
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
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params
  const insight = insights.find((i) => i.slug === slug)

  if (!insight) {
    notFound()
  }

  const heroImage = insight.body.find((block) => block.type === 'image')?.src || '/logo-long.jpg'

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: insight.title,
    description: insight.summary,
    image: `${siteUrl}${heroImage}`,
    datePublished: insight.date,
    dateModified: insight.date,
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
      '@id': `${siteUrl}/insights/${insight.slug}`,
    },
    articleSection: insight.category,
    wordCount: getInsightWordCount(insight),
    inLanguage: 'en-US',
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
      {
        '@type': 'ListItem',
        position: 3,
        name: insight.title,
        item: `${siteUrl}/insights/${insight.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar activePage="insights" />
      <InsightContent insight={insight} />
      <Footer />
    </>
  )
}

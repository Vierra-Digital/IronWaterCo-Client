import { MetadataRoute } from 'next'
import { insights } from '../data/insights'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ironandwaterco.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl

  const insightEntries: MetadataRoute.Sitemap = insights.map((insight) => ({
    url: `${baseUrl}/insights/${insight.slug}`,
    lastModified: new Date(insight.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/store`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vendors`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/knowledgebase`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...insightEntries,
    {
      url: `${baseUrl}/guides/wall-hung-toilets-in-wall-carriers-coop-approval`,
      lastModified: new Date('2025-12-27'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/wall-hung-toilets-nyc-coop-condo`,
      lastModified: new Date('2025-12-27'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/kosher-material-reference-blanco-silgranit-kitchen-sinks`,
      lastModified: new Date('2026-01-18'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}




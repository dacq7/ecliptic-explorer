import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://ecliptic-explorer.vercel.app'
  const now = new Date()

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${base}/calculator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${base}/simulation`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/durations`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${base}/learn`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${base}/compare`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.75,
    },
  ]
}

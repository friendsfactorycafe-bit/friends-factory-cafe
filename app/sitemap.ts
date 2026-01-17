import { MetadataRoute } from 'next'
import { vadodaraAreas } from '@/lib/business-config'
import { studyAbroadKeywords } from '@/lib/keywords-config'
import { getCountrySlugs, countries } from '@/lib/country-content'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://studyabroadvadodara.in'
  const currentDate = new Date()

  // Main pages (highest priority)
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ]

  // Country destination pages (very high priority - main service pages)
  const countryPages: MetadataRoute.Sitemap = countries.map((country) => ({
    url: `${baseUrl}/${country.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.95,
  }))

  // Area pages (high priority - local SEO for Vadodara)
  const areaPages: MetadataRoute.Sitemap = vadodaraAreas.map((area) => ({
    url: `${baseUrl}/${area}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Keyword/Service pages (medium-high priority - targeted SEO)
  const keywordPages: MetadataRoute.Sitemap = studyAbroadKeywords.map((keyword) => ({
    url: `${baseUrl}/${keyword.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Combine all pages in order of priority
  return [
    ...mainPages,
    ...countryPages,
    ...areaPages,
    ...keywordPages,
  ]
}

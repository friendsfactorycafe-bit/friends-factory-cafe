/**
 * FRIENDS FACTORY CAFE - PAGINATED SITEMAP SYSTEM
 * Domain: friendsfactorycafe.com
 * 
 * Uses Next.js generateSitemaps() to create paginated sitemaps:
 * - /sitemap/0.xml, /sitemap/1.xml, ... /sitemap/29.xml (up to 30 sitemaps)
 * - /sitemap.xml (auto-generated sitemap index referencing all chunks)
 * - Each sitemap contains max 100 URLs for optimal crawl efficiency
 * - Auto-updates when new pages are added to ffc-config
 * 
 * Total Pages: 200+ and growing
 */

import { MetadataRoute } from "next";
import { getSitemapChunks, getSitemapCount } from "@/lib/seo-url-registry";

const URLS_PER_SITEMAP = 100;
const MAX_SITEMAPS = 30;

/**
 * Generate sitemap index entries — Next.js calls this to create /sitemap.xml
 * which references /sitemap/0.xml, /sitemap/1.xml, etc.
 */
export async function generateSitemaps() {
  const count = Math.min(getSitemapCount(URLS_PER_SITEMAP), MAX_SITEMAPS);
  return Array.from({ length: count }, (_, i) => ({ id: i }));
}

/**
 * Generate individual sitemap for each chunk
 * Next.js calls this for each id returned by generateSitemaps()
 */
export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const chunks = getSitemapChunks(URLS_PER_SITEMAP);
  const chunk = chunks[id];

  if (!chunk) return [];

  return chunk.map((entry) => ({
    url: entry.url,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}

/**
 * MULTI-SITEMAP SYSTEM — Friends Factory Cafe
 * Generates 1 URL per sitemap file for maximum Google indexing speed.
 * Next.js auto-creates /sitemap.xml (index) + /sitemap/0.xml, /sitemap/1.xml, etc.
 * Scales automatically as new pages are added to ffc-config.ts.
 */

import { MetadataRoute } from "next";
import { getAllSiteUrls } from "@/lib/seo-url-registry";
import { SEO_CONFIG } from "@/lib/seo-config";

/**
 * Generate sitemap IDs — one per URL for maximum individual sitemaps.
 * With ~250+ URLs now, this creates ~250+ sitemaps.
 * As pages scale to 590+, sitemaps scale automatically.
 * Next.js creates /sitemap.xml as the index referencing all.
 */
export async function generateSitemaps() {
  const allUrls = getAllSiteUrls();
  const chunkSize = SEO_CONFIG.maxUrlsPerSitemap; // 1 URL per sitemap
  const totalSitemaps = Math.ceil(allUrls.length / chunkSize);

  return Array.from({ length: totalSitemaps }, (_, i) => ({ id: i }));
}

/**
 * Generate entries for a single sitemap chunk.
 * With maxUrlsPerSitemap=1, each sitemap contains exactly 1 URL.
 */
export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const allUrls = getAllSiteUrls();
  const chunkSize = SEO_CONFIG.maxUrlsPerSitemap;
  const start = id * chunkSize;
  const chunk = allUrls.slice(start, start + chunkSize);

  return chunk.map((entry) => ({
    url: entry.url,
    lastModified: new Date(entry.lastModified),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}

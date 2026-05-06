#!/usr/bin/env tsx
/**
 * GENERATE INDIVIDUAL PAGE.TSX FILES
 * ====================================
 * Mirrors Hivy's structure: each keyword/area gets its own page.tsx file.
 * This is why Hivy gets indexed — Google treats individual static files
 * as definitive concrete pages, not dynamic wildcard routes.
 *
 * Imports DIRECTLY from ffc-config so it never drifts from real data.
 *
 * Run: npx tsx scripts/generate-page-files.ts
 */

import fs from "fs";
import path from "path";
import { serviceCategories, vadodaraAreas } from "../lib/ffc-config";

const APP_DIR = path.join(process.cwd(), "app");
const BASE_URL = "https://friendsfactorycafe.com";

// ============================================================
// PAGE TEMPLATE: Individual keyword page
// ============================================================
function generateKeywordPage(
  serviceSlug: string,
  keywordSlug: string,
  metaTitle: string,
  metaDescription: string,
): string {
  const url = `${BASE_URL}/${keywordSlug}`;
  const safeTitle = metaTitle.replace(/`/g, "\\`").replace(/\${/g, "\\${");
  const safeDesc = metaDescription.replace(/`/g, "\\`").replace(/\${/g, "\\${");

  return `import { Metadata } from "next";
import FFCKeywordPage from "@/components/ffc-keyword-page";
import { getServiceBySlug } from "@/lib/ffc-config";

const service = getServiceBySlug("${serviceSlug}")!;
const keyword = service.keywords.find(k => k.slug === "${keywordSlug}")!;

export const metadata: Metadata = {
  title: \`${safeTitle}\`,
  description: \`${safeDesc}\`,
  alternates: { canonical: "${url}" },
  openGraph: {
    title: \`${safeTitle}\`,
    description: \`${safeDesc}\`,
    url: "${url}",
    type: "website",
    locale: "en_IN",
    siteName: "Friends Factory Cafe",
    images: [{ url: "${BASE_URL}/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: \`${safeTitle}\`,
    description: \`${safeDesc}\`,
  },
};

export default function Page() {
  return <FFCKeywordPage service={service} keyword={keyword} />;
}
`;
}

// ============================================================
// PAGE TEMPLATE: Individual area page
// ============================================================
function generateAreaPage(areaSlug: string, areaName: string): string {
  const url = `${BASE_URL}/${areaSlug}`;
  const areaLower = areaName.toLowerCase();
  const title = `Romantic Celebration in ${areaName}, Vadodara | Friends Factory Cafe`;
  const desc = `Planning a birthday surprise, candlelight dinner or anniversary near ${areaName}? Friends Factory Cafe offers 100% private rooftop celebrations for couples in ${areaName}, Vadodara. All-inclusive packages from ₹4,700.`;
  const ogDesc = `Premium private rooftop celebration venue for couples in ${areaName}, Vadodara. Birthday surprises, candlelight dinners & more from ₹4,700!`;
  const twitterDesc = `Book romantic celebrations near ${areaName}, Vadodara. Private rooftop venue with stunning setups from ₹4,700.`;

  return `import { Metadata } from "next";
import FFCAreaPage from "@/components/ffc-area-page";
import { getAreaBySlug } from "@/lib/ffc-config";

const area = getAreaBySlug("${areaSlug}")!;

export const metadata: Metadata = {
  title: "${title}",
  description: "${desc}",
  keywords: [
    "romantic celebration ${areaLower}",
    "candlelight dinner ${areaLower}",
    "birthday surprise ${areaLower} vadodara",
    "couple cafe near ${areaLower}",
    "anniversary celebration ${areaLower}",
    "friends factory cafe ${areaLower}",
  ],
  alternates: { canonical: "${url}" },
  openGraph: {
    title: "${title}",
    description: "${ogDesc}",
    url: "${url}",
    type: "website",
    locale: "en_IN",
    siteName: "Friends Factory Cafe",
    images: [{ url: "${BASE_URL}/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "${title}",
    description: "${twitterDesc}",
  },
};

export default function Page() {
  return <FFCAreaPage area={area} />;
}
`;
}

// ============================================================
// UTILITIES
// ============================================================
function createDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// ============================================================
// MAIN
// ============================================================
let created = 0;
let skipped = 0;

// ─── KEYWORD PAGES ────────────────────────────────────────
console.log("\n📄 Processing keyword pages from all service categories...\n");

for (const service of serviceCategories) {
  for (const keyword of service.keywords) {
    const slug = keyword.slug;
    const dir = path.join(APP_DIR, slug);
    const file = path.join(dir, "page.tsx");

    // Skip if already exists (don't overwrite manual work)
    if (fs.existsSync(file)) {
      skipped++;
      continue;
    }

    createDir(dir);
    const content = generateKeywordPage(
      service.slug,
      slug,
      keyword.metaTitle || keyword.title,
      keyword.metaDescription ||
        `Book ${keyword.title} in Vadodara at Friends Factory Cafe. Private rooftop venue. Packages from ₹4,700.`,
    );
    fs.writeFileSync(file, content, "utf-8");
    console.log(`  ✅ ${slug}`);
    created++;
  }
}

// ─── AREA PAGES ───────────────────────────────────────────
console.log(`\n📍 Processing area pages...\n`);

for (const area of vadodaraAreas) {
  const dir = path.join(APP_DIR, area.slug);
  const file = path.join(dir, "page.tsx");

  if (fs.existsSync(file)) {
    skipped++;
    continue;
  }

  createDir(dir);
  const content = generateAreaPage(area.slug, area.name);
  fs.writeFileSync(file, content, "utf-8");
  console.log(`  ✅ ${area.slug}`);
  created++;
}

console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Done!
   Created : ${created} files
   Skipped : ${skipped} (already existed)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Next steps:
1. git add app/ && git commit -m "feat: individual static page.tsx for all base keywords + areas"
2. git push  →  Vercel builds & statically generates all pages
3. Submit updated sitemap in Google Search Console
`);

// ============================================================================
// Batch Indexing Script — Google Indexing API + IndexNow + Sitemap Ping
// Run: npx tsx scripts/batch-index.ts
// Env: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, REINDEX_API_KEY, INDEXING_API_KEY
// ============================================================================

const SITE_URL = "https://friendsfactorycafe.com";
const REINDEX_API = `${SITE_URL}/api/reindex`;
const INDEXNOW_API = `${SITE_URL}/api/indexnow`;

async function getAllUrls(): Promise<string[]> {
  // Dynamically import the URL registry (works with tsx runner)
  try {
    const { getAllSiteUrls } = await import("../lib/seo-url-registry");
    return getAllSiteUrls().map((u) => u.url);
  } catch {
    // Fallback: scan app directory
    const fs = await import("fs");
    const path = await import("path");
    const appDir = path.join(process.cwd(), "app");
    const routes: string[] = ["/"];
    const ignoreDirs = new Set(["api", "_components", "_lib", "admin", "node_modules"]);

    function scanDir(dir: string, basePath: string) {
      let entries: ReturnType<typeof fs.readdirSync>;
      try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
      for (const entry of entries) {
        if (entry.name.startsWith(".") || entry.name.startsWith("_")) continue;
        if (entry.isDirectory()) {
          if (ignoreDirs.has(entry.name) || entry.name.startsWith("[")) continue;
          const dirPath = path.join(dir, entry.name);
          const routePath = `${basePath}/${entry.name}`;
          if (fs.existsSync(path.join(dirPath, "page.tsx")) || fs.existsSync(path.join(dirPath, "page.js"))) {
            routes.push(routePath);
          }
          scanDir(dirPath, routePath);
        }
      }
    }

    scanDir(appDir, "");
    return [...new Set(routes)].sort().map((r) => `${SITE_URL}${r}`);
  }
}

async function submitToGoogle(urls: string[]) {
  const apiKey = process.env.REINDEX_API_KEY;
  if (!apiKey) {
    console.error("⚠️  Missing REINDEX_API_KEY — skipping Google Indexing API");
    return;
  }

  console.log("\n🔵 GOOGLE INDEXING API");
  console.log(`   Submitting ${urls.length} URLs in batches of 50...`);

  const batchSize = 50;
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(urls.length / batchSize);
    console.log(`   Batch ${batchNum}/${totalBatches}: ${batch.length} URLs...`);

    try {
      const response = await fetch(REINDEX_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ urls: batch }),
      });

      const data = await response.json();
      if (data.successful) successCount += data.successful;
      if (data.failed) failCount += data.failed;
      console.log(`   ✅ ${data.successful || 0} success, ❌ ${data.failed || 0} failed`);
    } catch (err) {
      console.error(`   ❌ Batch failed: ${err}`);
      failCount += batch.length;
    }

    if (i + batchSize < urls.length) {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  console.log(`   Total: ✅ ${successCount} success, ❌ ${failCount} failed`);
}

async function submitToIndexNow(urls: string[]) {
  const apiKey = process.env.INDEXING_API_KEY;
  if (!apiKey) {
    console.error("⚠️  Missing INDEXING_API_KEY — skipping IndexNow");
    return;
  }

  console.log("\n🟢 INDEXNOW (Bing + Yandex)");
  console.log(`   Submitting ${urls.length} URLs...`);

  try {
    const response = await fetch(INDEXNOW_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ urls }),
    });

    const data = await response.json();
    if (data.results) {
      for (const r of data.results) {
        console.log(`   ${r.success ? "✅" : "❌"} ${r.engine}: ${r.message}`);
      }
    }
  } catch (err) {
    console.error(`   ❌ IndexNow failed: ${err}`);
  }
}

async function pingSitemap() {
  console.log("\n🔔 SITEMAP PING");
  const sitemapUrl = encodeURIComponent(`${SITE_URL}/sitemap.xml`);

  for (const engine of ["Google", "Bing"]) {
    const pingUrl =
      engine === "Google"
        ? `https://www.google.com/ping?sitemap=${sitemapUrl}`
        : `https://www.bing.com/ping?sitemap=${sitemapUrl}`;

    try {
      const response = await fetch(pingUrl);
      console.log(`   ${response.ok ? "✅" : "❌"} ${engine}: HTTP ${response.status}`);
    } catch (err) {
      console.error(`   ❌ ${engine} ping failed: ${err}`);
    }
  }
}

async function main() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("  Friends Factory Cafe — Batch Indexing System");
  console.log("  Google Indexing API + IndexNow + Sitemap Ping");
  console.log("═══════════════════════════════════════════════════════");

  const urls = await getAllUrls();
  console.log(`\n📊 Found ${urls.length} URLs to index`);
  console.log(`   Sitemaps generated: ${urls.length} (1 URL per sitemap)`);

  // 1. Google Indexing API (200 requests/day free)
  await submitToGoogle(urls);

  // 2. IndexNow — Bing + Yandex (free, instant, practically unlimited)
  await submitToIndexNow(urls);

  // 3. Sitemap ping — notify engines of sitemap updates
  await pingSitemap();

  console.log("\n═══════════════════════════════════════════════════════");
  console.log("  ✅ Done! All indexing channels submitted.");
  console.log("═══════════════════════════════════════════════════════\n");
}

main().catch(console.error);

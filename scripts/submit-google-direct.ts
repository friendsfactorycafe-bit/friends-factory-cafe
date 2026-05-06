import * as fs from "fs";
import * as path from "path";
import { notifyGoogleIndexing, submitBatchToGoogle } from "../lib/google-indexing";
import { getAllSiteUrls } from "../lib/seo-url-registry";

// Load environment variables from .env.local
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex);
    let value = trimmed.slice(eqIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    value = value.replace(/\\n/g, "\n").replace(/\n"$/, "").trim();
    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}

async function main() {
  console.log("═══════════════════════════════════════════════════════════════");
  console.log("  Friends Factory Cafe — Direct Google Indexing");
  console.log("═══════════════════════════════════════════════════════════════\n");

  const allUrls = getAllSiteUrls()
    .sort((a, b) => b.priority - a.priority)
    .map((u) => u.url);

  const urlsToSubmit = allUrls.slice(0, 200);

  console.log(`📊 Total site URLs: ${allUrls.length}`);
  console.log(`📌 Submitting: ${urlsToSubmit.length} high-priority URLs`);
  console.log(`🔑 Service Account: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.slice(0, 40)}...`);

  console.log("\n🚀 Submitting to Google Indexing API...\n");

  const result = await submitBatchToGoogle(urlsToSubmit);

  console.log("📈 Results:");
  console.log(`   ✅ Successful: ${result.success}`);
  console.log(`   ❌ Failed: ${result.errors}`);
  console.log(`   ⏭️  Skipped: ${result.skipped}`);
  console.log(`   ⏰ Duration: ${result.duration}ms`);
  console.log(`   📅 Quota remaining: ${result.quotaRemaining}/200`);

  if (result.results && result.results.length > 0) {
    console.log("\n📋 First 5 submissions:");
    for (let i = 0; i < Math.min(5, result.results.length); i++) {
      const r = result.results[i];
      const status = r.status === "success" ? "✅" : r.status === "skipped" ? "⏭️" : "❌";
      console.log(`   ${status} ${r.url.slice(0, 50)}... → ${r.message.slice(0, 50)}`);
    }
  }

  console.log("\n═══════════════════════════════════════════════════════════════");
  console.log("✅ Submission complete!");
  console.log("═══════════════════════════════════════════════════════════════");
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});

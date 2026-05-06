import * as fs from "fs";
import * as path from "path";

// Load environment variables from .env.local (production vars)
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
    // Fix the newline issue
    value = value.replace(/\\n/g, "\n").replace(/\n"$/, "").trim();
    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}

console.log("🔧 Testing Google Indexing directly...");
console.log("API Key:", process.env.REINDEX_API_KEY?.slice(0, 20) + "...");
console.log("Service Account:", process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.slice(0, 40) + "...");

// Test direct API call
const testUrl = "https://friendsfactorycafe.com/";
console.log(`\n📤 Submitting test URL: ${testUrl}`);

fetch("https://friendsfactorycafe.com/api/reindex", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.REINDEX_API_KEY}`,
  },
  body: JSON.stringify({ urls: [testUrl] }),
})
  .then((r) => r.json())
  .then((data) => {
    console.log("\n✅ Response received:");
    console.log(JSON.stringify(data, null, 2));
  })
  .catch((err) => {
    console.error("❌ Error:", err.message);
  });

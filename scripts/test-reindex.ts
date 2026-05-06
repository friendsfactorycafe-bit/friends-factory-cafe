import * as fs from "fs";
import * as path from "path";

// Load environment variables from .env.local
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...valueParts] = trimmed.split("=");
    let value = valueParts.join("=").trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}

const apiKey = process.env.REINDEX_API_KEY;
console.log("🔑 API Key loaded:", !!apiKey);
if (apiKey) {
  console.log("   Length:", apiKey.length);
  console.log("   First 10 chars:", apiKey.slice(0, 10));
}

const testUrls = [
  "https://friendsfactorycafe.com/",
  "https://friendsfactorycafe.com/book-now",
];

console.log("\n📤 Sending request to /api/reindex...");

fetch("http://localhost:3000/api/reindex", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({ urls: testUrls }),
})
  .then((response) => {
    console.log("📨 Response status:", response.status);
    return response.json();
  })
  .then((data) => {
    console.log("📊 Response data:");
    console.log(JSON.stringify(data, null, 2));
  })
  .catch((error) => {
    console.error("❌ Error:", error.message);
  });

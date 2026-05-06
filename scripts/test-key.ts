import * as fs from "fs";
import * as path from "path";

// Load environment variables from .env.local (improved parser)
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  let currentKey = "";
  let currentValue = "";
  let inQuotes = false;
  let quoteChar = "";

  for (const line of envContent.split("\n")) {
    // If we're in a multiline value (quoted string), keep appending
    if (inQuotes) {
      currentValue += "\n" + line;
      if (line.includes(quoteChar) && !line.endsWith("\\")) {
        // End of quoted value
        inQuotes = false;
        currentValue = currentValue.slice(1, -1); // Remove quotes
        // Replace literal \n with actual newlines
        currentValue = currentValue.replace(/\\n/g, "\n");
        if (currentKey && !process.env[currentKey]) {
          process.env[currentKey] = currentValue;
        }
        currentKey = "";
        currentValue = "";
      }
      continue;
    }

    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;

    currentKey = trimmed.slice(0, eqIndex);
    let value = trimmed.slice(eqIndex + 1).trim();

    // Check if value is quoted
    if ((value.startsWith('"') && !value.endsWith('"')) || value.endsWith("\\")) {
      // Start of multiline quoted value
      inQuotes = true;
      quoteChar = value.charAt(0);
      currentValue = value;
      continue;
    }

    // Single line value
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    // Replace literal \n with actual newlines for single-line values too
    value = value.replace(/\\n/g, "\n");

    if (currentKey && !process.env[currentKey]) {
      process.env[currentKey] = value;
    }
  }
}

const privateKey = process.env.GOOGLE_PRIVATE_KEY;
console.log("🔑 GOOGLE_PRIVATE_KEY loaded:", !!privateKey);
if (privateKey) {
  console.log("   Length:", privateKey.length);
  console.log("   Starts with:", privateKey.slice(0, 50));
  console.log("   Contains \\n:", privateKey.includes("\\n"));
  console.log("   Contains actual newlines:", privateKey.includes("\n"));
  console.log("   Newline count:", (privateKey.match(/\n/g) || []).length);
  console.log("   First 5 lines:");
  const lines = privateKey.split("\n");
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    console.log(`     [${i}]: ${lines[i]}`);
  }
}

/**
 * Google Indexing API Integration
 * 
 * Sends URLs to Google for fast indexing when pages are created/updated.
 * 
 * Setup Requirements:
 * 1. Create a Google Cloud project
 * 2. Enable the "Web Search Indexing API"
 * 3. Create a service account and download the JSON key
 * 4. Add the service account email as an owner in Google Search Console
 * 5. Set environment variables (see below)
 * 
 * Environment Variables:
 * - GOOGLE_INDEXING_CLIENT_EMAIL: Service account email
 * - GOOGLE_INDEXING_PRIVATE_KEY: Service account private key (PEM format)
 * 
 * Usage:
 * - POST /api/indexing/submit    → Submit single URL
 * - POST /api/indexing/batch     → Submit multiple URLs
 * - POST /api/indexing/all       → Submit all site URLs
 */

import { getAllSiteUrls } from "@/lib/seo-url-registry";

const GOOGLE_INDEXING_API = "https://indexing.googleapis.com/v3/urlNotifications:publish";
const GOOGLE_BATCH_API = "https://indexing.googleapis.com/batch";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

interface IndexingResult {
  url: string;
  status: "success" | "error";
  message?: string;
}

/**
 * Get OAuth2 access token using service account credentials
 */
async function getAccessToken(): Promise<string> {
  const clientEmail = process.env.GOOGLE_INDEXING_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_INDEXING_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error(
      "Missing GOOGLE_INDEXING_CLIENT_EMAIL or GOOGLE_INDEXING_PRIVATE_KEY environment variables"
    );
  }

  // Create JWT
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signatureInput = `${encodedHeader}.${encodedPayload}`;

  // Sign with crypto
  const crypto = await import("crypto");
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(signatureInput);
  const signature = sign.sign(privateKey, "base64url");

  const jwt = `${signatureInput}.${signature}`;

  // Exchange JWT for access token
  const tokenResponse = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    throw new Error(`Failed to get access token: ${errorText}`);
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

/**
 * Submit a single URL to Google Indexing API
 */
export async function submitUrlToGoogle(
  url: string,
  type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED"
): Promise<IndexingResult> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(GOOGLE_INDEXING_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        url: url,
        type: type,
      }),
    });

    if (response.ok) {
      return { url, status: "success", message: "URL submitted successfully" };
    } else {
      const errorText = await response.text();
      return { url, status: "error", message: errorText };
    }
  } catch (error) {
    return {
      url,
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Submit multiple URLs using batch API (max 100 per batch)
 */
export async function submitBatchToGoogle(
  urls: string[],
  type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED"
): Promise<IndexingResult[]> {
  const results: IndexingResult[] = [];
  const BATCH_SIZE = 100;

  try {
    const accessToken = await getAccessToken();

    // Process in batches of 100
    for (let i = 0; i < urls.length; i += BATCH_SIZE) {
      const batch = urls.slice(i, i + BATCH_SIZE);
      const boundary = `batch_${Date.now()}_${i}`;

      // Build multipart request body
      const parts = batch.map(
        (url, index) => `--${boundary}
Content-Type: application/http
Content-ID: <item${index + i}>

POST /v3/urlNotifications:publish HTTP/1.1
Content-Type: application/json

${JSON.stringify({ url, type })}`
      );

      const body = `${parts.join("\n")}\n--${boundary}--`;

      const response = await fetch(GOOGLE_BATCH_API, {
        method: "POST",
        headers: {
          "Content-Type": `multipart/mixed; boundary=${boundary}`,
          Authorization: `Bearer ${accessToken}`,
        },
        body,
      });

      if (response.ok) {
        batch.forEach((url) => {
          results.push({ url, status: "success", message: "Batch submitted" });
        });
      } else {
        const errorText = await response.text();
        batch.forEach((url) => {
          results.push({ url, status: "error", message: errorText });
        });
      }

      // Rate limit: wait 1 second between batches
      if (i + BATCH_SIZE < urls.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    urls.forEach((url) => {
      if (!results.find((r) => r.url === url)) {
        results.push({ url, status: "error", message: errorMessage });
      }
    });
  }

  return results;
}

/**
 * Submit all site URLs to Google Indexing API
 */
export async function submitAllUrlsToGoogle(): Promise<{
  total: number;
  success: number;
  errors: number;
  results: IndexingResult[];
}> {
  const allUrls = getAllSiteUrls();
  const urls = allUrls.map((u) => u.url);
  const results = await submitBatchToGoogle(urls);

  return {
    total: urls.length,
    success: results.filter((r) => r.status === "success").length,
    errors: results.filter((r) => r.status === "error").length,
    results,
  };
}

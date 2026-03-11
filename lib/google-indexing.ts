// ============================================================================
// Google Indexing API Integration
// Requires: GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY env vars
// Usage: Call notifyGoogleIndexing(url) when new pages are created
// ============================================================================

import { SEO_CONFIG } from "@/lib/seo-config";
import { getAllSiteUrls } from "@/lib/seo-url-registry";

interface IndexingResponse {
  success: boolean;
  url: string;
  message: string;
  status?: "success" | "error";
}

async function getAccessToken(): Promise<string> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !privateKey) {
    throw new Error(
      "Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY environment variables"
    );
  }

  // Create JWT for Google OAuth2
  const header = Buffer.from(
    JSON.stringify({ alg: "RS256", typ: "JWT" })
  ).toString("base64url");

  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(
    JSON.stringify({
      iss: email,
      scope: "https://www.googleapis.com/auth/indexing",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    })
  ).toString("base64url");

  // Sign with private key using Web Crypto
  const crypto = await import("crypto");
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(`${header}.${payload}`);
  const signature = sign.sign(privateKey, "base64url");

  const jwt = `${header}.${payload}.${signature}`;

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const tokenData = await tokenResponse.json();

  if (!tokenData.access_token) {
    throw new Error("Failed to get access token from Google");
  }

  return tokenData.access_token;
}

export async function notifyGoogleIndexing(
  url: string,
  type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED"
): Promise<IndexingResponse> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(
      "https://indexing.googleapis.com/v3/urlNotifications:publish",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ url, type }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      return { success: true, url, message: "Successfully submitted to Google Indexing API", status: "success" };
    } else {
      return { success: false, url, message: data.error?.message || "Unknown error", status: "error" };
    }
  } catch (error) {
    return {
      success: false,
      url,
      message: error instanceof Error ? error.message : "Unknown error",
      status: "error",
    };
  }
}

export async function batchNotifyGoogleIndexing(
  urls: string[]
): Promise<IndexingResponse[]> {
  const results: IndexingResponse[] = [];
  // Process in batches of 10 to avoid rate limits
  const batchSize = 10;
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map((url) => notifyGoogleIndexing(url))
    );
    results.push(...batchResults);
    // Small delay between batches
    if (i + batchSize < urls.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return results;
}

// ============================================================================
// Aliases used by /api/indexing/* routes
// ============================================================================

/** Submit a single URL (used by /api/indexing/submit) */
export async function submitUrlToGoogle(
  url: string,
  type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED"
): Promise<IndexingResponse> {
  return notifyGoogleIndexing(url, type);
}

/** Submit a batch of URLs (used by /api/indexing/batch) */
export async function submitBatchToGoogle(
  urls: string[],
  type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED"
): Promise<IndexingResponse[]> {
  const results: IndexingResponse[] = [];
  const batchSize = 10;

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map((url) => notifyGoogleIndexing(url, type))
    );
    results.push(...batchResults);
    if (i + batchSize < urls.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return results;
}

/** Submit ALL site URLs from the registry (used by /api/indexing/all) */
export async function submitAllUrlsToGoogle(): Promise<{
  total: number;
  success: number;
  errors: number;
  results: IndexingResponse[];
}> {
  const allUrls = getAllSiteUrls().map((u) => u.url);
  const results = await submitBatchToGoogle(allUrls);

  return {
    total: results.length,
    success: results.filter((r) => r.success).length,
    errors: results.filter((r) => !r.success).length,
    results,
  };
}

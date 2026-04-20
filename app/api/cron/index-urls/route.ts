/**
 * Vercel Cron Job: Auto-submit URLs to Google Indexing API + IndexNow
 * Runs daily at 6:00 AM IST (00:30 UTC)
 * Submits up to 200 URLs/day to Google, all URLs to IndexNow
 */

import { NextRequest, NextResponse } from "next/server";
import { submitAllUrlsToGoogle, getQuota } from "@/lib/google-indexing";
import { submitToIndexNow } from "@/lib/indexnow";
import { getAllSiteUrls } from "@/lib/seo-url-registry";

export const maxDuration = 60; // Allow up to 60s for batch processing

export async function GET(request: NextRequest) {
  // Verify Vercel cron secret (Vercel sets this header automatically)
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const quota = getQuota();

    const results: Record<string, unknown> = {
      timestamp: new Date().toISOString(),
      quotaBefore: quota,
    };

    // 1. Google Indexing API (up to 200/day)
    if (quota.remaining > 0) {
      const googleResult = await submitAllUrlsToGoogle();
      results.google = {
        submitted: googleResult.submitted,
        success: googleResult.success,
        errors: googleResult.errors,
        skipped: googleResult.skipped,
        duration: googleResult.duration,
      };
    } else {
      results.google = { skipped: true, reason: "Daily quota exhausted" };
    }

    // 2. IndexNow (Bing + Yandex, no daily limit)
    try {
      const allUrls = getAllSiteUrls().map((u) => u.url);
      const indexNowResult = await submitToIndexNow(allUrls);
      results.indexNow = indexNowResult;
    } catch (err) {
      results.indexNow = { error: err instanceof Error ? err.message : "Failed" };
    }

    results.quotaAfter = getQuota();

    return NextResponse.json({ success: true, ...results });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Cron job failed" },
      { status: 500 }
    );
  }
}

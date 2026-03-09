/**
 * API Route: Submit ALL site URLs to Google Indexing API
 * POST /api/indexing/all
 * No body required - submits all URLs from the site registry
 */

import { NextRequest, NextResponse } from "next/server";
import { submitAllUrlsToGoogle } from "@/lib/google-indexing";

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");
  if (apiKey !== process.env.INDEXING_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await submitAllUrlsToGoogle();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * API Route: View Google Indexing API submission logs
 * GET /api/indexing/logs?date=YYYY-MM-DD&status=error
 * Requires: x-api-key header matching INDEXING_API_KEY
 *
 * Returns logs for a specific date and optionally filter by status (success/error/skipped)
 */

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  // Verify API key for security
  const apiKey = request.headers.get("x-api-key");
  if (apiKey !== process.env.INDEXING_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get("date"); // YYYY-MM-DD format, optional
    const status = searchParams.get("status"); // success, error, skipped, optional
    const limit = Math.min(parseInt(searchParams.get("limit") || "100"), 1000); // Max 1000 results

    const client = createAdminClient();
    let query = client.from("google_indexing_log").select("*");

    // Filter by date (batch_day) if provided
    if (date) {
      const baseDateMs = new Date("2026-04-25T00:00:00Z").getTime();
      const requestedDateMs = new Date(date + "T00:00:00Z").getTime();
      const batchDay = Math.floor((requestedDateMs - baseDateMs) / 86_400_000);
      query = query.eq("batch_day", batchDay);
    }

    // Filter by status if provided
    if (status && ["success", "error", "skipped"].includes(status)) {
      query = query.eq("status", status);
    }

    // Order by submitted_at descending, limit results
    query = query.order("submitted_at", { ascending: false }).limit(limit);

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: `Failed to fetch logs: ${error.message}` },
        { status: 500 }
      );
    }

    // Calculate summary stats
    const totalCount = data?.length || 0;
    const successCount = data?.filter((r) => r.status === "success").length || 0;
    const errorCount = data?.filter((r) => r.status === "error").length || 0;
    const skippedCount = data?.filter((r) => r.status === "skipped").length || 0;

    // Extract unique error messages
    const errorMessages = new Map<string, number>();
    data?.forEach((log) => {
      if (log.status === "error" && log.error_message) {
        errorMessages.set(
          log.error_message,
          (errorMessages.get(log.error_message) || 0) + 1
        );
      }
    });

    return NextResponse.json({
      success: true,
      date,
      status: status || "all",
      stats: {
        total: totalCount,
        success: successCount,
        error: errorCount,
        skipped: skippedCount,
      },
      errorSummary: Object.fromEntries(errorMessages),
      logs: data,
      returned: Math.min(totalCount, limit),
      limited: totalCount > limit,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

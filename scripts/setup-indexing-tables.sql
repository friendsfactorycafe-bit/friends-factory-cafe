/**
 * Migration: Add Google Indexing API logging & quota tracking
 * Run this in your Supabase SQL editor to create the required tables
 * Tables: google_indexing_quota, google_indexing_log
 */

-- ============================================================================
-- TABLE: google_indexing_quota
-- Tracks daily quota usage persistently across server restarts
-- ============================================================================
CREATE TABLE IF NOT EXISTS google_indexing_quota (
  date TEXT PRIMARY KEY,
  used_count INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for efficient lookups
CREATE INDEX IF NOT EXISTS idx_google_indexing_quota_date ON google_indexing_quota(date);

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_google_indexing_quota_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_google_indexing_quota_updated_at
BEFORE UPDATE ON google_indexing_quota
FOR EACH ROW
EXECUTE FUNCTION update_google_indexing_quota_updated_at();

-- ============================================================================
-- TABLE: google_indexing_log
-- Logs every URL submission to Google Indexing API
-- Used for debugging failed submissions and tracking progress
-- ============================================================================
CREATE TABLE IF NOT EXISTS google_indexing_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('success', 'error', 'skipped')),
  http_status INT,
  error_message TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  batch_day INT,
  retry_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_google_indexing_log_status ON google_indexing_log(status);
CREATE INDEX IF NOT EXISTS idx_google_indexing_log_url ON google_indexing_log(url);
CREATE INDEX IF NOT EXISTS idx_google_indexing_log_batch_day ON google_indexing_log(batch_day);
CREATE INDEX IF NOT EXISTS idx_google_indexing_log_submitted_at ON google_indexing_log(submitted_at);
CREATE INDEX IF NOT EXISTS idx_google_indexing_log_status_submitted ON google_indexing_log(status, submitted_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE google_indexing_quota ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_indexing_log ENABLE ROW LEVEL SECURITY;

-- No public access (all access via service role key in API routes)
CREATE POLICY "No public access to quota" ON google_indexing_quota
  AS RESTRICTIVE FOR ALL TO PUBLIC USING (FALSE);

CREATE POLICY "No public access to logs" ON google_indexing_log
  AS RESTRICTIVE FOR ALL TO PUBLIC USING (FALSE);

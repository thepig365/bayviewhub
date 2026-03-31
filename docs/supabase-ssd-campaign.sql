-- =============================================================================
-- Bayview Hub — SSD campaign telemetry (portable DDL)
-- =============================================================================
-- Purpose: anonymous first-party events + alert deduplication (service role only).
--
-- Temporary topology: this file may be run inside the SAME Supabase project as
-- gallery.bayviewhub.me for launch efficiency. Objects are namespaced (ssd_*)
-- and must NOT be merged into gallery application tables.
--
-- Future split: create a dedicated Supabase project for bayviewhub.me, then
-- RUN THIS FILE AGAIN there and point Vercel SUPABASE_* env at the new project
-- (optionally export/import rows from the old project). No code change required
-- for table names if you keep this schema as-is.
-- Companion portable DDL: docs/supabase-feasibility.sql (feasibility_leads).
-- If this table already existed with fewer columns, run:
--   docs/supabase-ssd-campaign-align-columns.sql
--
-- Review RLS: typically no anonymous access; Next.js API uses the secret key.
-- =============================================================================

create table if not exists public.ssd_campaign_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_name text not null,
  path text not null,
  referrer_host text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  link_target text,
  link_category text,
  zone text,
  scroll_depth text,
  share_channel text,
  visible_seconds int,
  session_id text
);

create index if not exists ssd_campaign_events_created_at_idx
  on public.ssd_campaign_events (created_at desc);

create index if not exists ssd_campaign_events_name_path_created_idx
  on public.ssd_campaign_events (event_name, path, created_at desc);

create table if not exists public.ssd_campaign_alert_dedup (
  alert_key text primary key,
  sent_at timestamptz not null default now(),
  meta jsonb
);

comment on table public.ssd_campaign_events is 'Bayview SSD hub anonymous engagement (no PII). Populated by /api/ssd-campaign/event. Portable: safe to recreate in a dedicated Supabase project when splitting from gallery.';

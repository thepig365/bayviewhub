-- =============================================================================
-- Bayview Hub — SSD feasibility leads (portable DDL)
-- =============================================================================
-- Purpose: persist submissions from POST /api/feasibility on bayviewhub.me
-- (Backyard Small Second Home / SSD funnel). Contains optional PII (email,
-- phone); service role / server only — same access pattern as SSD telemetry.
--
-- Boundary: this is main-site SSD funnel data, NOT gallery.bayviewhub.me
-- core schema. It may live in the same Supabase project as gallery temporarily
-- (shared-now, split-later); do not merge into gallery application tables.
--
-- Future split: in a dedicated Supabase project for the main site, run this
-- file after docs/supabase-ssd-campaign.sql (order does not matter). Point
-- Vercel SUPABASE_URL + SUPABASE_SECRET_KEY at the new project. Optionally
-- export/import rows from the old feasibility_leads table.
--
-- Table name is intentionally unchanged (feasibility_leads) to match the app.
-- Review RLS: typically no anonymous access; Next.js API uses the secret key.
-- =============================================================================

create table if not exists public.feasibility_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  suburb_or_address text not null,
  lot_size text,
  slope text,
  access text,
  intention text,
  budget_range text,
  ready_in_6_months text,
  email text,
  phone text,
  page text,
  user_agent text
);

create index if not exists feasibility_leads_created_at_idx
  on public.feasibility_leads (created_at desc);

comment on table public.feasibility_leads is 'Bayview main-site SSD feasibility form leads (POST /api/feasibility). Portable: recreate in a dedicated Supabase project when splitting from gallery; not gallery core data.';

-- If feasibility_leads already exists in a long-lived shared project, compare
-- columns/types to this file before split; CREATE TABLE IF NOT EXISTS does not
-- alter an existing table.

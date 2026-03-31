-- =============================================================================
-- Bayview Hub — align pre-existing ssd_campaign_events with current app
-- =============================================================================
-- Use when public.ssd_campaign_events ALREADY EXISTED before you ran
-- docs/supabase-ssd-campaign.sql. In that case CREATE TABLE IF NOT EXISTS does
-- nothing, and inserts from /api/ssd-campaign/event can fail (unknown column,
-- NOT NULL without default, etc.).
--
-- Safe to run multiple times (IF NOT EXISTS). Does not drop data.
-- After this, re-test POST /api/ssd-campaign/event (expect stored: true).
-- =============================================================================

alter table public.ssd_campaign_events
  add column if not exists referrer_host text;

alter table public.ssd_campaign_events
  add column if not exists utm_source text;

alter table public.ssd_campaign_events
  add column if not exists utm_medium text;

alter table public.ssd_campaign_events
  add column if not exists utm_campaign text;

alter table public.ssd_campaign_events
  add column if not exists link_target text;

alter table public.ssd_campaign_events
  add column if not exists link_category text;

alter table public.ssd_campaign_events
  add column if not exists zone text;

alter table public.ssd_campaign_events
  add column if not exists scroll_depth text;

alter table public.ssd_campaign_events
  add column if not exists share_channel text;

alter table public.ssd_campaign_events
  add column if not exists visible_seconds int;

alter table public.ssd_campaign_events
  add column if not exists session_id text;

-- Indexes from portable DDL (harmless if already present)
create index if not exists ssd_campaign_events_created_at_idx
  on public.ssd_campaign_events (created_at desc);

create index if not exists ssd_campaign_events_name_path_created_idx
  on public.ssd_campaign_events (event_name, path, created_at desc);

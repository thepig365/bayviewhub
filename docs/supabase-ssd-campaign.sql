-- SSD campaign: anonymous first-party events + alert deduplication (service role / server only).
-- Run in Supabase SQL editor after reviewing RLS (typically no public access; API uses secret key).

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

comment on table public.ssd_campaign_events is 'Bayview SSD hub anonymous engagement (no PII). Populated by /api/ssd-campaign/event.';

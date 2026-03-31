-- =============================================================================
-- Bayview Hub — Newsletter subscriptions + campaign send logs (portable DDL)
-- =============================================================================
-- Purpose:
--   - persist newsletter subscribers from POST /api/newsletter
--   - log newsletter test sends + bulk sends from /private/newsletter
--   - support unsubscribe / opt-out via subscriber status
--
-- Safety:
--   - additive only; no DROP / destructive statements
--   - if newsletter_subscriptions already exists, compare before altering
--   - service-role / server API only (no anonymous client writes)
-- =============================================================================

create table if not exists public.newsletter_subscriptions (
  email text primary key,
  created_at timestamptz not null default now(),
  interests text[] not null default '{}',
  source_page text,
  user_agent text,
  status text not null default 'subscribed'
    check (status in ('subscribed', 'unsubscribed', 'active'))
);

create index if not exists newsletter_subscriptions_created_at_idx
  on public.newsletter_subscriptions (created_at desc);

create index if not exists newsletter_subscriptions_status_idx
  on public.newsletter_subscriptions (status);

comment on table public.newsletter_subscriptions is
  'Bayview Hub newsletter subscribers from POST /api/newsletter. `active` is a legacy status kept for backward compatibility; new code writes `subscribed` / `unsubscribed`.';

create table if not exists public.newsletter_campaigns (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  sent_at timestamptz,
  subject text not null,
  preview_text text,
  intro_text text,
  html_body text not null,
  plain_text text,
  send_kind text not null check (send_kind in ('test', 'send_all')),
  status text not null default 'draft'
    check (status in ('draft', 'sent', 'partial', 'failed')),
  target_count integer not null default 0,
  sent_count integer not null default 0,
  failed_count integer not null default 0,
  from_identity text,
  reply_to text,
  test_recipient text
);

create index if not exists newsletter_campaigns_created_at_idx
  on public.newsletter_campaigns (created_at desc);

comment on table public.newsletter_campaigns is
  'Newsletter compose/send log for the private newsletter admin tool.';

create table if not exists public.newsletter_deliveries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  campaign_id uuid not null references public.newsletter_campaigns(id) on delete cascade,
  recipient_email text not null,
  is_test boolean not null default false,
  status text not null check (status in ('sent', 'failed')),
  error_message text,
  sent_at timestamptz
);

create index if not exists newsletter_deliveries_campaign_idx
  on public.newsletter_deliveries (campaign_id);

create index if not exists newsletter_deliveries_recipient_idx
  on public.newsletter_deliveries (recipient_email);

comment on table public.newsletter_deliveries is
  'Per-recipient send result log for newsletter campaigns.';

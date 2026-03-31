-- =============================================================================
-- Bayview Hub — Gallery + Edible Gardens EOI leads (portable DDL)
-- =============================================================================
-- Run in the same Supabase project as feasibility / SSD (shared-now, split-later).
-- Service role / server API only.
-- =============================================================================

create table if not exists public.gallery_eoi_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  linkedin text,
  background text not null,
  vision text not null,
  partnership_preference text,
  availability text,
  source text not null default 'gallery-founding-partner'
);

create index if not exists gallery_eoi_leads_created_at_idx
  on public.gallery_eoi_leads (created_at desc);

comment on table public.gallery_eoi_leads is 'Gallery founding-partner EOI from POST /api/eoi-gallery.';

create table if not exists public.edible_gardens_eoi_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null,
  name text not null,
  email text not null,
  phone text,
  message text not null,
  applicant_type text,
  pilot_start text,
  has_run_programs_before text,
  program_experience text,
  availability text,
  family_size text,
  page text,
  utm jsonb
);

create index if not exists edible_gardens_eoi_leads_created_at_idx
  on public.edible_gardens_eoi_leads (created_at desc);

comment on table public.edible_gardens_eoi_leads is 'Edible Gardens EOI / waitlist from POST /api/eoi-edible-gardens.';

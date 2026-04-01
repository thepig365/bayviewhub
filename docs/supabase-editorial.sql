-- =============================================================================
-- Bayview Hub — Editorial / Journal system (portable DDL)
-- =============================================================================
-- Purpose:
--   - store Journal entries for public /journal and /journal/[slug]
--   - support private editorial create / edit / publish workflow
--   - keep the model minimal, additive, and production-usable
--
-- Safety:
--   - additive only; no DROP / destructive statements
--   - server-only writes via Vercel route handlers using service-role / secret key
-- =============================================================================

create table if not exists public.editorial_entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  slug text not null unique,
  title text not null,
  summary text not null,
  body_markdown text not null,
  editorial_type text not null
    check (editorial_type in ('essay', 'field_note', 'profile', 'invitation', 'project_brief', 'dispatch')),
  status text not null default 'draft'
    check (status in ('draft', 'published')),
  published_at timestamptz,
  hero_image text,
  primary_cta_label text,
  primary_cta_href text,
  seo_title text,
  seo_description text,
  tags text[] not null default '{}',
  byline text,
  pinned boolean not null default false
);

create index if not exists editorial_entries_status_published_at_idx
  on public.editorial_entries (status, published_at desc);

create index if not exists editorial_entries_type_published_at_idx
  on public.editorial_entries (editorial_type, published_at desc);

create index if not exists editorial_entries_updated_at_idx
  on public.editorial_entries (updated_at desc);

create index if not exists editorial_entries_pinned_idx
  on public.editorial_entries (pinned desc, published_at desc);

comment on table public.editorial_entries is
  'Bayview Hub Journal / editorial entries for essays, field notes, profiles, invitations, project briefs, and dispatches.';

grant usage on schema public to service_role;
grant select, insert, update, delete on table public.editorial_entries to service_role;

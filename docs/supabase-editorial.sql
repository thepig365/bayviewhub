-- =============================================================================
-- Bayview Hub — Mendpress editorial system with audio support (portable DDL)
-- =============================================================================
-- Purpose:
--   - store Mendpress editorial entries for public /mendpress and /mendpress/[slug]
--   - support private editorial create / edit / publish workflow
--   - support written, audio-first, and hybrid pieces in one model
--
-- Safety:
--   - additive / forward-safe statements only
--   - no destructive data deletion
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
  editorial_type text not null,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  hero_image text,
  primary_cta_label text,
  primary_cta_href text,
  seo_title text,
  title_zh text,
  summary_zh text,
  body_markdown_zh text,
  seo_title_zh text,
  seo_description text,
  seo_description_zh text,
  tags text[] not null default '{}',
  byline text,
  pinned boolean not null default false,
  audio_url text,
  audio_duration_seconds integer,
  transcript_markdown text,
  transcript_markdown_zh text,
  show_notes_markdown text,
  show_notes_markdown_zh text,
  speakers text[] not null default '{}'
);

alter table public.editorial_entries
  add column if not exists audio_url text;

alter table public.editorial_entries
  add column if not exists audio_duration_seconds integer;

alter table public.editorial_entries
  add column if not exists title_zh text;

alter table public.editorial_entries
  add column if not exists summary_zh text;

alter table public.editorial_entries
  add column if not exists body_markdown_zh text;

alter table public.editorial_entries
  add column if not exists seo_title_zh text;

alter table public.editorial_entries
  add column if not exists seo_description_zh text;

alter table public.editorial_entries
  add column if not exists transcript_markdown text;

alter table public.editorial_entries
  add column if not exists transcript_markdown_zh text;

alter table public.editorial_entries
  add column if not exists show_notes_markdown text;

alter table public.editorial_entries
  add column if not exists show_notes_markdown_zh text;

alter table public.editorial_entries
  add column if not exists speakers text[] not null default '{}';

alter table public.editorial_entries
  drop constraint if exists editorial_entries_editorial_type_check;

alter table public.editorial_entries
  add constraint editorial_entries_editorial_type_check check (
    editorial_type in (
      'editorial',
      'essay',
      'audio_essay',
      'conversation',
      'interview',
      'profile',
      'podcast_episode',
      'visual_essay',
      'photo_story',
      'artwork_reading',
      'programme_note',
      'invitation',
      'report',
      'event_notice',
      -- Legacy aliases kept temporarily so older rows remain readable during transition.
      'field_note',
      'project_brief',
      'dispatch'
    )
  );

alter table public.editorial_entries
  drop constraint if exists editorial_entries_status_check;

alter table public.editorial_entries
  add constraint editorial_entries_status_check check (status in ('draft', 'published', 'archived'));

create index if not exists editorial_entries_status_published_at_idx
  on public.editorial_entries (status, published_at desc);

create index if not exists editorial_entries_type_published_at_idx
  on public.editorial_entries (editorial_type, published_at desc);

create index if not exists editorial_entries_updated_at_idx
  on public.editorial_entries (updated_at desc);

create index if not exists editorial_entries_pinned_idx
  on public.editorial_entries (pinned desc, published_at desc);

create index if not exists editorial_entries_audio_url_idx
  on public.editorial_entries (audio_url)
  where audio_url is not null;

comment on table public.editorial_entries is
  'Mendpress editorial entries for written, audio-first, and hybrid publishing at Bayview Hub.';

create table if not exists public.editorial_audit_log (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  entry_id uuid not null,
  slug text not null,
  action_type text not null check (
    action_type in ('create', 'update', 'publish', 'unpublish', 'archive', 'unarchive')
  ),
  changed_fields text[] not null default '{}',
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists editorial_audit_log_entry_created_idx
  on public.editorial_audit_log (entry_id, created_at desc);

create index if not exists editorial_audit_log_slug_created_idx
  on public.editorial_audit_log (slug, created_at desc);

grant usage on schema public to service_role;
grant select, insert, update on table public.editorial_entries to service_role;
grant select, insert on table public.editorial_audit_log to service_role;

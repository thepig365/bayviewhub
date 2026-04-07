-- Bayview Share Engine / Distribution Console MVP
-- Creates the internal share_actions log table used by /private/distribution

create extension if not exists pgcrypto;

create table if not exists public.share_actions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  url text not null,
  canonical_url text not null,
  hostname text not null,
  pathname text not null,
  page_type text not null,
  page_locale text not null,
  platform text not null,
  share_mode text not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  share_text_variant text,
  metadata_snapshot jsonb not null default '{}'::jsonb
);

create index if not exists share_actions_created_at_idx on public.share_actions (created_at desc);
create index if not exists share_actions_page_type_idx on public.share_actions (page_type);
create index if not exists share_actions_platform_idx on public.share_actions (platform);
create index if not exists share_actions_hostname_pathname_idx on public.share_actions (hostname, pathname);

grant insert on table public.share_actions to service_role;

alter table public.share_actions enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'share_actions'
      and policyname = 'service_role_manage_share_actions'
  ) then
    create policy service_role_manage_share_actions
      on public.share_actions
      for all
      to service_role
      using (true)
      with check (true);
  end if;
end $$;

-- Bayview Share Engine / Distribution Console Phase 2
-- Adds share_action_results plus read/write grants required for history and result capture.

create extension if not exists pgcrypto;

grant select on table public.share_actions to service_role;

create table if not exists public.share_action_results (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  share_action_id uuid not null references public.share_actions(id) on delete cascade,
  platform text not null,
  status text not null check (status in ('drafted', 'posted', 'cancelled')),
  external_post_url text,
  external_post_notes text,
  manual_metrics jsonb not null default '{}'::jsonb,
  last_checked_at timestamptz
);

create unique index if not exists share_action_results_share_action_id_uidx on public.share_action_results (share_action_id);
create index if not exists share_action_results_created_at_idx on public.share_action_results (created_at desc);
create index if not exists share_action_results_platform_idx on public.share_action_results (platform);
create index if not exists share_action_results_status_idx on public.share_action_results (status);

grant select, insert, update on table public.share_action_results to service_role;

alter table public.share_action_results enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'share_action_results'
      and policyname = 'service_role_manage_share_action_results'
  ) then
    create policy service_role_manage_share_action_results
      on public.share_action_results
      for all
      to service_role
      using (true)
      with check (true);
  end if;
end $$;

-- Design Lab — public upvotes & leaderboard
-- Run this once in your Supabase project: Dashboard → SQL Editor → New query → Run.
-- Requires: anon key from Settings → API (paste into js/supabase-config.js).

-- 1. Votes table: one row per (item, device). device_id is a client-generated
--    UUID stored in localStorage — one vote per browser per specimen.
create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  item_id text not null,
  creator_id text not null,
  device_id text not null,
  created_at timestamptz not null default now(),
  unique (item_id, device_id)
);

-- 2. Row-level security: anyone may read (leaderboard needs counts), anyone
--    may insert (that is the vote), but only the owning device may delete.
alter table public.votes enable row level security;

drop policy if exists "votes_public_read" on public.votes;
create policy "votes_public_read" on public.votes
  for select to anon
  using (true);

drop policy if exists "votes_public_insert" on public.votes;
create policy "votes_public_insert" on public.votes
  for insert to anon
  with check (true);

drop policy if exists "votes_owner_delete" on public.votes;
create policy "votes_owner_delete" on public.votes
  for delete to anon
  using (
    device_id = coalesce(
      nullif(current_setting('request.headers', true)::json->>'x-device-id', ''),
      ''
    )
  );

-- 3. Precomputed counts view the client queries for totals + leaderboard.
create or replace view public.vote_counts as
  select item_id, count(*)::int as votes
  from public.votes
  group by item_id;

-- 4. Grants (Supabase usually grants these by default; explicit is safe).
grant select, insert, delete on public.votes to anon;
grant select on public.vote_counts to anon;

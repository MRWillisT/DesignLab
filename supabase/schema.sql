-- Design Lab — public upvotes & leaderboard (v2: per-user identity)
-- Run this once in your Supabase project: Dashboard → SQL Editor → New query → Run.
-- Replaces the v1 device-id schema; the table is empty so nothing is lost.
-- Requires: Authentication → Sign In / Up → "Allow anonymous sign-ins" ON (default).

-- 1. Votes table keyed by the visitor's anonymous user id (auth.uid()).
drop view if exists public.vote_counts;
drop table if exists public.votes;

create table public.votes (
  id uuid primary key default gen_random_uuid(),
  item_id text not null,
  creator_id text not null,
  user_id uuid not null default auth.uid(),
  created_at timestamptz not null default now(),
  unique (item_id, user_id)
);

alter table public.votes enable row level security;

-- 2. RLS: visitors may read/delete only their own votes. Insert always stamps
--    auth.uid() into user_id, so a forged body can't claim someone else's row.
drop policy if exists "votes_read_own" on public.votes;
create policy "votes_read_own" on public.votes
  for select to anon, authenticated
  using (auth.uid() = user_id);

drop policy if exists "votes_insert_own" on public.votes;
create policy "votes_insert_own" on public.votes
  for insert to anon, authenticated
  with check (auth.uid() = user_id);

drop policy if exists "votes_delete_own" on public.votes;
create policy "votes_delete_own" on public.votes
  for delete to anon, authenticated
  using (auth.uid() = user_id);

-- 3. Server-enforced daily cap: at most 25 votes per user per rolling 24h.
--    The trigger runs as the table owner so it counts every row regardless
--    of RLS — clearing localStorage cannot bypass this.
create or replace function public.votes_daily_cap()
returns trigger language plpgsql as $$
begin
  if (select count(*) from public.votes
      where user_id = new.user_id
        and created_at > now() - interval '24 hours') >= 25 then
    raise exception 'Daily vote limit reached (25 votes per 24h)';
  end if;
  return new;
end;
$$;

drop trigger if exists votes_daily_cap_trg on public.votes;
create trigger votes_daily_cap_trg
before insert on public.votes
for each row execute function public.votes_daily_cap();

-- 4. Counts view for totals + leaderboard. Runs as the owner (postgres) so it
--    aggregates every row even though RLS hides individual votes from readers.
create or replace view public.vote_counts
with (security_invoker = off) as
  select item_id, count(*)::int as votes
  from public.votes
  group by item_id;

-- 5. Grants (explicit is safe even though Supabase defaults usually cover this).
grant select, insert, delete on public.votes to anon, authenticated;
grant select on public.vote_counts to anon, authenticated;

-- 6. v2.1 additive views (run this section over an existing install — nothing
--    is dropped, seeded votes survive). Weekly board + daily sparkline data.
create or replace view public.vote_counts_week
with (security_invoker = off) as
  select item_id, count(*)::int as votes
  from public.votes
  where created_at > now() - interval '7 days'
  group by item_id;

grant select on public.vote_counts_week to anon, authenticated;

create or replace view public.vote_history
with (security_invoker = off) as
  select item_id, (created_at at time zone 'utc')::date as day, count(*)::int as votes
  from public.votes
  group by item_id, (created_at at time zone 'utc')::date;

grant select on public.vote_history to anon, authenticated;

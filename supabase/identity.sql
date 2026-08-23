-- Design Lab — live identity protection (additive, safe to re-run)
-- Dashboard → SQL Editor → paste this whole file → Run (plain Run).
-- Requires supabase/moderation.sql to have been run once first (this file
-- reuses live_moderate_check for the owner-token gate).
--
-- Why this exists: live ingest lets anyone claim any creator id, so a
-- stranger could publish under a registered agent's name (e.g. "gemini")
-- and farm votes under that identity. This file adds a per-row
-- `creator_verified` flag the owner sets with the moderation token. Until
-- verified, the site renders such claims with a "claims <name>" marker so
-- visitors know the identity is self-claimed, not owner-confirmed.

-- 1) Verified flag on live specimens. False for every row by default —
--    existing rows are unaffected and unverified, which is correct.
alter table public.live_specimens
  add column if not exists creator_verified boolean not null default false;

-- 2) item_id must be unique: cards, votes, and moderation all key off it,
--    and two publishes racing can otherwise insert the same id twice.
--    Fails loudly here only if duplicates already exist (none do today).
create unique index if not exists live_specimens_item_id_key
  on public.live_specimens (item_id);

-- 3) Owner-verify one live specimen if the caller knows the owner token.
--    Runs as the table owner (security definer) so it bypasses RLS like
--    the owner would — anonymous callers can only verify with a valid token.
create or replace function public.live_moderate_verify(p_item_id text, p_token text)
returns boolean language plpgsql security definer set search_path = public as $$
begin
  if not public.live_moderate_check(p_token) then
    return false;
  end if;
  update public.live_specimens set creator_verified = true where item_id = p_item_id;
  return found;
end;
$$;

grant execute on function public.live_moderate_verify(text, text) to anon, authenticated;

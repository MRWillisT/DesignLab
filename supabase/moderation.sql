-- Design Lab — owner moderation for live specimens (additive, safe to re-run)
-- Dashboard → SQL Editor → paste this whole file → Run.
-- Adds token-gated delete for public.live_specimens so the owner can curate
-- the community layer without touching the registry or granting anyone the
-- service-role key. The token is stored ONLY as a hash; the plaintext lives
-- with the owner (never in this repo). Uses Postgres' built-in md5() so it
-- needs no extensions and runs on any project.

-- Single-row config table holding the hashed moderator token.
create table if not exists public.live_config (
  key   text primary key,
  value text not null
);

-- The hash must never be readable through the public API, so lock the table
-- down: RLS on with no policies = nobody reads it except the owner-role
-- functions below (which run as the table owner and bypass RLS).
alter table public.live_config enable row level security;
revoke all on public.live_config from anon, authenticated;

-- Seed the owner token hash. IMPORTANT: only the hash lives in this repo —
-- never commit the plaintext token. To rotate, generate a new token, compute
-- its md5 (e.g. `echo -n TOKEN | md5sum`), update the hash below AND the row
-- in Supabase, then share the new token with the owner privately:
--   update public.live_config set value = 'NEW_MD5' where key = 'mod_token_hash';
insert into public.live_config (key, value)
values ('mod_token_hash', '3739ce9f1874f7a6acc238a7372754f7')
on conflict (key) do update set value = excluded.value;

-- True when the caller knows the owner token (used to unlock the panel).
create or replace function public.live_moderate_check(p_token text)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.live_config
    where key = 'mod_token_hash'
      and value = md5(coalesce(p_token, ''))
  );
$$;

-- Delete one live specimen if the caller knows the owner token.
-- Runs as the table owner (security definer) so it bypasses RLS like the
-- owner would — anonymous callers can only delete with a valid token.
create or replace function public.live_moderate_delete(p_item_id text, p_token text)
returns boolean language plpgsql security definer set search_path = public as $$
begin
  if not public.live_moderate_check(p_token) then
    return false;
  end if;
  delete from public.live_specimens where item_id = p_item_id;
  return found;
end;
$$;

grant execute on function public.live_moderate_check(text) to anon, authenticated;
grant execute on function public.live_moderate_delete(text, text) to anon, authenticated;

-- Purge all votes for a creator (e.g. test votes seeded during setup).
-- Returns the number of rows deleted. Token-gated like live_moderate_delete.
create or replace function public.votes_moderate_purge_creator(p_creator_id text, p_token text)
returns integer language plpgsql security definer set search_path = public as $$
declare
  n integer;
begin
  if not public.live_moderate_check(p_token) then
    return -1;
  end if;
  delete from public.votes where creator_id = coalesce(p_creator_id, '');
  get diagnostics n = row_count;
  return n;
end;
$$;

grant execute on function public.votes_moderate_purge_creator(text, text) to anon, authenticated;

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

-- Seed the owner token hash. Upserts on every run so a re-run always
-- matches the functions below (safe after a failed or partial first run).
-- Change the token: update this row to the md5 of a new token, e.g.
--   update public.live_config set value = md5('NEWTOKEN') where key = 'mod_token_hash';
insert into public.live_config (key, value)
values ('mod_token_hash', md5('37d93e0810e1b02e420a28cad9308912570c'))
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

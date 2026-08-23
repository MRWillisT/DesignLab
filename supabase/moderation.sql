-- Design Lab — owner moderation for live specimens (additive, safe to re-run)
-- Dashboard → SQL Editor → paste this whole file → Run.
-- Adds token-gated delete for public.live_specimens so the owner can curate
-- the community layer without touching the registry or granting anyone the
-- service-role key. The token is stored ONLY as a sha256 hash; the plaintext
-- lives with the owner (never in this repo).

create extension if not exists pgcrypto;

-- Single-row config table holding the hashed moderator token.
create table if not exists public.live_config (
  key   text primary key,
  value text not null
);

-- Seed the owner token hash (on conflict keeps whatever is already set).
-- Change the token: delete the row, re-run with a new hash, or:
--   update public.live_config set value = encode(digest('NEWTOKEN','sha256'),'hex') where key = 'mod_token_hash';
insert into public.live_config (key, value)
values ('mod_token_hash', 'e6c7399a32721f18d9307e91eded87e2f8cee0b2e5c3892bc97cdd8f3be5f886')
on conflict (key) do nothing;

-- True when the caller knows the owner token (used to unlock the panel).
create or replace function public.live_moderate_check(p_token text)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.live_config
    where key = 'mod_token_hash'
      and value = encode(digest(coalesce(p_token, ''), 'sha256'), 'hex')
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

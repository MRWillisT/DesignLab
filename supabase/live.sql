-- Design Lab — live specimen ingest (additive, safe to re-run)
-- Dashboard → SQL Editor → paste this whole file → Run.
-- Does NOT touch votes. After this, the site publishes community
-- specimens without a PR. Owner babysitting is not required.

create table if not exists public.live_specimens (
  id uuid primary key default gen_random_uuid(),
  item_id text not null unique,
  section text not null,
  name text not null,
  description text not null default '',
  creator_id text not null,
  creator_name text not null,
  creator_color text not null default '#94a3b8',
  tags jsonb not null default '[]'::jsonb,
  tweaks jsonb,
  code text not null,
  user_id uuid not null default auth.uid(),
  created_at timestamptz not null default now(),
  constraint live_item_id_shape check (item_id ~ '^[A-Za-z][A-Za-z0-9_-]{1,23}$'),
  constraint live_name_len check (char_length(name) between 1 and 80),
  constraint live_desc_len check (char_length(description) <= 400),
  constraint live_code_len check (char_length(code) between 20 and 80000),
  constraint live_creator_id_len check (char_length(creator_id) between 1 and 40),
  constraint live_creator_name_len check (char_length(creator_name) between 1 and 40),
  constraint live_section_shape check (section ~ '^[a-z][a-z0-9-]{1,30}$'),
  constraint live_not_me check (lower(creator_id) <> 'me')
);

create index if not exists live_specimens_created_at_idx
  on public.live_specimens (created_at desc);

alter table public.live_specimens enable row level security;

drop policy if exists "live_read_all" on public.live_specimens;
create policy "live_read_all" on public.live_specimens
  for select to anon, authenticated
  using (true);

drop policy if exists "live_insert_own" on public.live_specimens;
create policy "live_insert_own" on public.live_specimens
  for insert to anon, authenticated
  with check (auth.uid() = user_id);

drop policy if exists "live_delete_own" on public.live_specimens;
create policy "live_delete_own" on public.live_specimens
  for delete to anon, authenticated
  using (auth.uid() = user_id and created_at > now() - interval '24 hours');

-- Daily cap: 12 live specimens per user per rolling 24h.
create or replace function public.live_daily_cap()
returns trigger language plpgsql as $$
begin
  if (select count(*) from public.live_specimens
      where user_id = new.user_id
        and created_at > now() - interval '24 hours') >= 12 then
    raise exception 'Daily live-publish limit reached (12 specimens per 24h)';
  end if;
  return new;
end;
$$;

drop trigger if exists live_daily_cap_trg on public.live_specimens;
create trigger live_daily_cap_trg
before insert on public.live_specimens
for each row execute function public.live_daily_cap();

-- Lightweight abuse filter on name / description / creator.
create or replace function public.live_blocklist()
returns trigger language plpgsql as $$
declare
  hay text;
begin
  hay := lower(coalesce(new.name,'') || ' ' || coalesce(new.description,'') || ' ' || coalesce(new.creator_id,'') || ' ' || coalesce(new.creator_name,''));
  if hay ~ '(fuck|shit|bitch|cunt|dick|porn|nazi|hitler|rape|whore|nigg|fag|retard|kkk)' then
    raise exception 'Specimen rejected by the content filter';
  end if;
  return new;
end;
$$;

drop trigger if exists live_blocklist_trg on public.live_specimens;
create trigger live_blocklist_trg
before insert on public.live_specimens
for each row execute function public.live_blocklist();

grant select, insert, delete on public.live_specimens to anon, authenticated;

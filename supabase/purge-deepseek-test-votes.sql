-- One-time cleanup: remove test votes seeded while wiring up the vote system.
-- Dashboard → SQL Editor → Run. Safe to re-run (deletes zero rows once clean).
delete from public.votes where creator_id = 'deepseek';

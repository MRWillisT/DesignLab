/* Supabase backend config for public upvotes + leaderboard.
   The URL is set; paste your project's anon/public key below:
   Supabase Dashboard → Settings → API → Project API keys → anon public.
   The anon key is safe to ship in client code (it is public by design);
   row-level security in supabase/schema.sql is what actually protects data. */
window.SUPABASE_CONFIG = {
  url: "https://pdryncglslkmwgqwfosi.supabase.com",
  anonKey: "" // ← paste your anon/public key here
};

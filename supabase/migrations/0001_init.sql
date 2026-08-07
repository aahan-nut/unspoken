-- Unspoken — Supabase foundation + real saved-resource functionality
-- Run this once in the Supabase SQL Editor (or via `supabase db push`).
-- Safe to re-run: every statement is idempotent (IF NOT EXISTS / OR REPLACE / ON CONFLICT).

create extension if not exists pgcrypto;

-- =========================================================================
-- resources — public directory of support resources
-- =========================================================================

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  resource_type text not null,
  website_url text,
  phone_number text,
  city text,
  state text,
  virtual_available boolean not null default false,
  cost_category text not null,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.resources enable row level security;

-- Public read access to the resource directory. No insert/update/delete
-- policy is defined for anon/authenticated, so normal users cannot edit it —
-- only the service_role key (which bypasses RLS) can write to this table.
drop policy if exists "Public can read resources" on public.resources;
create policy "Public can read resources"
  on public.resources
  for select
  to anon, authenticated
  using (true);

-- =========================================================================
-- saved_resources — a user's private saved list, status, and notes
-- =========================================================================

create table if not exists public.saved_resources (
  id uuid primary key default gen_random_uuid(),
  -- Defaulting to auth.uid() means the client never needs to (and cannot)
  -- supply another user's id — Postgres fills it in from the request's JWT.
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  resource_id uuid not null references public.resources(id) on delete cascade,
  status text not null default 'saved'
    check (status in ('saved', 'planning', 'contacted', 'appointment', 'not-a-fit')),
  private_notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, resource_id) -- duplicate-save prevention at the DB level
);

create index if not exists saved_resources_user_id_idx on public.saved_resources(user_id);
create index if not exists saved_resources_resource_id_idx on public.saved_resources(resource_id);

alter table public.saved_resources enable row level security;

drop policy if exists "Users can view own saved resources" on public.saved_resources;
create policy "Users can view own saved resources"
  on public.saved_resources
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own saved resources" on public.saved_resources;
create policy "Users can insert own saved resources"
  on public.saved_resources
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own saved resources" on public.saved_resources;
create policy "Users can update own saved resources"
  on public.saved_resources
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own saved resources" on public.saved_resources;
create policy "Users can delete own saved resources"
  on public.saved_resources
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- Keep updated_at current on every row modification.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_saved_resources_updated_at on public.saved_resources;
create trigger set_saved_resources_updated_at
  before update on public.saved_resources
  for each row
  execute function public.set_updated_at();

-- =========================================================================
-- Seed data — mirrors src/data/mockResources.ts (same fixed UUIDs, so the
-- frontend's mock resource ids resolve to real rows for the FK to work).
-- =========================================================================

insert into public.resources
  (id, name, description, resource_type, website_url, phone_number, city, state, virtual_available, cost_category, verified_at)
values
  ('0f7b13c0-e102-479a-9977-463fe6ffb163', '988 Suicide & Crisis Lifeline',
   'Free, confidential support for people in distress, prevention and crisis resources.',
   'hotline', null, '988', null, null, true, 'free', '2026-06-01'),

  ('74ee6718-b16d-45f7-b871-4a918a5b6d90', 'Crisis Text Line',
   'Text with a trained crisis counselor. Available anytime you need someone to talk to.',
   'chat', 'https://www.crisistextline.org', '741741', null, null, true, 'free', '2026-06-01'),

  ('26028540-1bee-4fc2-883a-e061997eca3a', 'Teen Line',
   'Peer support for teens, by teens. Talk to someone who understands what you''re going through.',
   'hotline', 'https://teenlineonline.org', '310-855-4673', 'Los Angeles', 'CA', true, 'free', '2026-05-12'),

  ('b236de3c-ab1a-407f-9742-0251a87b7544', 'NAMI HelpLine',
   'Information, resource referrals, and support for individuals and families affected by mental health conditions.',
   'website', 'https://www.nami.org', '800-950-6264', null, null, true, 'free', '2026-04-20'),

  ('14545f97-3c20-4c1b-bb36-a5b275dd0723', 'BetterHelp',
   'Online counseling platform connecting you with licensed therapists via messaging, phone, or video.',
   'app', 'https://www.betterhelp.com', null, null, null, true, 'paid', '2026-05-30'),

  ('b1632736-4422-42d4-bdb8-bb99aace40de', 'Headspace',
   'Guided meditation and mindfulness exercises designed to help manage stress and improve sleep.',
   'app', 'https://www.headspace.com', null, null, null, true, 'low-cost', '2026-03-15'),

  ('b5db274e-57c3-4163-bb4c-24505e75ad08', '7 Cups',
   'Free emotional support through trained listeners. Connect anonymously anytime.',
   'chat', 'https://www.7cups.com', null, null, null, true, 'free', '2026-06-10'),

  ('696dd5c0-7914-40c5-81d3-b1c48bca6074', 'School Counselor',
   'Your school''s counseling office can provide support, referrals, and a safe space to talk.',
   'local', null, null, 'Austin', 'TX', false, 'free', '2026-02-01'),

  ('62b4200b-19d9-49a5-a1e5-eabd8551b000', 'Bright Path Counseling Center',
   'Community counseling center offering individual and family therapy on a sliding-scale fee, with evening appointments for students.',
   'local', 'https://example.org/bright-path-counseling', '512-555-0142', 'Austin', 'TX', true, 'sliding-scale', '2026-06-18'),

  ('f3042a83-62c2-4897-821c-95a6aed20885', 'Riverside Community Health Clinic',
   'Community health clinic with on-site behavioral health providers and same-week appointments for new patients.',
   'local', 'https://example.org/riverside-clinic', '512-555-0198', 'Austin', 'TX', false, 'sliding-scale', '2026-05-22'),

  ('c1dd05c1-e4bf-4cc3-9744-20a862fe747e', 'Teen Wellness Circle',
   'Drop-in peer support group for teens, facilitated by a youth counselor. No appointment or diagnosis needed to attend.',
   'local', 'https://example.org/teen-wellness-circle', null, 'Austin', 'TX', false, 'free', '2026-06-05')
on conflict (id) do nothing;

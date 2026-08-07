-- Unspoken — extend saved_resources to support saving live Google Places
-- results alongside the existing curated resources.
-- Run this once in the Supabase SQL Editor (after 0001_init.sql has been
-- applied), or via `supabase db push`. Safe to re-run.

-- A saved row is now either:
--   - an internal curated resource (resource_id set, source = 'internal'), or
--   - a live Google Places result (external_place_id set, source = 'google_places')
-- Only the fields needed to redisplay the listing are stored for external
-- saves — no full Places payload, no coordinates.

alter table public.saved_resources
  alter column resource_id drop not null;

alter table public.saved_resources
  add column if not exists source text not null default 'internal'
    check (source in ('internal', 'google_places'));

alter table public.saved_resources
  add column if not exists external_place_id text;

alter table public.saved_resources
  add column if not exists external_name text;

alter table public.saved_resources
  add column if not exists external_address text;

alter table public.saved_resources
  add column if not exists external_resource_type text;

alter table public.saved_resources
  add column if not exists external_maps_url text;

-- Exactly one of (internal resource_id) or (external_place_id) must be set,
-- matching the row's declared source.
alter table public.saved_resources drop constraint if exists saved_resources_source_shape;
alter table public.saved_resources add constraint saved_resources_source_shape
  check (
    (source = 'internal' and resource_id is not null and external_place_id is null)
    or
    (source = 'google_places' and resource_id is null and external_place_id is not null)
  );

-- Duplicate-save prevention for external Google Places saves (the existing
-- `unique (user_id, resource_id)` constraint from 0001 already covers
-- internal saves; Postgres treats NULL resource_id values as distinct, so it
-- doesn't conflict with external rows).
create unique index if not exists saved_resources_user_external_place_idx
  on public.saved_resources (user_id, external_place_id)
  where source = 'google_places';

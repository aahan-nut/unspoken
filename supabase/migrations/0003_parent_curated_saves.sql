-- Unspoken — allow saving curated Parent Support resources (autism/ADHD)
-- through the same saved_resources table used for Google Places saves.
-- Run this once in the Supabase SQL Editor (after 0001 and 0002 have been
-- applied), or via `supabase db push`. Safe to re-run.

-- Parent-curated saves reuse the existing external_* columns added in
-- 0002_external_saved_resources.sql — external_place_id stores the
-- ParentResource.id (a stable slug from data/parentSupport/resources.ts,
-- looked back up against that file when rendering /saved), the same
-- pattern already used for Google Place IDs. No new columns are needed —
-- only the allowed `source` values change.

alter table public.saved_resources drop constraint if exists saved_resources_source_check;
alter table public.saved_resources add constraint saved_resources_source_check
  check (source in ('internal', 'google_places', 'parent_curated'));

alter table public.saved_resources drop constraint if exists saved_resources_source_shape;
alter table public.saved_resources add constraint saved_resources_source_shape
  check (
    (source = 'internal' and resource_id is not null and external_place_id is null)
    or
    (source in ('google_places', 'parent_curated') and resource_id is null and external_place_id is not null)
  );

-- Replace the google_places-only duplicate-save index with one that covers
-- both external sources, scoped by (user_id, source, external_place_id) so
-- a Google Place ID and a ParentResource id can never collide even if their
-- string values happened to match.
drop index if exists saved_resources_user_external_place_idx;
create unique index if not exists saved_resources_user_source_external_place_idx
  on public.saved_resources (user_id, source, external_place_id)
  where source in ('google_places', 'parent_curated');

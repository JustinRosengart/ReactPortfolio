-- ==============================================================
-- Portfolio Language Migration Script (Option A: JSONB)
-- ==============================================================
-- Execute this script in your Supabase SQL Editor to convert 
-- your existing text columns to multi-language JSONB objects.
-- 
-- Example result: "My Title" becomes {"en": "My Title", "de": "My Title"}
-- ==============================================================

-- 1. Migrate personal_info
ALTER TABLE public.personal_info
  ALTER COLUMN title_short TYPE JSONB USING jsonb_build_object('en', title_short, 'de', title_short),
  ALTER COLUMN title_long TYPE JSONB USING jsonb_build_object('en', title_long, 'de', title_long),
  ALTER COLUMN tagline TYPE JSONB USING jsonb_build_object('en', tagline, 'de', tagline),
  ALTER COLUMN description TYPE JSONB USING jsonb_build_object('en', description, 'de', description),
  ALTER COLUMN about TYPE JSONB USING jsonb_build_object('en', about, 'de', about),
  ALTER COLUMN top_skills DROP DEFAULT,
  ALTER COLUMN top_skills TYPE JSONB USING jsonb_build_object('en', to_jsonb(top_skills), 'de', to_jsonb(top_skills)),
  ALTER COLUMN top_skills SET DEFAULT '{"en": [], "de": []}'::jsonb;

-- 2. Migrate projects
ALTER TABLE public.projects
  ALTER COLUMN title TYPE JSONB USING jsonb_build_object('en', title, 'de', title),
  ALTER COLUMN description TYPE JSONB USING jsonb_build_object('en', description, 'de', description),
  ALTER COLUMN additional_info TYPE JSONB USING jsonb_build_object('en', additional_info, 'de', additional_info),
  ALTER COLUMN features DROP DEFAULT,
  ALTER COLUMN features TYPE JSONB USING jsonb_build_object('en', to_jsonb(features), 'de', to_jsonb(features)),
  ALTER COLUMN features SET DEFAULT '{"en": [], "de": []}'::jsonb,
  ALTER COLUMN technologies DROP DEFAULT,
  ALTER COLUMN technologies TYPE JSONB USING jsonb_build_object('en', to_jsonb(technologies), 'de', to_jsonb(technologies)),
  ALTER COLUMN technologies SET DEFAULT '{"en": [], "de": []}'::jsonb;

-- 3. Migrate experiences
ALTER TABLE public.experiences
  ALTER COLUMN title TYPE JSONB USING jsonb_build_object('en', title, 'de', title),
  ALTER COLUMN company TYPE JSONB USING jsonb_build_object('en', company, 'de', company),
  ALTER COLUMN location TYPE JSONB USING jsonb_build_object('en', location, 'de', location),
  ALTER COLUMN type TYPE JSONB USING jsonb_build_object('en', type, 'de', type),
  ALTER COLUMN duration TYPE JSONB USING jsonb_build_object('en', duration, 'de', duration),
  ALTER COLUMN description TYPE JSONB USING jsonb_build_object('en', description, 'de', description),
  ALTER COLUMN skills DROP DEFAULT,
  ALTER COLUMN skills TYPE JSONB USING jsonb_build_object('en', to_jsonb(skills), 'de', to_jsonb(skills)),
  ALTER COLUMN skills SET DEFAULT '{"en": [], "de": []}'::jsonb;

-- 4. Migrate educations
ALTER TABLE public.educations
  ALTER COLUMN institution TYPE JSONB USING jsonb_build_object('en', institution, 'de', institution),
  ALTER COLUMN degree TYPE JSONB USING jsonb_build_object('en', degree, 'de', degree),
  ALTER COLUMN field TYPE JSONB USING jsonb_build_object('en', field, 'de', field),
  ALTER COLUMN grade TYPE JSONB USING jsonb_build_object('en', grade, 'de', grade),
  ALTER COLUMN description TYPE JSONB USING jsonb_build_object('en', description, 'de', description),
  ALTER COLUMN skills DROP DEFAULT,
  ALTER COLUMN skills TYPE JSONB USING jsonb_build_object('en', to_jsonb(skills), 'de', to_jsonb(skills)),
  ALTER COLUMN skills SET DEFAULT '{"en": [], "de": []}'::jsonb;

-- 5. Migrate certifications
ALTER TABLE public.certifications
  ALTER COLUMN name TYPE JSONB USING jsonb_build_object('en', name, 'de', name),
  ALTER COLUMN issuer TYPE JSONB USING jsonb_build_object('en', issuer, 'de', issuer),
  ALTER COLUMN description TYPE JSONB USING jsonb_build_object('en', description, 'de', description);

-- 6. Migrate skills
ALTER TABLE public.skills
  ALTER COLUMN title TYPE JSONB USING jsonb_build_object('en', title, 'de', title),
  ALTER COLUMN description TYPE JSONB USING jsonb_build_object('en', description, 'de', description);

-- 7. Migrate gallery_categories
ALTER TABLE public.gallery_categories
  ALTER COLUMN name TYPE JSONB USING jsonb_build_object('en', name, 'de', name),
  ALTER COLUMN description TYPE JSONB USING jsonb_build_object('en', description, 'de', description);

-- 8. Migrate gallery_images
ALTER TABLE public.gallery_images
  ALTER COLUMN title TYPE JSONB USING jsonb_build_object('en', title, 'de', title),
  ALTER COLUMN description TYPE JSONB USING jsonb_build_object('en', description, 'de', description),
  ALTER COLUMN tags DROP DEFAULT,
  ALTER COLUMN tags TYPE JSONB USING jsonb_build_object('en', to_jsonb(tags), 'de', to_jsonb(tags)),
  ALTER COLUMN tags SET DEFAULT '{"en": [], "de": []}'::jsonb;

-- Note: The website_config table already uses JSONB for configuration values like 'pageContent'. 
-- You do not need to alter the table structure. Instead, you update the JSON values via the Supabase Dashboard
-- so that they look like: {"en": { ... English config ... }, "de": { ... German config ... }}

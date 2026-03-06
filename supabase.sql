-- Supabase Database Initialization Script for Portfolio
-- Execute this script in your Supabase SQL Editor

-- ==========================================
-- 1. Enable UUID Extension
-- ==========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 2. Create Tables
-- ==========================================

-- Table: personal_info (Single row expected)
CREATE TABLE IF NOT EXISTS public.personal_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    image TEXT,
    title_short TEXT,
    title_long TEXT,
    email TEXT,
    location TEXT,
    tagline TEXT,
    description TEXT,
    about TEXT,
    top_skills TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Table: contact_info
CREATE TABLE IF NOT EXISTS public.contact_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    location TEXT,
    social_links JSONB DEFAULT '[]'::jsonb, -- Array of {name, href, color}
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Table: projects
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    url TEXT,
    demo_url TEXT,
    repository_url TEXT,
    image TEXT,
    image_banner TEXT,
    images TEXT[] DEFAULT '{}',
    image_folder TEXT,
    additional_info TEXT,
    status TEXT CHECK (status IN ('completed', 'in-progress', 'planned', 'blocked')),
    type TEXT,
    features TEXT[] DEFAULT '{}',
    technologies TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    sort_order INTEGER DEFAULT 0
);

-- Table: experiences
CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT,
    type TEXT, -- e.g., 'On-site', 'Remote', 'Hybrid'
    start_date TEXT NOT NULL,
    end_date TEXT,
    duration TEXT,
    description TEXT,
    skills TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    sort_order INTEGER DEFAULT 0
);

-- Table: educations
CREATE TABLE IF NOT EXISTS public.educations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    field TEXT,
    start_date TEXT NOT NULL,
    end_date TEXT,
    grade TEXT,
    description TEXT,
    skills TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    sort_order INTEGER DEFAULT 0
);

-- Table: certifications
CREATE TABLE IF NOT EXISTS public.certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date TEXT,
    expiration_date TEXT,
    credential_id TEXT,
    credential_url TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    sort_order INTEGER DEFAULT 0
);

-- Table: skills
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT, -- Name of the lucide-react icon
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    sort_order INTEGER DEFAULT 0
);

-- Table: gallery_categories
CREATE TABLE IF NOT EXISTS public.gallery_categories (
    id TEXT PRIMARY KEY, -- String ID, e.g., 'tattoo', 'graphics'
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    sort_order INTEGER DEFAULT 0
);

-- Table: gallery_images
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    image_path TEXT NOT NULL,
    thumbnail_path TEXT,
    category_id TEXT REFERENCES public.gallery_categories(id) ON DELETE CASCADE,
    date TEXT,
    tags TEXT[] DEFAULT '{}',
    type TEXT DEFAULT 'image' CHECK (type IN ('image', 'video')),
    video_path TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    sort_order INTEGER DEFAULT 0
);

-- Table: website_config (For all other JSON configuration like UI labels, themes, etc.)
CREATE TABLE IF NOT EXISTS public.website_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    config_key TEXT UNIQUE NOT NULL,
    config_value JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ==========================================
-- 3. Row Level Security (RLS) Policies
-- ==========================================
-- By default, allow public read access, but restrict insert/update/delete to authenticated users.

DO $$
DECLARE
    table_name_var text;
BEGIN
    FOR table_name_var IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public' 
    LOOP
        -- Enable RLS
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', table_name_var);
        
        -- Create Select Policy (Public Read)
        EXECUTE format('
            CREATE POLICY "Allow public read access for %I" 
            ON public.%I FOR SELECT 
            USING (true);
        ', table_name_var, table_name_var);

        -- Create All/Write Policy (Authenticated users only)
        EXECUTE format('
            CREATE POLICY "Allow authenticated full access for %I" 
            ON public.%I FOR ALL 
            USING (auth.role() = ''authenticated'') 
            WITH CHECK (auth.role() = ''authenticated'');
        ', table_name_var, table_name_var);
    END LOOP;
END
$$;

-- ==========================================
-- 4. Storage Buckets Setup
-- ==========================================
-- Make sure to create these buckets in your Supabase Dashboard -> Storage

INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-images', 'portfolio-images', true);

CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'portfolio-images' );
CREATE POLICY "Auth Insert" ON storage.objects FOR INSERT WITH CHECK ( auth.role() = 'authenticated' AND bucket_id = 'portfolio-images' );
CREATE POLICY "Auth Update" ON storage.objects FOR UPDATE USING ( auth.role() = 'authenticated' AND bucket_id = 'portfolio-images' );
CREATE POLICY "Auth Delete" ON storage.objects FOR DELETE USING ( auth.role() = 'authenticated' AND bucket_id = 'portfolio-images' );

-- Note: Execute the storage creation via Dashboard or as superuser, as standard SQL editor might not have rights for storage schema.

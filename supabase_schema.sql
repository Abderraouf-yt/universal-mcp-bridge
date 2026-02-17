-- SQL Schema for Universal MCP Bridge (Supabase)
-- Execute this in the Supabase SQL Editor to initialize your backend.

-- 1. Create the registries table
CREATE TABLE IF NOT EXISTS public.registries (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    config JSONB NOT NULL DEFAULT '{"mcpServers": {}}'::jsonb,
    last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    device_id TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.registries ENABLE ROW LEVEL SECURITY;

-- 3. Create policies (Users can only see/edit their own config)
CREATE POLICY "Users can view own registry" ON public.registries
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own registry" ON public.registries
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own registry" ON public.registries
    FOR UPDATE USING (auth.uid() = user_id);

-- 4. Create profiles table for User Tiers
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    tier TEXT DEFAULT 'community' CHECK (tier IN ('community', 'pro', 'enterprise')),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

-- 6. Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, tier)
    VALUES (new.id, new.email, 'community');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

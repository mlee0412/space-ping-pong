-- Drop existing tables if they exist, for a clean slate
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS ping_pong_tables;
DROP TABLE IF EXISTS logs;

-- Create Tables
CREATE TABLE public.ping_pong_tables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'inactive' CHECK (status IN ('inactive', 'active', 'warning', 'overtime'))
);

CREATE TABLE public.sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_id UUID NOT NULL REFERENCES public.ping_pong_tables(id),
    start_time TIMESTAMPTZ NOT NULL DEFAULT now(),
    end_time TIMESTAMPTZ,
    guest_count INT NOT NULL DEFAULT 1,
    server_name TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.logs (
    id BIGSERIAL PRIMARY KEY,
    level TEXT NOT NULL DEFAULT 'info',
    message TEXT NOT NULL,
    meta JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed Data
INSERT INTO public.ping_pong_tables (name) VALUES
('P1'), ('P2'), ('P3'), ('P4'), ('P5'), ('P6'), ('P7'),
('P8'), ('P9'), ('P10'), ('P11'), ('P12'), ('P13');

-- Enable Realtime
ALTER TABLE public.ping_pong_tables REPLICA IDENTITY FULL;
ALTER TABLE public.sessions REPLICA IDENTITY FULL;

-- RLS Policies
ALTER TABLE public.ping_pong_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.ping_pong_tables FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to manage tables" ON public.ping_pong_tables FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access" ON public.sessions FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to manage sessions" ON public.sessions FOR ALL USING (auth.role() = 'authenticated');

-- This part is important for Supabase Realtime to work
-- Ensure the publication is owned by the supabase_admin role
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    CREATE PUBLICATION supabase_realtime FOR ALL TABLES;
  END IF;
END $$;

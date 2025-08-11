-- Add new columns to the ping_pong_tables table if they don't exist
ALTER TABLE public.ping_pong_tables
ADD COLUMN IF NOT EXISTS table_type TEXT NOT NULL DEFAULT 'ping_pong',
ADD COLUMN IF NOT EXISTS layout_x INT NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS layout_y INT NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS layout_w INT NOT NULL DEFAULT 1,
ADD COLUMN IF NOT EXISTS layout_h INT NOT NULL DEFAULT 1;

-- Clear existing tables to re-seed with new structure
TRUNCATE public.ping_pong_tables RESTART IDENTITY CASCADE;

-- Seed new table data with a layout inspired by the provided image
INSERT INTO public.ping_pong_tables (name, table_type, layout_x, layout_y, layout_w, layout_h) VALUES
-- Left Column Group
('P5', 'ping_pong', 0, 0, 4, 1),
('P3', 'ping_pong', 0, 1, 2, 2),
('P4', 'ping_pong', 2, 1, 2, 2),
('P2', 'ping_pong', 0, 3, 4, 1),
('P1', 'ping_pong', 0, 4, 4, 1),

-- Middle-Left Dining Group
('D8', 'dining',    4, 1, 1, 1),
('D5', 'dining',    5, 1, 1, 1),
('D7', 'dining',    4, 2, 1, 1),
('D4', 'dining',    5, 2, 1, 1),
('D6', 'dining',    4, 3, 2, 1),

-- Middle Ping Pong Group
('P9', 'ping_pong', 6, 1, 4, 1),
('P8', 'ping_pong', 6, 2, 4, 1),
('P7', 'ping_pong', 6, 3, 4, 1),
('P6', 'ping_pong', 6, 4, 4, 1),

-- Right Column Group
('P13', 'ping_pong', 10, 0, 4, 1),
('P12', 'ping_pong', 10, 1, 4, 1),
('D3', 'dining',    10, 2, 1, 1),
('D2', 'dining',    11, 2, 1, 1),
('P11', 'ping_pong', 10, 3, 4, 1),
('P10', 'ping_pong', 10, 4, 4, 1),
('D1', 'dining',    13, 2, 1, 1);

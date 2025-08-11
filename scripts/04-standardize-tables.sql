-- Standardize all table sizes
-- All ping pong tables should be the same size (4 units wide, 1 unit tall)
-- All dining tables should be the same size (1 unit wide, smallest unit)

-- Make all dining tables consistently 1x1 (smallest unit)
UPDATE public.ping_pong_tables SET 
  layout_w = 1,
  layout_h = 1
WHERE table_type = 'dining';

-- Make P3 and P4 match exact dimensions of other ping pong tables (4w x 1h)
UPDATE public.ping_pong_tables SET 
  layout_w = 4,
  layout_h = 1
WHERE table_type = 'ping_pong' AND name IN ('P3', 'P4');

-- Adjust positions to prevent overlaps after making P3 and P4 wider and shorter
-- P4 needs to move right since P3 is now wider
UPDATE public.ping_pong_tables SET 
  layout_x = 4
WHERE name = 'P4';

-- Move dining tables in middle section to accommodate wider P3/P4
UPDATE public.ping_pong_tables SET 
  layout_x = layout_x + 2
WHERE table_type = 'dining' AND layout_x >= 4 AND layout_x < 6;

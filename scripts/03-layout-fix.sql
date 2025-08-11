-- Fix dining table sizes to be consistent and reduce ping pong table widths for better mobile layout
UPDATE public.ping_pong_tables SET layout_w = 1 WHERE table_type = 'dining';

-- Update wider ping pong tables to be more mobile-friendly
-- Keep the original positions but adjust for better responsive behavior
UPDATE public.ping_pong_tables SET 
  layout_w = 3,
  layout_x = CASE 
    WHEN layout_x >= 10 THEN 8  -- Move right column tables left
    WHEN layout_x >= 6 THEN 5   -- Move middle tables left  
    ELSE layout_x               -- Keep left column as is
  END
WHERE table_type = 'ping_pong' AND layout_w = 4;

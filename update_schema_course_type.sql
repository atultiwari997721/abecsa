
-- Add 'type' column to course_applications table to distinguish between Course and Certificate applications
ALTER TABLE public.course_applications 
ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'Course';

-- Optional: Update existing records to be 'Course' type if null
UPDATE public.course_applications SET type = 'Course' WHERE type IS NULL;
Error submitting application: Could not find the 'type' column of 'course_applications' in the schema cache
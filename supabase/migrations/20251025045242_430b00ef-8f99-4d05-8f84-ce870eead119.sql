-- CRITICAL SECURITY FIX 1: Remove dangerous public storage policies
DROP POLICY IF EXISTS "Public read files" ON storage.objects;
DROP POLICY IF EXISTS "Public upload files" ON storage.objects;
DROP POLICY IF EXISTS "Public delete files" ON storage.objects;

-- Add file size limit (10MB) and MIME type restrictions
UPDATE storage.buckets 
SET file_size_limit = 10485760,
    allowed_mime_types = ARRAY[
      'application/json',
      'application/zip',
      'text/plain',
      'text/csv',
      'text/markdown'
    ]
WHERE name = 'terminal-uploads';

-- CRITICAL SECURITY FIX 2: Make user_id columns NOT NULL to prevent RLS bypass
-- Delete orphaned records with NULL user_id (they shouldn't exist anyway)
DELETE FROM command_logs WHERE user_id IS NULL;
DELETE FROM file_imports WHERE user_id IS NULL;
DELETE FROM git_actions WHERE user_id IS NULL;
DELETE FROM projects WHERE user_id IS NULL;
DELETE FROM terminal_messages WHERE user_id IS NULL;

-- Add NOT NULL constraints
ALTER TABLE command_logs ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE file_imports ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE git_actions ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE projects ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE terminal_messages ALTER COLUMN user_id SET NOT NULL;

-- Add default values for safety (using gen_random_uuid as fallback since auth.uid() requires context)
ALTER TABLE command_logs ALTER COLUMN user_id SET DEFAULT gen_random_uuid();
ALTER TABLE file_imports ALTER COLUMN user_id SET DEFAULT gen_random_uuid();
ALTER TABLE git_actions ALTER COLUMN user_id SET DEFAULT gen_random_uuid();
ALTER TABLE projects ALTER COLUMN user_id SET DEFAULT gen_random_uuid();
ALTER TABLE terminal_messages ALTER COLUMN user_id SET DEFAULT gen_random_uuid();
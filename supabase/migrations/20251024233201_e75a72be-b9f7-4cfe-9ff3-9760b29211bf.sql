-- =====================================================
-- AUTHENTICATION SECURITY MIGRATION
-- =====================================================
-- This migration updates RLS policies to require authentication
-- and prepares the database for user ownership tracking

-- =====================================================
-- 1. UPDATE PROJECTS TABLE RLS POLICIES
-- =====================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can create their own projects" ON projects;
DROP POLICY IF EXISTS "Users can view their own projects" ON projects;
DROP POLICY IF EXISTS "Users can update their own projects" ON projects;
DROP POLICY IF EXISTS "Users can delete their own projects" ON projects;

-- Create new authenticated policies
CREATE POLICY "Authenticated users can create their own projects"
ON projects FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Authenticated users can view their own projects"
ON projects FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Authenticated users can update their own projects"
ON projects FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Authenticated users can delete their own projects"
ON projects FOR DELETE
TO authenticated
USING (user_id = auth.uid());

-- =====================================================
-- 2. UPDATE COMMAND_LOGS TABLE RLS POLICIES
-- =====================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can create logs for their projects" ON command_logs;
DROP POLICY IF EXISTS "Users can view logs for their projects" ON command_logs;

-- Create new authenticated policies
CREATE POLICY "Authenticated users can create command logs"
ON command_logs FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid() AND
  (project_id IS NULL OR EXISTS (
    SELECT 1 FROM projects 
    WHERE projects.id = command_logs.project_id 
    AND projects.user_id = auth.uid()
  ))
);

CREATE POLICY "Authenticated users can view their command logs"
ON command_logs FOR SELECT
TO authenticated
USING (
  user_id = auth.uid() OR
  (project_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM projects 
    WHERE projects.id = command_logs.project_id 
    AND projects.user_id = auth.uid()
  ))
);

-- =====================================================
-- 3. UPDATE FILE_IMPORTS TABLE RLS POLICIES
-- =====================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can create their file imports" ON file_imports;
DROP POLICY IF EXISTS "Users can view their file imports" ON file_imports;
DROP POLICY IF EXISTS "Users can delete their file imports" ON file_imports;

-- Create new authenticated policies
CREATE POLICY "Authenticated users can create file imports"
ON file_imports FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Authenticated users can view their file imports"
ON file_imports FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Authenticated users can delete their file imports"
ON file_imports FOR DELETE
TO authenticated
USING (user_id = auth.uid());

-- =====================================================
-- 4. UPDATE GIT_ACTIONS TABLE RLS POLICIES
-- =====================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can create git actions for their projects" ON git_actions;
DROP POLICY IF EXISTS "Users can view their git actions" ON git_actions;

-- Create new authenticated policies
CREATE POLICY "Authenticated users can create git actions"
ON git_actions FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM projects 
    WHERE projects.id = git_actions.project_id 
    AND projects.user_id = auth.uid()
  )
);

CREATE POLICY "Authenticated users can view their git actions"
ON git_actions FOR SELECT
TO authenticated
USING (
  user_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM projects 
    WHERE projects.id = git_actions.project_id 
    AND projects.user_id = auth.uid()
  )
);

-- =====================================================
-- 5. UPDATE TERMINAL_MESSAGES TABLE RLS POLICIES
-- =====================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can create messages for their projects" ON terminal_messages;
DROP POLICY IF EXISTS "Users can view messages for their projects" ON terminal_messages;
DROP POLICY IF EXISTS "Users can delete their messages" ON terminal_messages;

-- Create new authenticated policies
CREATE POLICY "Authenticated users can create terminal messages"
ON terminal_messages FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid() AND
  (project_id IS NULL OR EXISTS (
    SELECT 1 FROM projects 
    WHERE projects.id = terminal_messages.project_id 
    AND projects.user_id = auth.uid()
  ))
);

CREATE POLICY "Authenticated users can view their terminal messages"
ON terminal_messages FOR SELECT
TO authenticated
USING (
  user_id = auth.uid() OR
  (project_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM projects 
    WHERE projects.id = terminal_messages.project_id 
    AND projects.user_id = auth.uid()
  ))
);

CREATE POLICY "Authenticated users can delete their terminal messages"
ON terminal_messages FOR DELETE
TO authenticated
USING (
  user_id = auth.uid() OR
  (project_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM projects 
    WHERE projects.id = terminal_messages.project_id 
    AND projects.user_id = auth.uid()
  ))
);

-- =====================================================
-- 6. CREATE STORAGE BUCKET RLS POLICIES
-- =====================================================

-- Allow authenticated users to upload files to their own folder
CREATE POLICY "Authenticated users can upload files to own folder"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'terminal-uploads' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to view their own files
CREATE POLICY "Authenticated users can view their own files"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'terminal-uploads' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to delete their own files
CREATE POLICY "Authenticated users can delete their own files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'terminal-uploads' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- =====================================================
-- 7. CREATE PERFORMANCE INDEXES
-- =====================================================

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_command_logs_user_id ON command_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_file_imports_user_id ON file_imports(user_id);
CREATE INDEX IF NOT EXISTS idx_git_actions_user_id ON git_actions(user_id);
CREATE INDEX IF NOT EXISTS idx_terminal_messages_user_id ON terminal_messages(user_id);

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================
-- All tables now require authentication for access
-- Storage bucket requires authentication and user-based folder structure
-- Performance indexes created for user_id lookups
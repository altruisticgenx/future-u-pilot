-- Phase 1: Add user_id columns to all tables and create profiles table
-- Step 1: Create profiles table for user data
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Step 2: Add user_id columns to existing tables
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.terminal_messages ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.command_logs ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.git_actions ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.file_imports ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Step 3: Drop old public policies
DROP POLICY IF EXISTS "Public read projects" ON public.projects;
DROP POLICY IF EXISTS "Public write projects" ON public.projects;
DROP POLICY IF EXISTS "Public read messages" ON public.terminal_messages;
DROP POLICY IF EXISTS "Public write messages" ON public.terminal_messages;
DROP POLICY IF EXISTS "Public read logs" ON public.command_logs;
DROP POLICY IF EXISTS "Public write logs" ON public.command_logs;
DROP POLICY IF EXISTS "Public read git" ON public.git_actions;
DROP POLICY IF EXISTS "Public write git" ON public.git_actions;
DROP POLICY IF EXISTS "Public read file imports" ON public.file_imports;
DROP POLICY IF EXISTS "Public write file imports" ON public.file_imports;

-- Step 4: Create user-scoped RLS policies for projects
CREATE POLICY "Users can view their own projects"
  ON public.projects FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create their own projects"
  ON public.projects FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own projects"
  ON public.projects FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own projects"
  ON public.projects FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Step 5: Create user-scoped RLS policies for terminal_messages
CREATE POLICY "Users can view messages for their projects"
  ON public.terminal_messages FOR SELECT
  TO authenticated
  USING (
    project_id IS NULL OR 
    EXISTS (SELECT 1 FROM public.projects WHERE id = terminal_messages.project_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can create messages for their projects"
  ON public.terminal_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    project_id IS NULL OR 
    EXISTS (SELECT 1 FROM public.projects WHERE id = terminal_messages.project_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can delete their messages"
  ON public.terminal_messages FOR DELETE
  TO authenticated
  USING (
    project_id IS NULL OR 
    EXISTS (SELECT 1 FROM public.projects WHERE id = terminal_messages.project_id AND user_id = auth.uid())
  );

-- Step 6: Create user-scoped RLS policies for command_logs
CREATE POLICY "Users can view logs for their projects"
  ON public.command_logs FOR SELECT
  TO authenticated
  USING (
    project_id IS NULL OR 
    EXISTS (SELECT 1 FROM public.projects WHERE id = command_logs.project_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can create logs for their projects"
  ON public.command_logs FOR INSERT
  TO authenticated
  WITH CHECK (
    project_id IS NULL OR 
    EXISTS (SELECT 1 FROM public.projects WHERE id = command_logs.project_id AND user_id = auth.uid())
  );

-- Step 7: Create user-scoped RLS policies for git_actions
CREATE POLICY "Users can view their git actions"
  ON public.git_actions FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.projects WHERE id = git_actions.project_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can create git actions for their projects"
  ON public.git_actions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.projects WHERE id = git_actions.project_id AND user_id = auth.uid())
  );

-- Step 8: Create user-scoped RLS policies for file_imports
CREATE POLICY "Users can view their file imports"
  ON public.file_imports FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create their file imports"
  ON public.file_imports FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their file imports"
  ON public.file_imports FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Step 9: Storage bucket RLS policies
CREATE POLICY "Users can view their own uploads"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'terminal-uploads' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can upload their own files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'terminal-uploads' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can update their own uploads"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'terminal-uploads' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can delete their own uploads"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'terminal-uploads' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Step 10: Create trigger for profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', '')
  );
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Step 11: Update existing data to set user_id (if any exists, it will be orphaned)
-- Note: Existing data without user_id will not be accessible after this migration
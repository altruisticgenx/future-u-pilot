-- Projects table
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  status text DEFAULT 'active',
  github_url text,
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Terminal messages (chat stream)
CREATE TABLE public.terminal_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
  message_type text NOT NULL,
  content text NOT NULL,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Command logs (execution history)
CREATE TABLE public.command_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
  command text NOT NULL,
  args jsonb,
  status text DEFAULT 'success',
  output text,
  execution_time_ms integer,
  created_at timestamptz DEFAULT now()
);

-- Git actions (simulated git commands)
CREATE TABLE public.git_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  action text NOT NULL,
  branch text DEFAULT 'main',
  message text,
  author text,
  files_changed jsonb,
  created_at timestamptz DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_projects_name ON public.projects(name);
CREATE INDEX idx_messages_project ON public.terminal_messages(project_id, created_at DESC);
CREATE INDEX idx_logs_project ON public.command_logs(project_id, created_at DESC);
CREATE INDEX idx_git_project ON public.git_actions(project_id, created_at DESC);

-- RLS Policies (public for now)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.terminal_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.command_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.git_actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public write projects" ON public.projects FOR ALL USING (true);
CREATE POLICY "Public read messages" ON public.terminal_messages FOR SELECT USING (true);
CREATE POLICY "Public write messages" ON public.terminal_messages FOR ALL USING (true);
CREATE POLICY "Public read logs" ON public.command_logs FOR SELECT USING (true);
CREATE POLICY "Public write logs" ON public.command_logs FOR ALL USING (true);
CREATE POLICY "Public read git" ON public.git_actions FOR SELECT USING (true);
CREATE POLICY "Public write git" ON public.git_actions FOR ALL USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.terminal_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.command_logs;

-- Insert sample projects for demo
INSERT INTO public.projects (name, description, status, tags) VALUES
  ('quantum-education', 'Quantum computing education platform', 'active', ARRAY['education', 'quantum', 'research']),
  ('ai-literacy', 'AI literacy training for public sector', 'active', ARRAY['education', 'ai', 'government']),
  ('fedramp-pilot', 'FedRAMP compliance automation', 'planning', ARRAY['security', 'government', 'compliance']);
-- Create storage bucket for terminal uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('terminal-uploads', 'terminal-uploads', false)
ON CONFLICT (id) DO NOTHING;

-- Create file_imports table
CREATE TABLE IF NOT EXISTS public.file_imports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  file_path text NOT NULL,
  file_size integer,
  mime_type text,
  extracted_files jsonb,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.file_imports ENABLE ROW LEVEL SECURITY;

-- Public access policies (update later when auth is added)
CREATE POLICY "Public read file imports"
  ON public.file_imports
  FOR SELECT
  USING (true);

CREATE POLICY "Public write file imports"
  ON public.file_imports
  FOR ALL
  USING (true);

-- Storage policies for terminal-uploads bucket
CREATE POLICY "Public upload files"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'terminal-uploads');

CREATE POLICY "Public read files"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'terminal-uploads');

CREATE POLICY "Public delete files"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'terminal-uploads');
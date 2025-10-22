import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

interface FilePreviewProps {
  filename: string;
  content: string;
  language?: string;
}

export const FilePreview = ({ filename, content, language }: FilePreviewProps) => {
  const detectedLanguage = language || detectLanguage(filename);

  return (
    <Card className="p-4 bg-background/50">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-mono text-muted-foreground">{filename}</span>
        <span className="text-xs text-muted-foreground">{detectedLanguage}</span>
      </div>
      <ScrollArea className="h-[400px] rounded border">
        <pre className="m-0 rounded-md text-sm leading-relaxed overflow-x-auto p-4" style={{
          backgroundColor: 'hsl(var(--terminal-surface))',
          color: 'hsl(var(--terminal-text))'
        }}>
{content}
        </pre>
      </ScrollArea>
    </Card>
  );
};

const detectLanguage = (filename: string): string => {
  const ext = filename.split('.').pop()?.toLowerCase();
  
  const languageMap: Record<string, string> = {
    js: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    jsx: 'javascript',
    json: 'json',
    yaml: 'yaml',
    yml: 'yaml',
    md: 'markdown',
    html: 'html',
    css: 'css',
    py: 'python',
    rb: 'ruby',
    go: 'go',
    rs: 'rust',
    sql: 'sql',
    sh: 'bash',
  };
  
  return languageMap[ext || ''] || 'text';
};


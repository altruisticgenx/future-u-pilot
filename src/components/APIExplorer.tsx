import { motion } from 'framer-motion';
import { Check, Copy, ExternalLink, Circle } from 'lucide-react';
import { APIEndpoint } from '@/types/quantum';
import { useState } from 'react';
import { toast } from 'sonner';

interface APIExplorerProps {
  apis: APIEndpoint[];
}

export const APIExplorer = ({ apis }: APIExplorerProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    toast.success('API URL copied to clipboard');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-primary font-mono text-sm font-bold mb-4">
        <Circle className="w-3 h-3 fill-current" />
        <span>API ENDPOINTS</span>
      </div>
      {apis.map((api, index) => (
        <motion.div
          key={api.name}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-3 bg-terminal-surface/30 rounded-lg border border-terminal-border/30 hover:border-primary/50 transition-all group"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-sm font-bold text-foreground">
                  {api.name}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono ${
                  api.status === 'online' 
                    ? 'bg-cmd-success/20 text-cmd-success' 
                    : api.status === 'offline'
                    ? 'bg-cmd-error/20 text-cmd-error'
                    : 'bg-cmd-warning/20 text-cmd-warning'
                }`}>
                  <Circle className="w-2 h-2 fill-current" />
                  {api.status}
                </span>
              </div>
              <code className="text-xs text-terminal-text/70 font-mono break-all">
                {api.url}
              </code>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => handleCopy(api.url, index)}
                className="p-2 hover:bg-primary/10 rounded transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Copy API URL"
              >
                {copiedIndex === index ? (
                  <Check className="w-4 h-4 text-cmd-success" />
                ) : (
                  <Copy className="w-4 h-4 text-terminal-text/70 group-hover:text-primary" />
                )}
              </button>
              {api.url !== '#' && (
                <a
                  href={api.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-primary/10 rounded transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Open API documentation"
                >
                  <ExternalLink className="w-4 h-4 text-terminal-text/70 group-hover:text-primary" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

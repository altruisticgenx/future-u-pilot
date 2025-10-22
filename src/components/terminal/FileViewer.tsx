import { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, FileText, FileJson, Image as ImageIcon } from 'lucide-react';
import { FileTree } from '@/lib/fileManager';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FileViewerProps {
  files: FileTree[];
  onFileSelect?: (file: FileTree) => void;
}

export const FileViewer = ({ files, onFileSelect }: FileViewerProps) => {
  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-1">
        {files.map((file) => (
          <FileTreeNode
            key={file.path}
            node={file}
            level={0}
            onFileSelect={onFileSelect}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

interface FileTreeNodeProps {
  node: FileTree;
  level: number;
  onFileSelect?: (file: FileTree) => void;
}

const FileTreeNode = ({ node, level, onFileSelect }: FileTreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(level === 0);

  const getFileIcon = () => {
    if (node.type === 'folder') {
      return isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />;
    }

    const ext = node.name.split('.').pop()?.toLowerCase();
    
    if (ext === 'json' || ext === 'yaml' || ext === 'yml') {
      return <FileJson className="w-4 h-4 text-blue-500" />;
    }
    if (['jpg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) {
      return <ImageIcon className="w-4 h-4 text-green-500" />;
    }
    if (['txt', 'md'].includes(ext || '')) {
      return <FileText className="w-4 h-4 text-yellow-500" />;
    }
    
    return <File className="w-4 h-4 text-muted-foreground" />;
  };

  const handleClick = () => {
    if (node.type === 'folder') {
      setIsExpanded(!isExpanded);
    } else {
      onFileSelect?.(node);
    }
  };

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 py-1 px-2 rounded cursor-pointer transition-colors",
          "hover:bg-accent/50",
          node.type === 'file' && "hover:bg-primary/10"
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleClick}
      >
        {getFileIcon()}
        <span className="text-sm font-mono truncate flex-1">{node.name}</span>
        {node.type === 'file' && node.size && (
          <span className="text-xs text-muted-foreground">
            {formatBytes(node.size)}
          </span>
        )}
      </div>
      
      {node.type === 'folder' && isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode
              key={child.path}
              node={child}
              level={level + 1}
              onFileSelect={onFileSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
};

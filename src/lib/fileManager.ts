import JSZip from 'jszip';
import { supabase } from '@/integrations/supabase/client';

export interface ExtractedFile {
  path: string;
  name: string;
  content: string | ArrayBuffer;
  size: number;
  type: 'text' | 'binary' | 'json' | 'image';
  isDirectory: boolean;
}

export interface FileTree {
  name: string;
  path: string;
  type: 'file' | 'folder';
  size?: number;
  children?: FileTree[];
}

export const extractZipFile = async (file: File): Promise<ExtractedFile[]> => {
  const zip = new JSZip();
  const contents = await zip.loadAsync(file);
  const extractedFiles: ExtractedFile[] = [];

  for (const [path, zipEntry] of Object.entries(contents.files)) {
    if (zipEntry.dir) {
      extractedFiles.push({
        path,
        name: path.split('/').filter(Boolean).pop() || path,
        content: '',
        size: 0,
        type: 'text',
        isDirectory: true,
      });
      continue;
    }

    const fileType = getFileType(path);
    const content = fileType === 'binary' 
      ? await zipEntry.async('arraybuffer')
      : await zipEntry.async('text');

    extractedFiles.push({
      path,
      name: path.split('/').pop() || path,
      content,
      size: content instanceof ArrayBuffer ? content.byteLength : content.length,
      type: fileType,
      isDirectory: false,
    });
  }

  return extractedFiles;
};

export const getFileType = (filename: string): ExtractedFile['type'] => {
  const ext = filename.split('.').pop()?.toLowerCase();
  
  if (['json', 'yaml', 'yml'].includes(ext || '')) return 'json';
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) return 'image';
  if (['txt', 'md', 'js', 'ts', 'tsx', 'jsx', 'css', 'html', 'xml'].includes(ext || '')) return 'text';
  
  return 'binary';
};

export const buildFileTree = (files: ExtractedFile[]): FileTree[] => {
  const tree: FileTree[] = [];
  const lookup: Record<string, FileTree> = {};

  files.forEach(file => {
    const parts = file.path.split('/').filter(Boolean);
    let currentPath = '';

    parts.forEach((part, index) => {
      const parentPath = currentPath;
      currentPath = currentPath ? `${currentPath}/${part}` : part;

      if (!lookup[currentPath]) {
        const isLast = index === parts.length - 1;
        const node: FileTree = {
          name: part,
          path: currentPath,
          type: isLast && !file.isDirectory ? 'file' : 'folder',
          size: isLast && !file.isDirectory ? file.size : undefined,
          children: [],
        };

        lookup[currentPath] = node;

        if (parentPath && lookup[parentPath]) {
          lookup[parentPath].children?.push(node);
        } else {
          tree.push(node);
        }
      }
    });
  });

  return tree;
};

export const saveImportToDatabase = async (
  filename: string,
  filePath: string,
  fileSize: number,
  mimeType: string,
  extractedFiles: ExtractedFile[]
) => {
  const { error } = await supabase.from('file_imports').insert({
    filename,
    file_path: filePath,
    file_size: fileSize,
    mime_type: mimeType,
    extracted_files: extractedFiles.map(f => ({
      path: f.path,
      name: f.name,
      size: f.size,
      type: f.type,
      isDirectory: f.isDirectory,
    })),
    metadata: {
      file_count: extractedFiles.filter(f => !f.isDirectory).length,
      total_size: extractedFiles.reduce((sum, f) => sum + f.size, 0),
    },
  });

  if (error) throw error;
};

export const parseProjectsFromJSON = (content: string): any[] => {
  try {
    const data = JSON.parse(content);
    
    // Support multiple formats
    if (Array.isArray(data)) return data;
    if (data.projects && Array.isArray(data.projects)) return data.projects;
    if (data.data && Array.isArray(data.data)) return data.data;
    
    return [data]; // Single project object
  } catch (error) {
    throw new Error('Invalid JSON format');
  }
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
};

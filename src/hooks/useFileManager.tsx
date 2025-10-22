import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  extractZipFile, 
  buildFileTree, 
  saveImportToDatabase,
  parseProjectsFromJSON,
  ExtractedFile,
  FileTree 
} from '@/lib/fileManager';
import { toast } from 'sonner';

export const useFileManager = () => {
  const [currentFiles, setCurrentFiles] = useState<ExtractedFile[]>([]);
  const [fileTree, setFileTree] = useState<FileTree[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const importFile = useCallback(async (file: File): Promise<{ success: boolean; message: string; files?: ExtractedFile[] }> => {
    setIsProcessing(true);
    
    try {
      // Upload to Supabase Storage
      const filePath = `imports/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('terminal-uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Extract zip if applicable
      let extractedFiles: ExtractedFile[] = [];
      
      if (file.name.endsWith('.zip')) {
        extractedFiles = await extractZipFile(file);
        toast.success(`Extracted ${extractedFiles.length} files from ${file.name}`);
      } else {
        // Single file import
        const content = await file.text();
        extractedFiles = [{
          path: file.name,
          name: file.name,
          content,
          size: file.size,
          type: file.name.endsWith('.json') ? 'json' : 'text',
          isDirectory: false,
        }];
      }

      // Save to database
      await saveImportToDatabase(
        file.name,
        filePath,
        file.size,
        file.type,
        extractedFiles
      );

      // Update state
      setCurrentFiles(extractedFiles);
      setFileTree(buildFileTree(extractedFiles));

      return {
        success: true,
        message: `Successfully imported ${file.name} (${extractedFiles.length} files)`,
        files: extractedFiles,
      };
    } catch (error) {
      console.error('Import error:', error);
      return {
        success: false,
        message: `Failed to import: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const getFileContent = useCallback((path: string): ExtractedFile | null => {
    return currentFiles.find(f => f.path === path) || null;
  }, [currentFiles]);

  const seedProjects = useCallback(async (jsonFile: ExtractedFile): Promise<{ success: boolean; message: string; count?: number }> => {
    try {
      if (typeof jsonFile.content !== 'string') {
        throw new Error('Invalid file content');
      }

      const projects = parseProjectsFromJSON(jsonFile.content);
      
      if (projects.length === 0) {
        return { success: false, message: 'No projects found in file' };
      }

      // Insert projects
      const { data, error } = await supabase
        .from('projects')
        .upsert(projects.map(p => ({
          name: p.name,
          description: p.description || null,
          status: p.status || 'active',
          tags: p.tags || [],
          github_url: p.github_url || null,
        })), { onConflict: 'name' })
        .select();

      if (error) throw error;

      return {
        success: true,
        message: `Seeded ${data?.length || projects.length} projects from ${jsonFile.name}`,
        count: data?.length || projects.length,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to seed projects: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }, []);

  const clearFiles = useCallback(() => {
    setCurrentFiles([]);
    setFileTree([]);
  }, []);

  return {
    currentFiles,
    fileTree,
    isProcessing,
    importFile,
    getFileContent,
    seedProjects,
    clearFiles,
  };
};

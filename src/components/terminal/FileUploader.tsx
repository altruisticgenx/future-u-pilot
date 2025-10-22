import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileArchive, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export const FileUploader = ({ onFileSelect, disabled }: FileUploaderProps) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    
    if (acceptedFiles.length === 0) {
      setError('Please select a valid file');
      return;
    }

    const file = acceptedFiles[0];
    
    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      setError('File too large. Maximum size is 50MB');
      return;
    }

    onFileSelect(file);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled,
    accept: {
      'application/zip': ['.zip'],
      'application/json': ['.json'],
      'text/plain': ['.txt', '.md'],
      'application/x-yaml': ['.yaml', '.yml'],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-6 transition-all cursor-pointer",
        "hover:border-primary/50 hover:bg-primary/5",
        isDragActive && "border-primary bg-primary/10",
        disabled && "opacity-50 cursor-not-allowed",
        error && "border-destructive"
      )}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        {isDragActive ? (
          <>
            <FileArchive className="w-8 h-8 text-primary animate-pulse" />
            <p className="text-sm text-primary font-medium">Drop file here...</p>
          </>
        ) : (
          <>
            <Upload className="w-8 h-8 text-muted-foreground" />
            <p className="text-sm text-foreground font-medium">
              Drag & drop a file, or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports .zip, .json, .yaml, .txt, .md (max 50MB)
            </p>
          </>
        )}
        
        {error && (
          <div className="flex items-center gap-2 text-destructive text-xs mt-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export type MessageType = 'user' | 'system' | 'success' | 'error' | 'info' | 'code' | 'table' | 'list' | 'loading' | 'file-tree' | 'file-preview';

export interface Message {
  id?: string;
  type: MessageType;
  content: string;
  metadata?: Record<string, any>;
  timestamp?: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  github_url: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface TerminalContext {
  currentProjectId: string | null;
  currentProject: Project | null;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => Promise<void>;
  addCommandLog: (command: string, args: any, status: string, output: string, executionTime: number) => Promise<void>;
  clearMessages: () => void;
  switchProject: (projectId: string | null) => void;
}

export interface Command {
  name: string;
  aliases: string[];
  description: string;
  usage: string;
  category: 'project' | 'git' | 'system' | 'help';
  handler: (args: string[], context: TerminalContext) => Promise<Message[]>;
}

export interface GitAction {
  id: string;
  project_id: string;
  action: string;
  branch: string;
  message: string | null;
  author: string | null;
  files_changed: Record<string, any> | null;
  created_at: string;
}

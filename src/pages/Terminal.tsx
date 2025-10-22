import { useState, useCallback, useEffect } from 'react';
import { TerminalLayout } from '@/components/terminal/TerminalLayout';
import { Sidebar } from '@/components/terminal/Sidebar';
import { MessageStream } from '@/components/terminal/MessageStream';
import { CommandInput } from '@/components/terminal/CommandInput';
import { CommandPalette } from '@/components/terminal/CommandPalette';
import { useTerminalCommands } from '@/hooks/useTerminalCommands';
import { useTerminalMessages } from '@/hooks/useTerminalMessages';
import { supabase } from '@/integrations/supabase/client';
import { Project, Message, TerminalContext } from '@/types/terminal';
import { toast } from 'sonner';

const Terminal = () => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [localMessages, setLocalMessages] = useState<Message[]>([
    {
      type: 'success',
      content: '✓ Terminal initialized',
    },
    {
      type: 'system',
      content: 'Welcome to the AltruisticXAI Project Hub',
    },
    {
      type: 'info',
      content: 'Type /help to see available commands, or press ⌘K (Ctrl+K) to open the command palette.',
    },
    {
      type: 'system',
      content: '',
    },
  ]);

  const { messages: dbMessages, loading, addMessage, clearMessages: clearDbMessages } = useTerminalMessages(currentProject?.id || null);
  const { executeCommand, commands } = useTerminalCommands();

  const allMessages = currentProject ? dbMessages : localMessages;

  const addCommandLog = useCallback(async (
    command: string,
    args: any,
    status: string,
    output: string,
    executionTime: number
  ) => {
    if (!currentProject?.id) return;

    await supabase.from('command_logs').insert({
      project_id: currentProject.id,
      command,
      args,
      status,
      output,
      execution_time_ms: executionTime,
    });
  }, [currentProject]);

  const addMessageToStream = useCallback(async (message: Omit<Message, 'id' | 'timestamp'>) => {
    if (currentProject?.id) {
      await addMessage(message);
    } else {
      setLocalMessages(prev => [...prev, { ...message, timestamp: new Date() }]);
    }
  }, [currentProject, addMessage]);

  const clearAllMessages = useCallback(() => {
    if (currentProject?.id) {
      clearDbMessages();
    } else {
      setLocalMessages([]);
    }
  }, [currentProject, clearDbMessages]);

  const switchProject = useCallback((projectId: string | null) => {
    if (projectId) {
      supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single()
        .then(({ data }) => {
          if (data) {
            setCurrentProject(data);
          }
        });
    } else {
      setCurrentProject(null);
      setLocalMessages([
        {
          type: 'system',
          content: 'Switched to global context. Type /list to see all projects.',
        },
      ]);
    }
  }, []);

  const context: TerminalContext = {
    currentProjectId: currentProject?.id || null,
    currentProject,
    addMessage: addMessageToStream,
    addCommandLog,
    clearMessages: clearAllMessages,
    switchProject,
  };

  const handleCommandSubmit = useCallback(async (input: string) => {
    await addMessageToStream({ type: 'user', content: input });

    const results = await executeCommand(input, context);
    
    for (const result of results) {
      await addMessageToStream(result);
    }
  }, [executeCommand, context, addMessageToStream]);

  const handleProjectSelect = useCallback((project: Project) => {
    switchProject(project.id);
    toast.success(`Switched to ${project.name}`);
  }, [switchProject]);

  const handleNewProject = useCallback(() => {
    const projectName = prompt('Enter project name:');
    if (projectName) {
      handleCommandSubmit(`/new ${projectName}`);
    }
  }, [handleCommandSubmit]);

  const handlePaletteCommand = useCallback((command: string) => {
    handleCommandSubmit(command);
  }, [handleCommandSubmit]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'l') {
        e.preventDefault();
        clearAllMessages();
        toast.success('Terminal cleared');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [clearAllMessages]);

  return (
    <>
      <TerminalLayout
        sidebar={
          <Sidebar
            currentProjectId={currentProject?.id || null}
            onProjectSelect={handleProjectSelect}
            onNewProject={handleNewProject}
          />
        }
      >
        <div className="flex flex-col h-full">
          <MessageStream messages={allMessages} />
          <CommandInput onSubmit={handleCommandSubmit} disabled={loading} />
        </div>
      </TerminalLayout>

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        commands={commands}
        onCommandSelect={handlePaletteCommand}
      />
    </>
  );
};

export default Terminal;

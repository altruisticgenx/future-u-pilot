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
  const WELCOME_MESSAGES = [
    '🚀 Quantum-AI Command Center  |  Type "help" to begin',
    '🤖 AI Assistant Online  |  Try "/ai" to ask anything',
    '🔬 Lab Terminal Online  |  Try "experiments" to see active research',
    '🌐 Web Scraper Ready  |  Use "/scrape <url>" to analyze any webpage',
    '🔐 Security Console  |  Type "pqc-status" for quantum-readiness',
    '📊 Analytics Dashboard  |  Use "trending" to see hot topics',
    '⚛️  Quantum Lab  |  Run "qc-status" to check qubit systems',
    '📋 Policy Center  |  Type "policy-check" for compliance status',
    '🛡️  Security Ops  |  Run "security-scan" for vulnerability check',
    '📚 Research Hub  |  Type "research quantum" to search papers',
    '🎓 Learning Center  |  Run "tutorial" to start interactive guides',
    '🔌 API Gateway Active  |  Try "/api arxiv" for real research data'
  ];

  const randomWelcome = WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)];

  const [localMessages, setLocalMessages] = useState<Message[]>([
    {
      type: 'success',
      content: '✓ AltruisticXAI Quantum Terminal v2.5.0',
    },
    {
      type: 'system',
      content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    },
    {
      type: 'info',
      content: randomWelcome,
    },
    {
      type: 'system',
      content: '',
    },
    {
      type: 'table',
      content: 'Quick Start Commands:',
    },
    {
      type: 'list',
      content: '  ai <question>  - Ask AI anything about quantum/AI/policy',
    },
    {
      type: 'list',
      content: '  magic <query>  - 21st.dev Magic AI for advanced search',
    },
    {
      type: 'list',
      content: '  api <source>   - Query real APIs (arxiv, github, nist, pjm)',
    },
    {
      type: 'list',
      content: '  scrape <url>   - Fetch and analyze any webpage',
    },
    {
      type: 'list',
      content: '  news [topic]   - Get latest quantum & AI updates',
    },
    {
      type: 'list',
      content: '  qc-status      - Quantum computing system status',
    },
    {
      type: 'list',
      content: '  pqc-status     - Post-quantum crypto readiness',
    },
    {
      type: 'list',
      content: '  security-scan  - Run security vulnerability scan',
    },
    {
      type: 'list',
      content: '  research       - Search research papers',
    },
    {
      type: 'system',
      content: '',
    },
    {
      type: 'info',
      content: '⌨️  Shortcuts: ⌘K (Command Palette) | ⌘L (Clear)',
    },
    {
      type: 'system',
      content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
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

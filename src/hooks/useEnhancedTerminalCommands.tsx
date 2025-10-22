import { terminalTopics, projectPrompts, commandSuggestions } from './useTerminalTopics';
import { Message } from '@/types/terminal';

export const useEnhancedCommands = () => {
  const topicCommand = async (args: string[]): Promise<Message[]> => {
    if (!args[0]) {
      return [
        { type: 'info', content: 'Available topics:' },
        { type: 'list', content: '  quantum - Quantum computing topics' },
        { type: 'list', content: '  ai - AI and machine learning topics' },
        { type: 'list', content: '  policy - Policy and compliance topics' },
        { type: 'list', content: '  energy - Energy and grid optimization' },
        { type: 'list', content: '  healthcare - Healthcare and medical research' },
        { type: 'list', content: '  education - Education and training programs' },
        { type: 'list', content: '  security - Cybersecurity and cryptography' },
        { type: 'list', content: '  research - Research and development' },
        { type: 'list', content: '  business - Business and enterprise' },
        { type: 'system', content: '\nUsage: /topic <category>' },
      ];
    }

    const topic = args[0].toLowerCase();
    const topics = terminalTopics[topic as keyof typeof terminalTopics];

    if (!topics) {
      return [{ type: 'error', content: `Topic "${topic}" not found. Use /topic to see available topics.` }];
    }

    const messages: Message[] = [
      { type: 'success', content: `✓ ${topic.toUpperCase()} Topics` },
      { type: 'system', content: '' },
    ];

    topics.forEach((t, i) => {
      messages.push({ type: 'list', content: `  ${i + 1}. ${t}` });
    });

    return messages;
  };

  const templateCommand = async (args: string[]): Promise<Message[]> => {
    const templates = {
      security: {
        name: 'Security Audit Template',
        tasks: [
          'Inventory current cryptographic systems',
          'Identify quantum-vulnerable algorithms',
          'Prioritize critical systems for migration',
          'Develop PQC implementation roadmap',
          'Establish ongoing monitoring protocols',
        ],
      },
      energy: {
        name: 'Energy Optimization Template',
        tasks: [
          'Baseline current grid performance',
          'Identify optimization opportunities',
          'Deploy quantum-inspired algorithms',
          'Measure and validate improvements',
          'Scale successful pilot projects',
        ],
      },
      healthcare: {
        name: 'Healthcare Innovation Template',
        tasks: [
          'Define research objectives',
          'Set up quantum simulation environment',
          'Run molecular modeling experiments',
          'Validate results with lab testing',
          'Document and publish findings',
        ],
      },
    };

    if (!args[0] || !templates[args[0] as keyof typeof templates]) {
      return [
        { type: 'info', content: 'Available templates:' },
        { type: 'list', content: '  security - Quantum-safe security audit' },
        { type: 'list', content: '  energy - Smart grid optimization' },
        { type: 'list', content: '  healthcare - Medical research project' },
        { type: 'system', content: '\nUsage: /template <name>' },
      ];
    }

    const template = templates[args[0] as keyof typeof templates];
    const messages: Message[] = [
      { type: 'success', content: `✓ Loaded: ${template.name}` },
      { type: 'system', content: '' },
      { type: 'info', content: 'Project Tasks:' },
    ];

    template.tasks.forEach((task, i) => {
      messages.push({ type: 'list', content: `  ${i + 1}. ${task}` });
    });

    messages.push({ type: 'system', content: '\nUse /new <project-name> to create a project from this template.' });

    return messages;
  };

  const promptsCommand = async (): Promise<Message[]> => {
    const messages: Message[] = [
      { type: 'success', content: '✓ Project Prompts Library' },
      { type: 'system', content: '' },
    ];

    projectPrompts.forEach((prompt, i) => {
      messages.push({
        type: 'table',
        content: `[${prompt.category}] ${prompt.name} - ${prompt.description}`,
      });
    });

    messages.push({ type: 'system', content: '\nUse /new <project-name> to start any of these projects.' });

    return messages;
  };

  const suggestCommand = async (): Promise<Message[]> => {
    const randomSuggestions = commandSuggestions
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);

    const messages: Message[] = [
      { type: 'success', content: '✓ Command Suggestions' },
      { type: 'system', content: '' },
    ];

    randomSuggestions.forEach((suggestion) => {
      messages.push({ type: 'list', content: `  ${suggestion}` });
    });

    return messages;
  };

  return {
    topicCommand,
    templateCommand,
    promptsCommand,
    suggestCommand,
  };
};

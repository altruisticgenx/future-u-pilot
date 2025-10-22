import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Command, Message, TerminalContext, Project } from '@/types/terminal';
import { toast } from 'sonner';

const TRENDING_TOPICS = [
  'Quantum Computing Security', 'AI Policy Compliance', 'Post-Quantum Cryptography',
  'Explainable AI Systems', 'Quantum Machine Learning', 'AI Risk Assessment',
  'Quantum-Safe Infrastructure', 'Federal AI Guidelines', 'Quantum Workforce Development'
];

const SAMPLE_PROJECTS = [
  { name: 'pa-quantum-initiative', status: 'active', budget: 2500000, progress: 78 },
  { name: 'university-ai-compliance', status: 'active', budget: 450000, progress: 92 },
  { name: 'energy-grid-optimization', status: 'active', budget: 1800000, progress: 65 },
  { name: 'healthcare-quantum-ml', status: 'planning', budget: 950000, progress: 15 },
  { name: 'gov-policy-framework', status: 'active', budget: 320000, progress: 88 },
  { name: 'quantum-workforce-dev', status: 'completed', budget: 680000, progress: 100 },
];

export const useTerminalCommands = () => {
  const commands: Command[] = [
    {
      name: 'help',
      aliases: ['?', 'man'],
      description: 'Display available commands',
      usage: '/help [command]',
      category: 'general',
      handler: async (args, ctx) => {
        if (args[0]) {
          const cmd = allCommands.find(c => c.name === args[0] || c.aliases.includes(args[0]));
          if (!cmd) {
            return [{ type: 'error', content: `Command not found: ${args[0]}` }];
          }
          return [
            { type: 'system', content: `${cmd.name} - ${cmd.description}` },
            { type: 'code', content: `Usage: ${cmd.usage}` },
            cmd.aliases.length > 0 ? { type: 'system', content: `Aliases: ${cmd.aliases.join(', ')}` } : null,
          ].filter(Boolean) as Message[];
        }

        const categories = Array.from(new Set(allCommands.map(c => c.category)));
        const help: Message[] = [
          { type: 'success', content: '✓ Available Commands' },
          { type: 'system', content: '' },
        ];

        categories.forEach(category => {
          help.push({ type: 'info', content: `— ${category.toUpperCase()} —` });
          allCommands
            .filter(c => c.category === category)
            .forEach(cmd => {
              help.push({ 
                type: 'list', 
                content: `  /${cmd.name}${cmd.aliases.length ? ` (${cmd.aliases.join(', ')})` : ''} - ${cmd.description}` 
              });
            });
          help.push({ type: 'system', content: '' });
        });

        help.push({ type: 'system', content: 'Type /help <command> for detailed usage.' });
        return help;
      },
    },
    {
      name: 'trending',
      aliases: ['trends', 'hot'],
      description: 'Show trending quantum-AI topics',
      usage: '/trending',
      category: 'analytics',
      handler: async (args, ctx) => {
        const messages: Message[] = [
          { type: 'success', content: '🔥 Trending Quantum-AI Topics' },
          { type: 'system', content: '' },
        ];
        TRENDING_TOPICS.slice(0, 6).forEach((topic, i) => {
          messages.push({
            type: 'list',
            content: `${i + 1}. ${topic} ${['📈', '🚀', '⚡', '💡', '🔬', '🎯'][i]}`,
          });
        });
        return messages;
      },
    },
    {
      name: 'budget',
      aliases: ['funding', 'money'],
      description: 'Show project budgets and spending',
      usage: '/budget [project]',
      category: 'analytics',
      handler: async (args, ctx) => {
        if (args[0]) {
          const project = SAMPLE_PROJECTS.find(p => p.name.includes(args[0]));
          if (!project) return [{ type: 'error', content: 'Project not found' }];
          
          return [
            { type: 'success', content: `💰 Budget: ${project.name}` },
            { type: 'table', content: `Total Allocated: $${project.budget.toLocaleString()}` },
            { type: 'table', content: `Spent: $${Math.floor(project.budget * project.progress / 100).toLocaleString()} (${project.progress}%)` },
            { type: 'table', content: `Remaining: $${Math.floor(project.budget * (100 - project.progress) / 100).toLocaleString()}` },
            { type: 'info', content: `Status: ${project.status}` },
          ];
        }
        
        const total = SAMPLE_PROJECTS.reduce((sum, p) => sum + p.budget, 0);
        const messages: Message[] = [
          { type: 'success', content: `💰 Total Portfolio Budget: $${total.toLocaleString()}` },
          { type: 'system', content: '' },
        ];
        SAMPLE_PROJECTS.forEach(p => {
          messages.push({
            type: 'table',
            content: `${p.name}: $${p.budget.toLocaleString()} (${p.progress}% spent)`,
          });
        });
        return messages;
      },
    },
    {
      name: 'status',
      aliases: ['stat', 'info'],
      description: 'Show system and project status',
      usage: '/status [project]',
      category: 'analytics',
      handler: async (args, ctx) => {
        const active = SAMPLE_PROJECTS.filter(p => p.status === 'active').length;
        const completed = SAMPLE_PROJECTS.filter(p => p.status === 'completed').length;
        
        return [
          { type: 'success', content: '⚡ System Status' },
          { type: 'system', content: '' },
          { type: 'code', content: `Active Projects: ${active}` },
          { type: 'code', content: `Completed Projects: ${completed}` },
          { type: 'code', content: `Total Projects: ${SAMPLE_PROJECTS.length}` },
          { type: 'code', content: `Uptime: 99.8%` },
          { type: 'code', content: `Response Time: 45ms` },
          { type: 'success', content: '✓ All systems operational' },
        ];
      },
    },
    {
      name: 'deploy',
      aliases: ['ship', 'release'],
      description: 'Deploy project to production',
      usage: '/deploy <project>',
      category: 'operations',
      handler: async (args, ctx) => {
        if (!args[0]) return [{ type: 'error', content: 'Usage: /deploy <project>' }];
        
        const project = args[0];
        return [
          { type: 'loading', content: `Deploying ${project}...` },
          { type: 'code', content: '→ Building production bundle...' },
          { type: 'code', content: '→ Running tests...' },
          { type: 'code', content: '→ Uploading to CDN...' },
          { type: 'code', content: '→ Updating DNS records...' },
          { type: 'success', content: `✓ ${project} deployed successfully!` },
          { type: 'info', content: `🌐 Live at: https://${project}.altruisticxai.com` },
        ];
      },
    },
    {
      name: 'logs',
      aliases: ['tail', 'log'],
      description: 'View recent system logs',
      usage: '/logs [lines]',
      category: 'operations',
      handler: async (args, ctx) => {
        const lines = parseInt(args[0]) || 10;
        const messages: Message[] = [
          { type: 'success', content: `📜 Last ${lines} log entries` },
          { type: 'system', content: '' },
        ];
        
        for (let i = 0; i < lines; i++) {
          const types = ['INFO', 'WARN', 'SUCCESS', 'DEBUG'];
          const type = types[Math.floor(Math.random() * types.length)];
          const time = new Date(Date.now() - i * 60000).toLocaleTimeString();
          messages.push({
            type: 'code',
            content: `[${time}] ${type}: Operation completed successfully`,
          });
        }
        return messages;
      },
    },
    {
      name: 'channels',
      aliases: ['ch', 'list-channels'],
      description: 'List active communication channels',
      usage: '/channels',
      category: 'collaboration',
      handler: async (args, ctx) => {
        const channels = [
          { name: '#quantum-research', members: 24, active: true },
          { name: '#ai-policy', members: 18, active: true },
          { name: '#energy-optimization', members: 32, active: true },
          { name: '#healthcare-ml', members: 15, active: false },
          { name: '#workforce-dev', members: 41, active: true },
          { name: '#general', members: 67, active: true },
        ];
        
        const messages: Message[] = [
          { type: 'success', content: '💬 Active Channels' },
          { type: 'system', content: '' },
        ];
        
        channels.forEach(ch => {
          messages.push({
            type: 'list',
            content: `${ch.active ? '🟢' : '⚪'} ${ch.name} (${ch.members} members)`,
          });
        });
        return messages;
      },
    },
    {
      name: 'analytics',
      aliases: ['stats', 'metrics'],
      description: 'Show project analytics and metrics',
      usage: '/analytics [project]',
      category: 'analytics',
      handler: async (args, ctx) => {
        return [
          { type: 'success', content: '📊 Analytics Overview' },
          { type: 'system', content: '' },
          { type: 'table', content: 'Total Users: 1,247' },
          { type: 'table', content: 'Active This Week: 892' },
          { type: 'table', content: 'Projects Launched: 23' },
          { type: 'table', content: 'Success Rate: 94%' },
          { type: 'table', content: 'Avg Response Time: 125ms' },
          { type: 'system', content: '' },
          { type: 'info', content: '📈 Trending up 18% this month' },
        ];
      },
    },
    {
      name: 'whoami',
      aliases: ['me', 'user'],
      description: 'Show current user information',
      usage: '/whoami',
      category: 'general',
      handler: async (args, ctx) => {
        return [
          { type: 'success', content: '👤 User Profile' },
          { type: 'code', content: 'User: quantum-developer' },
          { type: 'code', content: 'Role: Senior Consultant' },
          { type: 'code', content: 'Organization: AltruisticXAI' },
          { type: 'code', content: 'Projects: 6 active' },
          { type: 'code', content: 'Access Level: Full' },
        ];
      },
    },
    {
      name: 'clear',
      aliases: ['cls', 'reset'],
      description: 'Clear terminal screen',
      usage: '/clear',
      category: 'general',
      handler: async (args, ctx) => {
        ctx.clearMessages();
        return [];
      },
    },
    {
      name: 'new',
      aliases: ['create'],
      description: 'Create a new project',
      usage: '/new <name> [description]',
      category: 'project',
      handler: async (args, ctx) => {
        if (!args[0]) {
          return [{ type: 'error', content: 'Usage: /new <name> [description]' }];
        }

        const name = args[0];
        const description = args.slice(1).join(' ') || null;

        const { data, error } = await supabase
          .from('projects')
          .insert({ name, description })
          .select()
          .single();

        if (error) {
          if (error.code === '23505') {
            return [{ type: 'error', content: `Project "${name}" already exists.` }];
          }
          return [{ type: 'error', content: `Failed to create project: ${error.message}` }];
        }

        toast.success(`Project "${name}" created!`);
        return [
          { type: 'success', content: `✓ Project "${data.name}" created successfully!` },
          { type: 'system', content: `Use /open ${data.name} to switch to this project.` },
        ];
      },
    },
    {
      name: 'list',
      aliases: ['ls', 'projects'],
      description: 'List all projects',
      usage: '/list',
      category: 'project',
      handler: async (args, ctx) => {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          return [{ type: 'error', content: `Failed to fetch projects: ${error.message}` }];
        }

        if (!data || data.length === 0) {
          return [
            { type: 'info', content: 'No projects found.' },
            { type: 'system', content: 'Create one with /new <name>' },
          ];
        }

        const messages: Message[] = [
          { type: 'success', content: `✓ Found ${data.length} project(s)` },
          { type: 'system', content: '' },
        ];

        data.forEach((project: Project) => {
          const tags = project.tags?.join(', ') || 'no tags';
          messages.push({
            type: 'table',
            content: `[${project.status}] ${project.name}${project.description ? ` - ${project.description}` : ''} (${tags})`,
          });
        });

        return messages;
      },
    },
    {
      name: 'open',
      aliases: ['cd', 'switch'],
      description: 'Switch to a project',
      usage: '/open <name>',
      category: 'project',
      handler: async (args, ctx) => {
        if (!args[0]) {
          if (!ctx.currentProject) {
            return [{ type: 'info', content: 'No project currently open.' }];
          }
          return [
            { type: 'info', content: `Currently in: ${ctx.currentProject.name}` },
            { type: 'system', content: ctx.currentProject.description || 'No description' },
          ];
        }

        const name = args[0];
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('name', name)
          .single();

        if (error || !data) {
          return [{ type: 'error', content: `Project "${name}" not found.` }];
        }

        ctx.switchProject(data.id);
        toast.success(`Switched to ${data.name}`);
        return [
          { type: 'success', content: `✓ Switched to project: ${data.name}` },
          { type: 'system', content: data.description || 'No description' },
        ];
      },
    },
    {
      name: 'find',
      aliases: ['search'],
      description: 'Search projects by name or tags',
      usage: '/find <keyword>',
      category: 'project',
      handler: async (args, ctx) => {
        if (!args[0]) {
          return [{ type: 'error', content: 'Usage: /find <keyword>' }];
        }

        const keyword = args.join(' ').toLowerCase();
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .or(`name.ilike.%${keyword}%,description.ilike.%${keyword}%`)
          .order('created_at', { ascending: false });

        if (error) {
          return [{ type: 'error', content: `Search failed: ${error.message}` }];
        }

        if (!data || data.length === 0) {
          return [{ type: 'info', content: `No projects found matching "${keyword}".` }];
        }

        const messages: Message[] = [
          { type: 'success', content: `✓ Found ${data.length} matching project(s)` },
          { type: 'system', content: '' },
        ];

        data.forEach((project: Project) => {
          messages.push({
            type: 'table',
            content: `${project.name}${project.description ? ` - ${project.description}` : ''}`,
          });
        });

        return messages;
      },
    },
    {
      name: 'delete',
      aliases: ['rm', 'remove'],
      description: 'Delete a project',
      usage: '/delete <name>',
      category: 'project',
      handler: async (args, ctx) => {
        if (!args[0]) {
          return [{ type: 'error', content: 'Usage: /delete <name>' }];
        }

        const name = args[0];
        const { data: project } = await supabase
          .from('projects')
          .select('id')
          .eq('name', name)
          .single();

        if (!project) {
          return [{ type: 'error', content: `Project "${name}" not found.` }];
        }

        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('name', name);

        if (error) {
          return [{ type: 'error', content: `Failed to delete: ${error.message}` }];
        }

        if (ctx.currentProjectId === project.id) {
          ctx.switchProject(null);
        }

        toast.success(`Project "${name}" deleted`);
        return [{ type: 'success', content: `✓ Project "${name}" deleted.` }];
      },
    },
    {
      name: 'edit',
      aliases: ['update'],
      description: 'Edit project details',
      usage: '/edit <name> [description]',
      category: 'project',
      handler: async (args, ctx) => {
        if (!args[0]) {
          return [{ type: 'error', content: 'Usage: /edit <name> [description]' }];
        }

        const name = args[0];
        const description = args.slice(1).join(' ') || null;

        const { data, error } = await supabase
          .from('projects')
          .update({ description, updated_at: new Date().toISOString() })
          .eq('name', name)
          .select()
          .single();

        if (error || !data) {
          return [{ type: 'error', content: `Project "${name}" not found.` }];
        }

        toast.success(`Project "${name}" updated`);
        return [{ type: 'success', content: `✓ Project "${name}" updated.` }];
      },
    },
    {
      name: 'git',
      aliases: [],
      description: 'Git operations (simulated)',
      usage: '/git <action> [args]',
      category: 'git',
      handler: async (args, ctx) => {
        if (!ctx.currentProjectId) {
          return [{ type: 'error', content: 'No project selected. Use /open <name> first.' }];
        }

        const action = args[0];

        if (action === 'status') {
          const { data } = await supabase
            .from('git_actions')
            .select('*')
            .eq('project_id', ctx.currentProjectId)
            .order('created_at', { ascending: false })
            .limit(1);

          const lastAction = data?.[0];
          return [
            { type: 'code', content: 'On branch main' },
            { type: 'code', content: lastAction ? `Last action: ${lastAction.action} (${new Date(lastAction.created_at).toLocaleString()})` : 'No git history.' },
            { type: 'code', content: 'working tree clean' },
          ];
        }

        if (action === 'commit') {
          if (args[1] !== '-m' || !args[2]) {
            return [{ type: 'error', content: 'Usage: /git commit -m "message"' }];
          }

          const message = args.slice(2).join(' ').replace(/^["']|["']$/g, '');
          
          await supabase.from('git_actions').insert({
            project_id: ctx.currentProjectId,
            action: 'commit',
            message,
            author: 'terminal-user',
            files_changed: { added: Math.floor(Math.random() * 5), modified: Math.floor(Math.random() * 10), deleted: 0 },
          });

          await ctx.addCommandLog('git commit', { message }, 'success', 'Commit successful', 250);

          toast.success('Committed changes');
          return [
            { type: 'success', content: `✓ Committed: ${message}` },
            { type: 'code', content: `[main ${Math.random().toString(36).substr(2, 7)}] ${message}` },
            { type: 'code', content: `${Math.floor(Math.random() * 10)} files changed` },
          ];
        }

        if (action === 'push') {
          await supabase.from('git_actions').insert({
            project_id: ctx.currentProjectId,
            action: 'push',
            branch: 'main',
            author: 'terminal-user',
          });

          await ctx.addCommandLog('git push', {}, 'success', 'Push successful', 1200);

          toast.success('Pushed to origin');
          return [
            { type: 'loading', content: 'Pushing to origin/main...' },
            { type: 'success', content: '✓ Pushed to origin/main' },
            { type: 'code', content: 'Everything up-to-date' },
          ];
        }

        if (action === 'log') {
          const { data } = await supabase
            .from('git_actions')
            .select('*')
            .eq('project_id', ctx.currentProjectId)
            .eq('action', 'commit')
            .order('created_at', { ascending: false })
            .limit(10);

          if (!data || data.length === 0) {
            return [{ type: 'info', content: 'No commit history.' }];
          }

          const messages: Message[] = [
            { type: 'success', content: `✓ Last ${data.length} commits` },
            { type: 'system', content: '' },
          ];

          data.forEach(commit => {
            messages.push({
              type: 'code',
              content: `${Math.random().toString(36).substr(2, 7)} ${commit.message || 'No message'} - ${new Date(commit.created_at).toLocaleString()}`,
            });
          });

          return messages;
        }

        return [{ type: 'error', content: `Unknown git action: ${action}. Try: status, commit, push, log` }];
      },
    },
  ];

  const allCommands = commands;

  const executeCommand = useCallback(async (
    input: string,
    context: TerminalContext
  ): Promise<Message[]> => {
    const startTime = Date.now();
    const trimmed = input.trim();
    
    if (!trimmed.startsWith('/')) {
      return [{ type: 'error', content: 'Commands must start with /. Type /help for available commands.' }];
    }

    const parts = trimmed.slice(1).match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
    const commandName = parts[0]?.toLowerCase();
    const args = parts.slice(1).map(arg => arg.replace(/^["']|["']$/g, ''));

    const command = allCommands.find(
      c => c.name === commandName || c.aliases.includes(commandName)
    );

    if (!command) {
      return [
        { type: 'error', content: `Command not found: ${commandName}` },
        { type: 'system', content: 'Type /help to see available commands.' },
      ];
    }

    try {
      const result = await command.handler(args, context);
      const executionTime = Date.now() - startTime;
      
      await context.addCommandLog(
        commandName,
        args,
        'success',
        result.map(r => r.content).join('\n'),
        executionTime
      );

      return result;
    } catch (error) {
      const executionTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      await context.addCommandLog(
        commandName,
        args,
        'error',
        errorMessage,
        executionTime
      );

      return [{ type: 'error', content: `Command failed: ${errorMessage}` }];
    }
  }, [allCommands]);

  return { executeCommand, commands: allCommands };
};

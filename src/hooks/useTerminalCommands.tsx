import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Command, Message, TerminalContext, Project } from '@/types/terminal';
import { toast } from 'sonner';
import { buildFileTree, formatFileSize } from '@/lib/fileManager';

export const useTerminalCommands = () => {
  const commands: Command[] = [
    {
      name: 'help',
      aliases: ['?'],
      description: 'Display available commands',
      usage: '/help [command]',
      category: 'help',
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
      name: 'clear',
      aliases: ['cls'],
      description: 'Clear terminal screen',
      usage: '/clear',
      category: 'system',
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
    {
      name: 'files',
      aliases: ['ls'],
      description: 'List imported files',
      usage: '/files',
      category: 'system',
      handler: async () => {
        const { data, error } = await supabase
          .from('file_imports')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) throw error;

        if (!data || data.length === 0) {
          return [
            { type: 'info', content: 'No files imported yet.' },
            { type: 'system', content: 'Use drag & drop or /import command to upload files.' },
          ];
        }

        const messages: Message[] = [
          { type: 'success', content: `✓ Found ${data.length} imported files` },
          { type: 'system', content: '' },
        ];

        data.forEach((file, index) => {
          const extractedFiles = (file.extracted_files as any[]) || [];
          const fileCount = extractedFiles.length;
          const totalSize = formatFileSize(file.file_size || 0);
          messages.push({
            type: 'list',
            content: `${index + 1}. ${file.filename} (${fileCount} files, ${totalSize})`,
            metadata: { 
              fileId: file.id,
              filename: file.filename,
              extractedFiles: file.extracted_files 
            },
          });
        });

        return messages;
      },
    },
    {
      name: 'view',
      aliases: ['cat'],
      description: 'View file contents',
      usage: '/view <import-id> <file-path>',
      category: 'system',
      handler: async (args) => {
        if (args.length < 2) {
          return [
            { type: 'error', content: 'Usage: /view <import-id> <file-path>' },
            { type: 'system', content: 'Tip: Use /files to see available imports' },
          ];
        }

        const [importId, ...pathParts] = args;
        const filePath = pathParts.join(' ');

        const { data: importData, error } = await supabase
          .from('file_imports')
          .select('*')
          .eq('id', importId)
          .single();

        if (error || !importData) {
          return [{ type: 'error', content: 'Import not found' }];
        }

        const extractedFiles = importData.extracted_files as any[];
        const file = extractedFiles?.find(f => f.path === filePath);

        if (!file) {
          return [
            { type: 'error', content: `File not found: ${filePath}` },
            { type: 'system', content: 'Available files:' },
            ...extractedFiles.map(f => ({ 
              type: 'list' as const, 
              content: `  ${f.path}` 
            })),
          ];
        }

        // Get actual file content from storage
        const { data: storageData } = await supabase.storage
          .from('terminal-uploads')
          .download(importData.file_path);

        if (!storageData) {
          return [{ type: 'error', content: 'Failed to load file content' }];
        }

        return [
          { type: 'success', content: `✓ Viewing: ${file.path}` },
          { 
            type: 'file-preview', 
            content: file.path,
            metadata: { 
              filename: file.name,
              content: await storageData.text(),
              size: file.size 
            } 
          },
        ];
      },
    },
    {
      name: 'seed',
      aliases: ['import-projects'],
      description: 'Import projects from JSON file',
      usage: '/seed <import-id> <json-file-path>',
      category: 'project',
      handler: async (args) => {
        if (args.length < 2) {
          return [
            { type: 'error', content: 'Usage: /seed <import-id> <json-file-path>' },
            { type: 'system', content: 'Example: /seed abc123 projects.json' },
          ];
        }

        const [importId, ...pathParts] = args;
        const filePath = pathParts.join(' ');

        const { data: importData, error } = await supabase
          .from('file_imports')
          .select('*')
          .eq('id', importId)
          .single();

        if (error || !importData) {
          return [{ type: 'error', content: 'Import not found' }];
        }

        const extractedFiles = importData.extracted_files as any[];
        const jsonFile = extractedFiles?.find(f => f.path === filePath && f.type === 'json');

        if (!jsonFile) {
          return [
            { type: 'error', content: `JSON file not found: ${filePath}` },
            { type: 'system', content: 'Available JSON files:' },
            ...extractedFiles
              .filter(f => f.type === 'json')
              .map(f => ({ type: 'list' as const, content: `  ${f.path}` })),
          ];
        }

        // Download and parse the JSON
        const { data: storageData } = await supabase.storage
          .from('terminal-uploads')
          .download(importData.file_path);

        if (!storageData) {
          return [{ type: 'error', content: 'Failed to load file' }];
        }

        const content = await storageData.text();
        let projects;
        
        try {
          const parsed = JSON.parse(content);
          projects = Array.isArray(parsed) ? parsed : parsed.projects || [parsed];
        } catch (e) {
          return [{ type: 'error', content: 'Invalid JSON format' }];
        }

        // Insert projects
        const results = [];
        for (const project of projects) {
          const { error: insertError } = await supabase
            .from('projects')
            .insert({
              name: project.name,
              description: project.description || null,
              status: project.status || 'active',
              tags: project.tags || [],
              github_url: project.github_url || null,
            });

          if (!insertError) {
            results.push({ type: 'success' as const, content: `✓ Created: ${project.name}` });
          } else if (insertError.code === '23505') {
            results.push({ type: 'info' as const, content: `⊘ Skipped: ${project.name} (already exists)` });
          } else {
            results.push({ type: 'error' as const, content: `✗ Failed: ${project.name}` });
          }
        }

        return [
          { type: 'success', content: `✓ Processed ${projects.length} projects` },
          { type: 'system', content: '' },
          ...results,
        ];
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

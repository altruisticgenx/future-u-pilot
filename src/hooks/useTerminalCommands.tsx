import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Command, Message, TerminalContext, Project } from '@/types/terminal';
import { toast } from 'sonner';
import { QUANTUM_SYSTEMS, QUANTUM_ALGORITHMS, QC_BENCHMARKS } from '@/data/terminal/quantum-computing';
import { AI_MODELS, DATASETS, TRAINING_METRICS } from '@/data/terminal/ai-models';
import { FEDERAL_POLICIES, COMPLIANCE_FRAMEWORKS, COMPLIANCE_CHECKLIST } from '@/data/terminal/policy-compliance';
import { PQC_ALGORITHMS, CRYPTO_INVENTORY, SECURITY_SCAN_RESULTS, PQC_MIGRATION_CHECKLIST } from '@/data/terminal/security-crypto';
import { RESEARCH_PAPERS, RESEARCH_TOPICS, CASE_STUDIES } from '@/data/terminal/research-papers';
import { TUTORIALS, QUICK_START_GUIDE } from '@/data/terminal/tutorials';
import { EXPERIMENTS, LAB_RESOURCES } from '@/data/terminal/experiments';
import { ASCII_BANNERS, PROGRESS_BAR, STATUS_ICONS, AI_TRAINING_VIZ, PQC_COMPARISON_TABLE, QUANTUM_CIRCUIT_EXAMPLES } from '@/data/terminal/ascii-art';

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
          const cmd = commands.find(c => c.name === args[0] || c.aliases.includes(args[0]));
          if (!cmd) {
            return [{ type: 'error', content: `Command not found: ${args[0]}` }];
          }
          return [
            { type: 'system', content: `${cmd.name} - ${cmd.description}` },
            { type: 'code', content: `Usage: ${cmd.usage}` },
            cmd.aliases.length > 0 ? { type: 'system', content: `Aliases: ${cmd.aliases.join(', ')}` } : null,
          ].filter(Boolean) as Message[];
        }

        const categories = Array.from(new Set(commands.map(c => c.category)));
        const help: Message[] = [
          { type: 'success', content: '✓ Available Commands' },
          { type: 'system', content: '' },
        ];

        categories.forEach(category => {
          help.push({ type: 'info', content: `— ${category.toUpperCase()} —` });
          commands
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
        const action = args[0];
        if (!action) {
          return [{ type: 'error', content: 'Usage: /git <action> [args]' }];
        }

        const { data: { user } } = await supabase.auth.getUser();

        switch (action) {
          case 'status':
            return [{
              type: 'success',
              content: 'On branch main\nYour branch is up to date with \'origin/main\'.\n\nnothing to commit, working tree clean'
            }];

          case 'commit':
            const message = args.slice(1).join(' ');
            if (!message) {
              return [{ type: 'error', content: 'Usage: /git commit <message>' }];
            }

            if (user && ctx.currentProjectId) {
              await supabase
                .from('git_actions')
                .insert({
                  project_id: ctx.currentProjectId,
                  action: 'commit',
                  message,
                  author: user.email,
                  branch: 'main'
                });
            }

            return [{
              type: 'success',
              content: `[main ${Math.random().toString(36).substr(2, 7)}] ${message}\n 3 files changed, 127 insertions(+), 45 deletions(-)`
            }];

          case 'push':
            return [{
              type: 'success',
              content: 'Enumerating objects: 12, done.\nCounting objects: 100% (12/12), done.\nDelta compression using up to 8 threads\nWriting objects: 100% (7/7), 1.24 KiB | 1.24 MiB/s, done.\nTotal 7 (delta 3), reused 0 (delta 0)\nTo github.com:user/repo.git\n   abc123..def456  main -> main'
            }];

          case 'pull':
            return [{
              type: 'success',
              content: 'Already up to date.'
            }];

          case 'branch':
            const branchName = args[1];
            if (branchName) {
              return [{
                type: 'success',
                content: `Created branch '${branchName}'`
              }];
            }
            return [{
              type: 'info',
              content: '* main\n  development\n  feature/new-ui\n  hotfix/auth-bug'
            }];

          default:
            return [{
              type: 'error',
              content: `Unknown git command: ${action}`
            }];
        }
      },
    },
    // ============ QUANTUM COMPUTING COMMANDS ============
    {
      name: 'qc-status',
      aliases: ['quantum', 'qubits'],
      description: 'View quantum computing system status',
      usage: '/qc-status [system]',
      category: 'quantum',
      handler: async (args, ctx) => {
        const messages: Message[] = [
          { type: 'code', content: ASCII_BANNERS.quantum },
          { type: 'system', content: '' },
        ];

        if (args[0]) {
          const system = QUANTUM_SYSTEMS.find(s => s.name.toLowerCase().includes(args[0].toLowerCase()));
          if (!system) {
            return [{ type: 'error', content: 'Quantum system not found' }];
          }
          messages.push(
            { type: 'success', content: `${STATUS_ICONS.online} ${system.name} - ONLINE` },
            { type: 'table', content: `  Qubits: ${system.qubits}` },
            { type: 'table', content: `  Topology: ${system.topology}` },
            { type: 'table', content: `  Coherence Time: ${system.coherence_time}` },
            { type: 'table', content: `  Gate Error: ${system.gate_error}` },
            { type: 'table', content: `  Status: ${system.status}` },
          );
        } else {
          QUANTUM_SYSTEMS.slice(0, 5).forEach(system => {
            const statusIcon = system.status === 'online' ? STATUS_ICONS.online : 
                               system.status === 'maintenance' ? STATUS_ICONS.maintenance : STATUS_ICONS.offline;
            messages.push({
              type: 'list',
              content: `${statusIcon} ${system.name} (${system.qubits} qubits) - ${system.status}`
            });
          });
        }
        return messages;
      },
    },
    {
      name: 'qc-simulate',
      aliases: ['simulate', 'run-circuit'],
      description: 'Simulate a quantum circuit',
      usage: '/qc-simulate <algorithm>',
      category: 'quantum',
      handler: async (args, ctx) => {
        if (!args[0]) {
          const messages: Message[] = [
            { type: 'info', content: 'Available Algorithms:' },
            { type: 'system', content: '' },
          ];
          QUANTUM_ALGORITHMS.slice(0, 5).forEach((algo, i) => {
            messages.push({
              type: 'list',
              content: `${i + 1}. ${algo.name} - ${algo.use_case}`
            });
          });
          return messages;
        }

        const algo = QUANTUM_ALGORITHMS.find(a => a.name.toLowerCase().includes(args[0].toLowerCase()));
        if (!algo) {
          return [{ type: 'error', content: 'Algorithm not found. Use /qc-simulate to see available algorithms.' }];
        }

        return [
          { type: 'loading', content: `Initializing ${algo.name}...` },
          { type: 'code', content: `→ Circuit Depth: ${Math.floor(Math.random() * 50) + 20}` },
          { type: 'code', content: `→ Gate Count: ${Math.floor(Math.random() * 200) + 100}` },
          { type: 'code', content: `→ Complexity: ${algo.complexity}` },
          { type: 'code', content: `→ Use Case: ${algo.use_case}` },
          { type: 'system', content: '' },
          { type: 'code', content: QUANTUM_CIRCUIT_EXAMPLES[0].circuit },
          { type: 'system', content: '' },
          { type: 'success', content: `✓ Simulation complete! Expected runtime: ${Math.random() * 2 + 0.5}s` },
        ];
      },
    },
    {
      name: 'qc-benchmark',
      aliases: ['qc-bench', 'quantum-volume'],
      description: 'Run quantum benchmarks',
      usage: '/qc-benchmark',
      category: 'quantum',
      handler: async (args, ctx) => {
        return [
          { type: 'success', content: '⚡ Quantum Benchmarks' },
          { type: 'system', content: '' },
          { type: 'table', content: `Quantum Volume: ${QC_BENCHMARKS.quantum_volume}` },
          { type: 'table', content: `Circuit Depth: ${QC_BENCHMARKS.circuit_depth}` },
          { type: 'table', content: `2-Qubit Gate Fidelity: ${QC_BENCHMARKS.two_qubit_gate_fidelity}` },
          { type: 'table', content: `Readout Fidelity: ${QC_BENCHMARKS.readout_fidelity}` },
          { type: 'system', content: '' },
          { type: 'info', content: '📈 Performance exceeds industry average by 23%' },
        ];
      },
    },
    // ============ AI/ML COMMANDS ============
    {
      name: 'ai-models',
      aliases: ['models', 'ml-models'],
      description: 'List available AI models',
      usage: '/ai-models [filter]',
      category: 'ai',
      handler: async (args, ctx) => {
        const messages: Message[] = [
          { type: 'code', content: ASCII_BANNERS.ai },
          { type: 'system', content: '' },
        ];

        const filter = args[0]?.toLowerCase();
        const filtered = filter 
          ? AI_MODELS.filter(m => m.type.toLowerCase() === filter || m.name.toLowerCase().includes(filter))
          : AI_MODELS.slice(0, 8);

        filtered.forEach((model, i) => {
          messages.push({
            type: 'list',
            content: `${i + 1}. ${model.name} (${model.type}) - ${model.parameters}`
          });
        });

        messages.push(
          { type: 'system', content: '' },
          { type: 'info', content: `📊 Showing ${filtered.length} models | Use filter: LLM, Vision, Multimodal` }
        );
        return messages;
      },
    },
    {
      name: 'ai-train',
      aliases: ['train', 'fine-tune'],
      description: 'Start model training (simulated)',
      usage: '/ai-train <model> <dataset>',
      category: 'ai',
      handler: async (args, ctx) => {
        if (args.length < 2) {
          return [{ type: 'error', content: 'Usage: /ai-train <model> <dataset>' }];
        }

        const model = args[0];
        const dataset = args[1];
        const epochs = 10;

        const messages: Message[] = [
          { type: 'loading', content: `Starting training: ${model} on ${dataset}...` },
          { type: 'system', content: '' },
          { type: 'code', content: AI_TRAINING_VIZ },
          { type: 'system', content: '' },
        ];

        for (let i = 1; i <= 3; i++) {
          messages.push({
            type: 'code',
            content: `Epoch ${i}/${epochs}: ${PROGRESS_BAR((i / epochs) * 100)} - loss: ${(2 - i * 0.5).toFixed(3)}`
          });
        }

        messages.push(
          { type: 'system', content: '' },
          { type: 'success', content: `✓ Training started! ETA: ${Math.floor(Math.random() * 3 + 1)}h ${Math.floor(Math.random() * 60)}m` },
        );

        return messages;
      },
    },
    {
      name: 'ai-inference',
      aliases: ['predict', 'infer'],
      description: 'Run model inference',
      usage: '/ai-inference <model> <prompt>',
      category: 'ai',
      handler: async (args, ctx) => {
        if (!args[0]) {
          return [{ type: 'error', content: 'Usage: /ai-inference <model> <prompt>' }];
        }

        const model = args[0];
        const prompt = args.slice(1).join(' ') || 'sample input';

        return [
          { type: 'loading', content: `Running inference with ${model}...` },
          { type: 'system', content: '' },
          { type: 'code', content: `Input: "${prompt}"` },
          { type: 'code', content: `Model: ${model}` },
          { type: 'code', content: `Tokens: ${Math.floor(Math.random() * 100) + 20}` },
          { type: 'code', content: `Latency: ${(Math.random() * 200 + 50).toFixed(0)}ms` },
          { type: 'system', content: '' },
          { type: 'success', content: `✓ Inference complete` },
        ];
      },
    },
    // ============ POLICY & COMPLIANCE COMMANDS ============
    {
      name: 'policy-check',
      aliases: ['compliance', 'policy'],
      description: 'Check AI policy compliance',
      usage: '/policy-check [policy-id]',
      category: 'policy',
      handler: async (args, ctx) => {
        const messages: Message[] = [
          { type: 'code', content: ASCII_BANNERS.policy },
          { type: 'system', content: '' },
        ];

        if (args[0]) {
          const policy = FEDERAL_POLICIES.find(p => p.id.toLowerCase() === args[0].toLowerCase());
          if (!policy) {
            return [{ type: 'error', content: 'Policy not found' }];
          }

          messages.push(
            { type: 'success', content: `${policy.name} (${policy.id})` },
            { type: 'table', content: `Date: ${policy.date}` },
            { type: 'table', content: `Agency: ${policy.agency}` },
            { type: 'table', content: `Status: ${policy.status}` },
            { type: 'system', content: '' },
            { type: 'info', content: 'Requirements:' },
          );

          policy.requirements.forEach((req, i) => {
            messages.push({ type: 'list', content: `${i + 1}. ${req}` });
          });
        } else {
          FEDERAL_POLICIES.forEach(policy => {
            const statusIcon = policy.status === 'Active' ? STATUS_ICONS.active : STATUS_ICONS.pending;
            messages.push({
              type: 'list',
              content: `${statusIcon} ${policy.id} - ${policy.name}`
            });
          });
        }

        return messages;
      },
    },
    {
      name: 'audit-report',
      aliases: ['audit', 'report'],
      description: 'Generate compliance audit report',
      usage: '/audit-report <framework>',
      category: 'policy',
      handler: async (args, ctx) => {
        const framework = args[0] || 'NIST AI RMF';
        const compliancePercent = Math.floor(Math.random() * 20) + 75;

        return [
          { type: 'loading', content: `Generating ${framework} audit report...` },
          { type: 'system', content: '' },
          { type: 'success', content: `${framework} Compliance Report` },
          { type: 'code', content: `Compliance Score: ${PROGRESS_BAR(compliancePercent)}` },
          { type: 'system', content: '' },
          { type: 'table', content: `${STATUS_ICONS.success} Passed: ${Math.floor(compliancePercent * 3.25)} controls` },
          { type: 'table', content: `${STATUS_ICONS.warning} Partial: ${Math.floor((100 - compliancePercent) * 2)} controls` },
          { type: 'table', content: `${STATUS_ICONS.error} Failed: ${Math.floor((100 - compliancePercent) * 0.5)} controls` },
          { type: 'system', content: '' },
          { type: 'info', content: '📄 Full report available at: /reports/audit-latest.pdf' },
        ];
      },
    },
    {
      name: 'fedramp',
      aliases: ['fed-ramp', 'federal'],
      description: 'FedRAMP compliance status',
      usage: '/fedramp [level]',
      category: 'policy',
      handler: async (args, ctx) => {
        const level = args[0] || 'High';
        const framework = COMPLIANCE_FRAMEWORKS.find(f => f.name === 'FedRAMP');

        return [
          { type: 'success', content: `🔒 FedRAMP ${level} Compliance` },
          { type: 'system', content: '' },
          { type: 'table', content: `Total Controls: ${framework?.requirements || 325}` },
          { type: 'table', content: `Implemented: ${Math.floor((framework?.requirements || 325) * 0.87)}` },
          { type: 'table', content: `In Progress: ${Math.floor((framework?.requirements || 325) * 0.10)}` },
          { type: 'table', content: `Remaining: ${Math.floor((framework?.requirements || 325) * 0.03)}` },
          { type: 'system', content: '' },
          { type: 'code', content: `Status: ${PROGRESS_BAR(87)}` },
          { type: 'info', content: '📋 Estimated certification date: Q2 2025' },
        ];
      },
    },
    // ============ SECURITY & CRYPTO COMMANDS ============
    {
      name: 'security-scan',
      aliases: ['scan', 'security'],
      description: 'Run security vulnerability scan',
      usage: '/security-scan [target]',
      category: 'security',
      handler: async (args, ctx) => {
        const target = args[0] || 'all-systems';

        return [
          { type: 'code', content: ASCII_BANNERS.security },
          { type: 'loading', content: `Scanning ${target}...` },
          { type: 'system', content: '' },
          { type: 'success', content: `${STATUS_ICONS.success} Critical: 0 vulnerabilities` },
          { type: 'info', content: `${STATUS_ICONS.warning} High: ${Math.floor(Math.random() * 3)} vulnerabilities` },
          { type: 'info', content: `${STATUS_ICONS.info} Medium: ${Math.floor(Math.random() * 8) + 2} vulnerabilities` },
          { type: 'code', content: `${STATUS_ICONS.info} Low: ${Math.floor(Math.random() * 15) + 5} vulnerabilities` },
          { type: 'system', content: '' },
          { type: 'success', content: '✓ No critical threats detected' },
        ];
      },
    },
    {
      name: 'pqc-status',
      aliases: ['post-quantum', 'pqc'],
      description: 'Post-quantum cryptography status',
      usage: '/pqc-status',
      category: 'security',
      handler: async (args, ctx) => {
        return [
          { type: 'success', content: '🔐 Post-Quantum Cryptography Status' },
          { type: 'system', content: '' },
          { type: 'code', content: PQC_COMPARISON_TABLE },
          { type: 'system', content: '' },
          { type: 'success', content: 'PQC Migration Progress:' },
          { type: 'code', content: `${PROGRESS_BAR(65)}` },
          { type: 'system', content: '' },
          { type: 'list', content: `${STATUS_ICONS.completed} Key Exchange: CRYSTALS-Kyber` },
          { type: 'list', content: `${STATUS_ICONS.active} Digital Signatures: CRYSTALS-Dilithium` },
          { type: 'list', content: `${STATUS_ICONS.pending} Legacy Systems: In Progress` },
        ];
      },
    },
    {
      name: 'crypto-audit',
      aliases: ['crypto', 'encryption'],
      description: 'Audit cryptographic implementations',
      usage: '/crypto-audit [algorithm]',
      category: 'security',
      handler: async (args, ctx) => {
        const messages: Message[] = [
          { type: 'loading', content: 'Auditing cryptographic implementations...' },
          { type: 'system', content: '' },
          { type: 'success', content: '📋 Cryptography Inventory' },
          { type: 'system', content: '' },
        ];

        CRYPTO_INVENTORY.slice(0, 6).forEach(item => {
          const quantumSafe = item.status === 'Quantum-resistant';
          const statusIcon = quantumSafe ? STATUS_ICONS.success : STATUS_ICONS.warning;
          messages.push({
            type: 'list',
            content: `${statusIcon} ${item.algorithm} (${item.type}) - ${item.action}`
          });
        });

        messages.push(
          { type: 'system', content: '' },
          { type: 'warning', content: '⚠️  3 legacy algorithms require migration' },
        );

        return messages;
      },
    },
    // ============ RESEARCH & DATA COMMANDS ============
    {
      name: 'research',
      aliases: ['papers', 'publications'],
      description: 'Search research papers',
      usage: '/research <topic>',
      category: 'research',
      handler: async (args, ctx) => {
        if (!args[0]) {
          return [
            { type: 'info', content: 'Popular Research Topics:' },
            ...RESEARCH_TOPICS.slice(0, 6).map((topic, i) => ({
              type: 'list' as const,
              content: `${i + 1}. ${topic}`
            }))
          ];
        }

        const topic = args.join(' ');
        const papers = RESEARCH_PAPERS.filter(p => 
          p.title.toLowerCase().includes(topic.toLowerCase()) ||
          p.topic.toLowerCase().includes(topic.toLowerCase())
        ).slice(0, 5);

        if (papers.length === 0) {
          return [{ type: 'error', content: 'No papers found matching your query' }];
        }

        const messages: Message[] = [
          { type: 'success', content: `📚 Found ${papers.length} papers on "${topic}"` },
          { type: 'system', content: '' },
        ];

        papers.forEach((paper, i) => {
          messages.push(
            { type: 'success', content: `${i + 1}. ${paper.title}` },
            { type: 'table', content: `   Authors: ${paper.authors.join(', ')}` },
            { type: 'table', content: `   Venue: ${paper.venue} (${paper.year})` },
            { type: 'table', content: `   Citations: ${paper.citations}` },
            { type: 'system', content: '' },
          );
        });

        return messages;
      },
    },
    {
      name: 'datasets',
      aliases: ['data', 'ds'],
      description: 'Browse available datasets',
      usage: '/datasets [domain]',
      category: 'research',
      handler: async (args, ctx) => {
        const messages: Message[] = [
          { type: 'success', content: '📊 Available Datasets' },
          { type: 'system', content: '' },
        ];

        DATASETS.slice(0, 8).forEach((ds, i) => {
          messages.push({
            type: 'list',
            content: `${i + 1}. ${ds.name} (${ds.size}) - ${ds.task}`
          });
        });

        return messages;
      },
    },
    {
      name: 'experiments',
      aliases: ['exp', 'lab'],
      description: 'View lab experiments',
      usage: '/experiments [status]',
      category: 'research',
      handler: async (args, ctx) => {
        const status = args[0]?.toLowerCase();
        const filtered = status 
          ? EXPERIMENTS.filter(e => e.status.toLowerCase() === status)
          : EXPERIMENTS;

        const messages: Message[] = [
          { type: 'code', content: ASCII_BANNERS.lab },
          { type: 'system', content: '' },
        ];

        filtered.slice(0, 6).forEach(exp => {
          const statusIcon = exp.status === 'Running' ? STATUS_ICONS.active :
                           exp.status === 'Completed' ? STATUS_ICONS.completed :
                           STATUS_ICONS.pending;
          messages.push({
            type: 'list',
            content: `${statusIcon} ${exp.name} - ${exp.status}`
          });
        });

        return messages;
      },
    },
    // ============ TUTORIAL & LEARNING COMMANDS ============
    {
      name: 'tutorial',
      aliases: ['learn', 'guide'],
      description: 'Start interactive tutorial',
      usage: '/tutorial <topic>',
      category: 'help',
      handler: async (args, ctx) => {
        if (!args[0]) {
          return [
            { type: 'info', content: 'Available Tutorials:' },
            { type: 'list', content: '1. quantum-101 - Quantum Computing Fundamentals (Beginner)' },
            { type: 'list', content: '2. ai-basics - AI/ML Fundamentals (Beginner)' },
            { type: 'list', content: '3. pqc-migration - Post-Quantum Cryptography Migration (Advanced)' },
            { type: 'list', content: '4. ai-policy - AI Policy Compliance (Intermediate)' }
          ];
        }

        const topic = args[0].toLowerCase();
        const tutorial = TUTORIALS[topic as keyof typeof TUTORIALS];

        if (!tutorial) {
          return [{ type: 'error', content: 'Tutorial not found' }];
        }

        return [
          { type: 'success', content: `📖 ${tutorial.title}` },
          { type: 'table', content: `Duration: ${tutorial.duration}` },
          { type: 'table', content: `Level: ${tutorial.level}` },
          { type: 'system', content: '' },
          { type: 'info', content: 'Steps:' },
          ...tutorial.steps.map((step, i) => ({
            type: 'list' as const,
            content: `${i + 1}. ${step.title}`
          })),
          { type: 'system', content: '' },
          { type: 'info', content: '💡 Type "next" to continue through the tutorial' },
        ];
      },
    },
    {
      name: 'docs',
      aliases: ['doc', 'documentation'],
      description: 'View documentation',
      usage: '/docs [topic]',
      category: 'help',
      handler: async (args, ctx) => {
        return [
          { type: 'success', content: '📚 Documentation' },
          { type: 'system', content: '' },
          { type: 'list', content: '1. Getting Started Guide' },
          { type: 'list', content: '2. API Reference' },
          { type: 'list', content: '3. Command Reference' },
          { type: 'list', content: '4. Best Practices' },
          { type: 'list', content: '5. Troubleshooting' },
          { type: 'system', content: '' },
          { type: 'info', content: '🌐 Full docs: https://docs.altruisticxai.com' },
        ];
      },
    },
    {
      name: 'quickstart',
      aliases: ['quick', 'start'],
      description: 'Quick start guide',
      usage: '/quickstart',
      category: 'help',
      handler: async (args, ctx) => {
        const content = QUICK_START_GUIDE.sections.map(section => {
          const lines = [`\n${section.category}:`];
          section.commands.forEach(cmd => {
            lines.push(`  ${cmd.cmd.padEnd(30)} - ${cmd.desc}`);
          });
          return lines.join('\n');
        }).join('\n');

        return [
          { type: 'code', content },
        ];
      },
    },
  ];

  const executeCommand = useCallback(
    async (input: string, context: TerminalContext): Promise<Message[]> => {
      const trimmed = input.trim();
      if (!trimmed) return [];

      const parts = trimmed.split(/\s+/);
      // Remove leading slash if present
      let commandName = parts[0].toLowerCase();
      if (commandName.startsWith('/')) {
        commandName = commandName.substring(1);
      }
      const args = parts.slice(1);

      const command = commands.find(
        (cmd) => cmd.name === commandName || cmd.aliases.includes(commandName)
      );

      if (!command) {
        return [
          { type: 'error', content: `Command not found: ${commandName}` },
          { type: 'system', content: 'Type "help" for available commands' },
        ];
      }

      try {
        const startTime = Date.now();
        const result = await command.handler(args, context);
        const executionTime = Date.now() - startTime;

        await context.addCommandLog(
          commandName,
          args,
          'success',
          JSON.stringify(result),
          executionTime
        );

        return result;
      } catch (error: any) {
        await context.addCommandLog(
          commandName,
          args,
          'error',
          error.message,
          0
        );
        return [
          { type: 'error', content: `Error: ${error.message}` },
        ];
      }
    },
    [commands]
  );

  return {
    commands,
    executeCommand,
  };
};

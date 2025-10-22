import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Command, Message, TerminalContext, Project } from '@/types/terminal';
import { toast } from 'sonner';

// ============ DEMO DATA GENERATORS ============
const generateRandomData = () => ({
  trending: [
    { name: 'Quantum Encryption', growth: '+245%', category: 'Security' },
    { name: 'Neural Networks', growth: '+189%', category: 'AI' },
    { name: 'Edge Computing', growth: '+156%', category: 'Infrastructure' },
    { name: 'Blockchain Governance', growth: '+134%', category: 'Policy' },
    { name: 'Post-Quantum Cryptography', growth: '+198%', category: 'Security' },
    { name: 'Quantum Machine Learning', growth: '+223%', category: 'AI' }
  ],
  budget: {
    allocated: 2500000,
    spent: 1847563,
    remaining: 652437,
    projects: [
      { name: 'Quantum Lab Setup', budget: 500000, spent: 487234 },
      { name: 'AI Research Initiative', budget: 750000, spent: 621908 },
      { name: 'Cybersecurity Framework', budget: 400000, spent: 289765 },
      { name: 'Training Programs', budget: 350000, spent: 248656 }
    ]
  },
  metrics: {
    uptime: '99.97%',
    latency: '12ms',
    throughput: '45.2k req/s',
    errorRate: '0.03%',
    cpu: '23%',
    ram: '4.2GB/16GB',
    connections: 1247
  },
  channels: [
    { id: 'general', name: 'General', members: 247, unread: 12, active: true },
    { id: 'quantum-research', name: 'Quantum Research', members: 89, unread: 5, active: true },
    { id: 'ai-development', name: 'AI Development', members: 134, unread: 23, active: true },
    { id: 'policy-updates', name: 'Policy Updates', members: 176, unread: 8, active: true },
    { id: 'infrastructure', name: 'Infrastructure', members: 92, unread: 3, active: false }
  ]
});

export const useTerminalCommands = () => {
  const commands = [
    // ============ HELP & GENERAL ============
    {
      name: 'help',
      aliases: ['h', '?', 'man'],
      description: 'Display all available commands',
      usage: 'help [command]',
      category: 'help',
      handler: async (args: string[]) => {
        if (args[0]) {
          const cmd = commands.find(c => c.name === args[0] || c.aliases.includes(args[0]));
          if (!cmd) {
            return [{ type: 'error', content: `Command not found: ${args[0]}` }];
          }
          return [
            { type: 'success', content: `📘 ${cmd.name} - ${cmd.description}` },
            { type: 'code', content: `Usage: ${cmd.usage}` },
            cmd.aliases.length > 0 ? { type: 'info', content: `Aliases: ${cmd.aliases.join(', ')}` } : null,
          ].filter(Boolean) as Message[];
        }

        const categories = Array.from(new Set(commands.map(c => c.category)));
        const help: Message[] = [
          { type: 'success', content: '📚 Available Commands' },
          { type: 'system', content: '' },
        ];

        categories.forEach(category => {
          help.push({ type: 'info', content: `━━━ ${category.toUpperCase()} ━━━` });
          commands
            .filter(c => c.category === category)
            .forEach(cmd => {
              const aliases = cmd.aliases.length ? ` (${cmd.aliases.join(', ')})` : '';
              help.push({ 
                type: 'list', 
                content: `  ${cmd.name}${aliases} - ${cmd.description}` 
              });
            });
          help.push({ type: 'system', content: '' });
        });

        help.push({ type: 'info', content: 'Type: help <command> for detailed info' });
        return help;
      },
    },
    
    {
      name: 'whoami',
      aliases: ['who', 'user', 'me'],
      description: 'Display current user information',
      usage: 'whoami',
      category: 'general',
      handler: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          return [{
            type: 'info',
            content: '👤 Guest User\nRole: Visitor\nAccess Level: Public\n\nLogin to access full features'
          }];
        }
        return [{
          type: 'success',
          content: `👤 User Profile\n\nEmail: ${user.email}\nID: ${user.id.substring(0, 8)}...\nLast Sign In: ${new Date(user.last_sign_in_at || '').toLocaleString()}\nRole: Member\nAccess: Full`
        }];
      }
    },
    
    {
      name: 'clear',
      aliases: ['cls', 'c', 'reset'],
      description: 'Clear terminal screen',
      usage: 'clear',
      category: 'general',
      handler: async (args: string[], context: TerminalContext) => {
        context.clearMessages();
        return [];
      }
    },
    
    {
      name: 'history',
      aliases: ['hist', 'h'],
      description: 'Show command history',
      usage: 'history [limit]',
      category: 'general',
      handler: async (args: string[]) => {
        const limit = args[0] ? parseInt(args[0]) : 15;
        const { data, error } = await supabase
          .from('command_logs')
          .select('command, created_at, status')
          .order('created_at', { ascending: false })
          .limit(limit);
        
        if (error || !data || data.length === 0) {
          return [{ type: 'info', content: 'No command history found' }];
        }
        
        const historyList = data.map((log, i) => {
          const statusIcon = log.status === 'success' ? '✓' : '✗';
          return `${(i + 1).toString().padStart(3)}. ${statusIcon} ${log.command} - ${new Date(log.created_at).toLocaleTimeString()}`;
        }).join('\n');
        
        return [{
          type: 'code',
          content: `📜 Command History (last ${limit}):\n\n${historyList}`
        }];
      }
    },
    
    {
      name: 'search',
      aliases: ['find', 's', 'grep'],
      description: 'Search across projects, commands, and data',
      usage: 'search <query>',
      category: 'general',
      handler: async (args: string[], context: TerminalContext) => {
        const query = args.join(' ');
        if (!query) {
          return [{ type: 'error', content: 'Usage: search <query>' }];
        }
        
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .or(`name.ilike.%${query}%,description.ilike.%${query}%`);
        
        if (error || !data || data.length === 0) {
          return [{ type: 'info', content: `🔍 No results found for \"${query}\"` }];
        }
        
        const results = data.map((p, i) => 
          `${i + 1}. ${p.name} (${p.status})\n   ${p.description || 'No description'}`
        ).join('\n\n');
        
        return [{
          type: 'success',
          content: `🔍 Search Results for \"${query}\":\n\n${results}\n\nTotal: ${data.length} match(es)`
        }];
      }
    },
    
    // ============ ANALYTICS COMMANDS ============
    {
      name: 'trending',
      aliases: ['trends', 'hot', 'popular'],
      description: 'Show trending topics and projects',
      usage: 'trending',
      category: 'analytics',
      handler: async () => {
        const data = generateRandomData();
        const trendingList = data.trending.map((item, i) => 
          `${i + 1}. ${item.name} (${item.category})\n   📈 Growth: ${item.growth}`
        ).join('\n\n');
        
        return [{
          type: 'success',
          content: `🔥 Trending Topics & Projects:\n\n${trendingList}\n\n⏰ Updated: ${new Date().toLocaleString()}`
        }];
      }
    },
    
    {
      name: 'budget',
      aliases: ['budgets', 'spending', 'finances', 'money'],
      description: 'View budget and financial information',
      usage: 'budget [overview|project-name]',
      category: 'analytics',
      handler: async (args: string[]) => {
        const data = generateRandomData();
        
        if (args[0] && args[0] !== 'overview') {
          const project = data.budget.projects.find(p => 
            p.name.toLowerCase().includes(args[0].toLowerCase())
          );
          
          if (project) {
            const spent = project.spent;
            const budget = project.budget;
            const remaining = budget - spent;
            const percentUsed = ((spent / budget) * 100).toFixed(1);
            const bar = '█'.repeat(Math.floor(parseInt(percentUsed) / 5)) + '░'.repeat(20 - Math.floor(parseInt(percentUsed) / 5));
            
            return [{
              type: 'success',
              content: `💰 Budget: ${project.name}\n\n${bar} ${percentUsed}%\n\nAllocated: $${budget.toLocaleString()}\nSpent: $${spent.toLocaleString()}\nRemaining: $${remaining.toLocaleString()}\n\nStatus: ${remaining > 0 ? '✓ On Track' : '⚠ Over Budget'}`
            }];
          }
          return [{ type: 'error', content: `Project \"${args[0]}\" not found in budget` }];
        }
        
        const projectList = data.budget.projects.map(p => {
          const percentUsed = ((p.spent / p.budget) * 100).toFixed(0);
          const bar = '█'.repeat(Math.floor(parseInt(percentUsed) / 10)) + '░'.repeat(10 - Math.floor(parseInt(percentUsed) / 10));
          return `• ${p.name}\n  ${bar} ${percentUsed}%\n  $${p.spent.toLocaleString()} / $${p.budget.toLocaleString()}`;
        }).join('\n\n');
        
        return [{
          type: 'success',
          content: `💰 Total Budget Overview\n\nAllocated: $${data.budget.allocated.toLocaleString()}\nSpent: $${data.budget.spent.toLocaleString()}\nRemaining: $${data.budget.remaining.toLocaleString()}\n\n━━━ Project Breakdown ━━━\n\n${projectList}`
        }];
      }
    },
    
    {
      name: 'status',
      aliases: ['stat', 'health', 'ping'],
      description: 'Show system and project status',
      usage: 'status [project-id]',
      category: 'analytics',
      handler: async (args: string[], context: TerminalContext) => {
        if (args[0]) {
          const { data: project } = await supabase
            .from('projects')
            .select('*')
            .eq('id', args[0])
            .single();
          
          if (!project) {
            return [{ type: 'error', content: `Project ${args[0]} not found` }];
          }
          
          return [{
            type: 'success',
            content: `📊 Project Status: ${project.name}\n\nStatus: ${project.status}\nCreated: ${new Date(project.created_at).toLocaleDateString()}\nLast Updated: ${new Date(project.updated_at).toLocaleDateString()}\nTags: ${project.tags?.join(', ') || 'None'}`
          }];
        }
        
        const data = generateRandomData();
        return [{
          type: 'success',
          content: `🟢 System Status: Operational\n\n⚡ Performance:\nUptime: ${data.metrics.uptime}\nLatency: ${data.metrics.latency}\nThroughput: ${data.metrics.throughput}\nError Rate: ${data.metrics.errorRate}\n\n💻 Resources:\nCPU: ${data.metrics.cpu}\nRAM: ${data.metrics.ram}\nConnections: ${data.metrics.connections}\n\n✓ Database: Online\n✓ API: Healthy\n✓ Storage: Available\n\n⏰ Last Check: ${new Date().toLocaleTimeString()}`
        }];
      }
    },
    
    {
      name: 'analytics',
      aliases: ['stats', 'metrics', 'data'],
      description: 'View comprehensive analytics dashboard',
      usage: 'analytics [overview|users|budget|performance]',
      category: 'analytics',
      handler: async (args: string[]) => {
        const type = args[0] || 'overview';
        const data = generateRandomData();
        
        if (type === 'users') {
          return [{
            type: 'table',
            content: JSON.stringify({
              headers: ['Department', 'Active Users', 'Growth'],
              rows: [
                ['Research', '89', '+12%'],
                ['Development', '134', '+23%'],
                ['Policy', '176', '+8%'],
                ['Operations', '92', '+15%']
              ]
            })
          }];
        }
        
        if (type === 'budget') {
          return [{
            type: 'table',
            content: JSON.stringify({
              headers: ['Project', 'Budget', 'Spent', 'Remaining'],
              rows: data.budget.projects.map(p => [
                p.name,
                `$${(p.budget / 1000).toFixed(0)}k`,
                `$${(p.spent / 1000).toFixed(0)}k`,
                `$${((p.budget - p.spent) / 1000).toFixed(0)}k`
              ])
            })
          }];
        }
        
        if (type === 'performance') {
          return [{
            type: 'success',
            content: `⚡ Performance Metrics\n\nUptime: ${data.metrics.uptime}\nAvg Latency: ${data.metrics.latency}\nThroughput: ${data.metrics.throughput}\nError Rate: ${data.metrics.errorRate}\n\n📈 Trend: Improving`
          }];
        }
        
        return [{
          type: 'table',
          content: JSON.stringify({
            headers: ['Metric', 'Value', 'Change'],
            rows: [
              ['Active Projects', '12', '+3 ↑'],
              ['Team Members', '247', '+15 ↑'],
              ['Total Budget', '$2.5M', '+15% ↑'],
              ['Completed Tasks', '1,847', '+234 ↑'],
              ['System Uptime', '99.97%', 'Stable →']
            ]
          })
        }];
      }
    },
    
    {
      name: 'metrics',
      aliases: ['performance', 'perf', 'monitor'],
      description: 'Show real-time system performance',
      usage: 'metrics',
      category: 'analytics',
      handler: async () => {
        const data = generateRandomData();
        return [{
          type: 'success',
          content: `📊 System Performance\n\n⚡ ${data.metrics.uptime} Uptime\n🚀 ${data.metrics.latency} Latency\n📡 ${data.metrics.throughput} Throughput\n❌ ${data.metrics.errorRate} Error Rate\n💻 ${data.metrics.cpu} CPU\n🧠 ${data.metrics.ram} RAM\n\n✓ All systems nominal`
        }];
      }
    },
    
    // ============ OPERATIONS COMMANDS ============
    {
      name: 'deploy',
      aliases: ['ship', 'release', 'launch'],
      description: 'Deploy project to production',
      usage: 'deploy <project-id>',
      category: 'operations',
      handler: async (args: string[], context: TerminalContext) => {
        if (!args[0]) {
          return [{ type: 'error', content: 'Usage: deploy <project-id>' }];
        }
        
        const { data: project } = await supabase
          .from('projects')
          .select('*')
          .eq('id', args[0])
          .single();
        
        if (!project) {
          return [{ type: 'error', content: `Project ${args[0]} not found` }];
        }
        
        const messages: Message[] = [];
        messages.push({ type: 'info', content: `🚀 Deploying: ${project.name}` });
        messages.push({ type: 'loading', content: 'Building application...' });
        
        setTimeout(async () => {
          await context.addMessage({ type: 'success', content: '✓ Build completed (3.2s)' });
          await context.addMessage({ type: 'loading', content: 'Running tests...' });
          
          setTimeout(async () => {
            await context.addMessage({ type: 'success', content: '✓ All 127 tests passed (1.8s)' });
            await context.addMessage({ type: 'loading', content: 'Deploying to production...' });
            
            setTimeout(async () => {
              await context.addMessage({ 
                type: 'success', 
                content: `✓ Deployment Successful!\n\nProject: ${project.name}\nURL: https://${project.name.toLowerCase().replace(/\s+/g, '-')}.app\nStatus: 🟢 Live\nBuild ID: ${Math.random().toString(36).substr(2, 8)}\nDeployed: ${new Date().toLocaleString()}` 
              });
            }, 1500);
          }, 1500);
        }, 1500);
        
        return messages;
      }
    },
    
    {
      name: 'logs',
      aliases: ['log', 'tail', 'console'],
      description: 'View system and project logs',
      usage: 'logs [project-id] [--error|--warn|--info]',
      category: 'operations',
      handler: async (args: string[]) => {
        const filter = args.find(a => a.startsWith('--'))?.replace('--', '') || 'all';
        const projectId = args.find(a => !a.startsWith('--'));
        
        let logContent = '';
        const now = new Date();
        
        if (projectId) {
          const { data } = await supabase
            .from('command_logs')
            .select('*')
            .eq('project_id', projectId)
            .order('created_at', { ascending: false })
            .limit(20);
          
          if (data && data.length > 0) {
            logContent = data.map(log => 
              `[${new Date(log.created_at).toLocaleTimeString()}] ${log.status.toUpperCase()}: ${log.command}`
            ).join('\n');
          } else {
            logContent = 'No logs found for this project';
          }
        } else {
          const logs = [
            `[${now.toLocaleTimeString()}] INFO: System initialized`,
            `[${new Date(now.getTime() - 60000).toLocaleTimeString()}] SUCCESS: Database connection established`,
            `[${new Date(now.getTime() - 120000).toLocaleTimeString()}] INFO: Authentication module loaded`,
            `[${new Date(now.getTime() - 180000).toLocaleTimeString()}] SUCCESS: API endpoints registered`,
            `[${new Date(now.getTime() - 240000).toLocaleTimeString()}] WARN: High memory usage detected (78%)`,
            `[${new Date(now.getTime() - 300000).toLocaleTimeString()}] INFO: Background jobs scheduled`,
            `[${new Date(now.getTime() - 360000).toLocaleTimeString()}] SUCCESS: Deployment completed`,
            `[${new Date(now.getTime() - 420000).toLocaleTimeString()}] INFO: Cache warmed up`,
            `[${new Date(now.getTime() - 480000).toLocaleTimeString()}] SUCCESS: Service started`,
            `[${new Date(now.getTime() - 540000).toLocaleTimeString()}] INFO: Configuration loaded`
          ];
          
          logContent = filter === 'all' 
            ? logs.join('\n')
            : logs.filter(log => log.toLowerCase().includes(filter.toLowerCase())).join('\n');
        }
        
        return [{
          type: 'code',
          content: `📜 System Logs\n\n${logContent || 'No logs match the filter'}`
        }];
      }
    },
    
    {
      name: 'monitor',
      aliases: ['watch', 'live'],
      description: 'Monitor system in real-time',
      usage: 'monitor',
      category: 'operations',
      handler: async () => {
        const data = generateRandomData();
        return [{
          type: 'success',
          content: `🔍 Real-Time System Monitor\n\n💻 CPU: ${data.metrics.cpu} | 🧠 RAM: ${data.metrics.ram}\n📊 Active Connections: ${data.metrics.connections}\n🌐 Bandwidth: ↓ 245 Mb/s | ↑ 89 Mb/s\n💾 Disk I/O: 124 MB/s\n\n⚡ Latency: ${data.metrics.latency}\n📈 Uptime: ${data.metrics.uptime}\n\n✓ All services healthy\n\nPress Ctrl+C to stop monitoring`
        }];
      }
    },
    
    {
      name: 'restart',
      aliases: ['reboot', 'reload'],
      description: 'Restart a service or system',
      usage: 'restart [service]',
      category: 'operations',
      handler: async (args: string[]) => {
        const service = args[0] || 'system';
        return [
          { type: 'loading', content: `Restarting ${service}...` },
          { type: 'success', content: `✓ ${service} restarted successfully` }
        ];
      }
    },
    
    // ============ COLLABORATION COMMANDS ============
    {
      name: 'channels',
      aliases: ['ch', 'rooms'],
      description: 'List and manage communication channels',
      usage: 'channels [list|join <id>|create <name>]',
      category: 'collaboration',
      handler: async (args: string[]) => {
        const data = generateRandomData();
        const action = args[0];
        
        if (action === 'list' || !action) {
          const channelList = data.channels.map(ch => {
            const statusIcon = ch.active ? '🟢' : '⚪';
            const unreadBadge = ch.unread > 0 ? ` (${ch.unread} unread)` : '';
            return `${statusIcon} #${ch.name}${unreadBadge}\n   ${ch.members} members | ID: ${ch.id}`;
          }).join('\n\n');
          
          return [{
            type: 'success',
            content: `💬 Available Channels:\n\n${channelList}\n\n━━━━━━━━━━━━━━━━━━━━\nUse: channels join <id> to join`
          }];
        }
        
        if (action === 'join' && args[1]) {
          const channel = data.channels.find(ch => ch.id === args[1]);
          if (!channel) {
            return [{ type: 'error', content: `Channel '${args[1]}' not found` }];
          }
          return [{
            type: 'success',
            content: `✓ Joined #${channel.name}\n\n${channel.members} members online\n${channel.unread} unread messages`
          }];
        }
        
        if (action === 'create' && args[1]) {
          return [{
            type: 'success',
            content: `✓ Channel #${args[1]} created!\n\nYou are now the admin.\nUse '@user' to invite members`
          }];
        }
        
        return [{
          type: 'info',
          content: 'Usage: channels [list|join <id>|create <name>]'
        }];
      }
    },
    
    {
      name: 'team',
      aliases: ['members', 'users', 'people'],
      description: 'View and manage team members',
      usage: 'team [list|invite|remove]',
      category: 'collaboration',
      handler: async (args: string[]) => {
        const action = args[0] || 'list';
        
        if (action === 'list') {
          return [{
            type: 'table',
            content: JSON.stringify({
              headers: ['Name', 'Role', 'Status', 'Projects'],
              rows: [
                ['Dr. Sarah Chen', 'Lead Researcher', '🟢 Online', '8'],
                ['Michael Torres', 'Developer', '🟢 Online', '12'],
                ['Dr. Emily Park', 'Policy Advisor', '🟡 Away', '5'],
                ['James Wilson', 'Operations', '🔴 Offline', '7'],
                ['Maria Garcia', 'Data Scientist', '🟢 Online', '9']
              ]
            })
          }];
        }
        
        if (action === 'invite' && args[1]) {
          return [{
            type: 'success',
            content: `✓ Invitation sent to ${args[1]}\n\nThey will receive an email with access instructions.`
          }];
        }
        
        return [{
          type: 'info',
          content: 'Usage: team [list|invite <email>|remove <id>]'
        }];
      }
    },
    
    {
      name: 'notify',
      aliases: ['alert', 'ping', 'message'],
      description: 'Send notification to user or channel',
      usage: 'notify <user|channel> <message>',
      category: 'collaboration',
      handler: async (args: string[]) => {
        if (args.length < 2) {
          return [{ type: 'error', content: 'Usage: notify <user|channel> <message>' }];
        }
        const target = args[0];
        const message = args.slice(1).join(' ');
        return [{
          type: 'success',
          content: `✓ Notification sent to @${target}\n\nMessage: \"${message}\"\n\nDelivered: ${new Date().toLocaleTimeString()}`
        }];
      }
    },
    
    // ============ PROJECT MANAGEMENT ============
    {
      name: 'new',
      aliases: ['create', 'init', 'make'],
      description: 'Create a new project',
      usage: 'new <name> [--desc=\"\"] [--tags=tag1,tag2]',
      category: 'project',
      handler: async (args: string[], context: TerminalContext) => {
        const nameArgs = args.filter(a => !a.startsWith('--'));
        const projectName = nameArgs.join(' ');
        
        if (!projectName) {
          return [{ type: 'error', content: 'Usage: new <name> [--desc=\"\"] [--tags=]' }];
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          return [{ type: 'error', content: 'Please login first to create projects' }];
        }

        const descArg = args.find(a => a.startsWith('--desc='));
        const tagsArg = args.find(a => a.startsWith('--tags='));
        
        const description = descArg 
          ? descArg.split('=')[1].replace(/['"]/g, '')
          : `New project: ${projectName}`;
        
        const tags = tagsArg
          ? tagsArg.split('=')[1].split(',').map(t => t.trim())
          : [];

        const { data, error } = await supabase
          .from('projects')
          .insert({
            name: projectName,
            user_id: user.id,
            status: 'active',
            description,
            tags
          })
          .select()
          .single();

        if (error) {
          return [{ type: 'error', content: `Failed: ${error.message}` }];
        }

        toast.success(`Project \"${projectName}\" created`);
        return [{
          type: 'success',
          content: `✓ Project \"${projectName}\" created!\n\nID: ${data.id}\nStatus: ${data.status}\nTags: ${tags.join(', ') || 'None'}\n\nUse 'open ${data.id}' to switch to this project`
        }];
      }
    },

    {
      name: 'list',
      aliases: ['ls', 'projects', 'ps', 'all'],
      description: 'List all projects',
      usage: 'list [--status=active] [--limit=50]',
      category: 'project',
      handler: async (args: string[]) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          return [{ type: 'error', content: 'Please login to view projects' }];
        }

        const statusArg = args.find(a => a.startsWith('--status='));
        const limitArg = args.find(a => a.startsWith('--limit='));
        
        const status = statusArg ? statusArg.split('=')[1] : null;
        const limit = limitArg ? parseInt(limitArg.split('=')[1]) : 50;

        let query = supabase
          .from('projects')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false })
          .limit(limit);
        
        if (status) {
          query = query.eq('status', status);
        }

        const { data: projects, error } = await query;

        if (error) {
          return [{ type: 'error', content: `Failed: ${error.message}` }];
        }

        if (!projects || projects.length === 0) {
          return [{ type: 'info', content: 'No projects found. Use \"new <name>\" to create one' }];
        }

        const projectList = projects.map((p, i) => {
          const statusIcon = p.status === 'active' ? '🟢' : p.status === 'archived' ? '📦' : '⏸️';
          const tagsStr = p.tags && p.tags.length > 0 ? ` [${p.tags.join(', ')}]` : '';
          return `${(i + 1).toString().padStart(2)}. ${statusIcon} ${p.name}${tagsStr}\n    ID: ${p.id} | ${new Date(p.updated_at).toLocaleDateString()}`;
        }).join('\n\n');

        return [{
          type: 'success',
          content: `📁 Projects (${projects.length} total):\n\n${projectList}\n\n━━━━━━━━━━━━━━━━━━━━\nUse 'open <id>' to switch`
        }];
      }
    },

    {
      name: 'open',
      aliases: ['switch', 'use', 'cd', 'select'],
      description: 'Switch to a project',
      usage: 'open <project-id|name>',
      category: 'project',
      handler: async (args: string[], context: TerminalContext) => {
        const identifier = args.join(' ');
        if (!identifier) {
          if (!context.currentProject) {
            return [{ type: 'info', content: 'No project open. Use: open <id|name>' }];
          }
          return [{
            type: 'info',
            content: `Currently in: ${context.currentProject.name}\n${context.currentProject.description || 'No description'}`
          }];
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          return [{ type: 'error', content: 'Please login first' }];
        }

        let query = supabase
          .from('projects')
          .select('*')
          .eq('user_id', user.id);
        
        if (identifier.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
          query = query.eq('id', identifier);
        } else {
          query = query.ilike('name', `%${identifier}%`);
        }

        const { data: projects, error } = await query;

        if (error || !projects || projects.length === 0) {
          return [{ type: 'error', content: `Project not found: ${identifier}` }];
        }

        const project = projects[0];
        context.switchProject(project.id);
        toast.success(`Switched to ${project.name}`);
        
        return [{
          type: 'success',
          content: `✓ Opened: ${project.name}\n\nStatus: ${project.status}\nID: ${project.id}\nCreated: ${new Date(project.created_at).toLocaleDateString()}\nTags: ${project.tags?.join(', ') || 'None'}`
        }];
      }
    },

    {
      name: 'info',
      aliases: ['show', 'details', 'describe'],
      description: 'Show project details',
      usage: 'info [project-id]',
      category: 'project',
      handler: async (args: string[], context: TerminalContext) => {
        const projectId = args[0] || context.currentProjectId;
        
        if (!projectId) {
          return [{ type: 'error', content: 'No project selected' }];
        }

        const { data: project, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single();

        if (error || !project) {
          return [{ type: 'error', content: `Project not found: ${projectId}` }];
        }

        return [{
          type: 'success',
          content: `📋 ${project.name}\n\nID: ${project.id}\nStatus: ${project.status}\nDescription: ${project.description || 'None'}\nTags: ${project.tags?.join(', ') || 'None'}\nGitHub: ${project.github_url || 'Not linked'}\n\nCreated: ${new Date(project.created_at).toLocaleString()}\nUpdated: ${new Date(project.updated_at).toLocaleString()}`
        }];
      }
    },

    {
      name: 'edit',
      aliases: ['update', 'modify', 'change'],
      description: 'Edit project properties',
      usage: 'edit <id> [--name=\"\"] [--desc=\"\"] [--status=] [--tags=]',
      category: 'project',
      handler: async (args: string[]) => {
        const projectId = args.find(a => !a.startsWith('--'));
        if (!projectId) {
          return [{ type: 'error', content: 'Usage: edit <id> [options]' }];
        }

        const nameArg = args.find(a => a.startsWith('--name='));
        const descArg = args.find(a => a.startsWith('--desc='));
        const statusArg = args.find(a => a.startsWith('--status='));
        const tagsArg = args.find(a => a.startsWith('--tags='));

        const updates: any = {};
        if (nameArg) updates.name = nameArg.split('=')[1].replace(/['"]/g, '');
        if (descArg) updates.description = descArg.split('=')[1].replace(/['"]/g, '');
        if (statusArg) updates.status = statusArg.split('=')[1];
        if (tagsArg) updates.tags = tagsArg.split('=')[1].split(',').map(t => t.trim());

        if (Object.keys(updates).length === 0) {
          return [{ type: 'error', content: 'No updates specified' }];
        }

        const { data, error } = await supabase
          .from('projects')
          .update(updates)
          .eq('id', projectId)
          .select()
          .single();

        if (error) {
          return [{ type: 'error', content: `Failed: ${error.message}` }];
        }

        toast.success('Project updated');
        return [{
          type: 'success',
          content: `✓ Project updated!\n\n${Object.entries(updates).map(([k, v]) => `${k}: ${v}`).join('\n')}`
        }];
      }
    },

    {
      name: 'delete',
      aliases: ['remove', 'rm', 'del'],
      description: 'Delete a project',
      usage: 'delete <id> [--force]',
      category: 'project',
      handler: async (args: string[], context: TerminalContext) => {
        const projectId = args.find(a => !a.startsWith('--'));
        const force = args.includes('--force');
        
        if (!projectId) {
          return [{ type: 'error', content: 'Usage: delete <id> [--force]' }];
        }

        const { data: project } = await supabase
          .from('projects')
          .select('name')
          .eq('id', projectId)
          .single();

        if (!project) {
          return [{ type: 'error', content: `Project ${projectId} not found` }];
        }

        if (!force) {
          return [{
            type: 'info',
            content: `⚠️ Delete \"${project.name}\" permanently?\n\nUse 'delete ${projectId} --force' to confirm`
          }];
        }

        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', projectId);

        if (error) {
          return [{ type: 'error', content: `Failed: ${error.message}` }];
        }

        if (context.currentProjectId === projectId) {
          context.switchProject(null);
        }

        toast.success(`Project \"${project.name}\" deleted`);
        return [{ type: 'success', content: `✓ Deleted: ${project.name}` }];
      }
    },

    // ============ GIT COMMANDS ============
    {
      name: 'git',
      aliases: [],
      description: 'Git version control commands',
      usage: 'git <command> [args]',
      category: 'git',
      handler: async (args: string[], context: TerminalContext) => {
        const subcommand = args[0];
        if (!subcommand) {
          return [{ type: 'info', content: 'Usage: git <clone|status|commit|push|pull|branch|checkout>' }];
        }

        switch (subcommand) {
          case 'clone': {
            const repo = args[1];
            if (!repo) {
              return [{ type: 'error', content: 'Usage: git clone <repository-url>' }];
            }
            return [{ type: 'success', content: `Cloning into '${repo.split('/').pop()}'...\n✓ Clone completed` }];
          }
          case 'status': {
            return [{ type: 'success', content: 'On branch main\nYour branch is up to date with \'origin/main\'.\n\nnothing to commit, working tree clean' }];
          }
          case 'commit': {
            const messageArg = args.find(a => a.startsWith('-m'));
            if (!messageArg) {
              return [{ type: 'error', content: 'Usage: git commit -m "message"' }];
            }
            const message = messageArg.replace('-m', '').trim().replace(/['"]/g, '');
            return [{ type: 'success', content: `[main abc1234] ${message}\n 1 file changed, 10 insertions(+)` }];
          }
          case 'push': {
            return [{ type: 'success', content: 'Pushing to origin main...\n✓ Push successful' }];
          }
          case 'pull': {
            return [{ type: 'success', content: 'Pulling from origin main...\nAlready up to date.' }];
          }
          case 'branch': {
            return [{ type: 'success', content: '* main\n  feature-x\n  bugfix-123' }];
          }
          case 'checkout': {
            const branch = args[1];
            if (!branch) {
              return [{ type: 'error', content: 'Usage: git checkout <branch>' }];
            }
            return [{ type: 'success', content: `Switched to branch '${branch}'` }];
          }
          default:
            return [{ type: 'error', content: `Unknown git command: ${subcommand}` }];
        }
      }
    },
    
    // ============ FUN & EASTER EGGS ============
    {
      name: 'quantum',
      aliases: ['qsim', 'q'],
      description: 'Run quantum simulation',
      usage: 'quantum [simulate|entangle|measure]',
      category: 'general',
      handler: async (args: string[]) => {
        const action = args[0] || 'simulate';
        
        if (action === 'simulate') {
          return [{
            type: 'success',
            content: `🌌 Quantum Simulator v2.1\n\nInitializing circuit...\nQubits: 5 | Gates: H, CNOT, T\n\nRunning... ████████████ 100%\n\nState Vector:\n|00000⟩: 0.3162\n|00001⟩: 0.2236\n|10000⟩: 0.4472\n|11111⟩: 0.1826\n\nEntanglement: 2.14 bits\nDepth: 12 | Fidelity: 98.7%\n\n✓ Simulation complete!`
          }];
        }
        
        if (action === 'entangle') {
          return [{
            type: 'success',
            content: `🔗 Quantum Entanglement\n\nQubit 0 ⟷ Qubit 1: Entangled\nCorrelation: 0.9876\nBell State: |Φ⁺⟩\n\n"Spooky action!" - Einstein`
          }];
        }
        
        return [{
          type: 'success',
          content: `📏 Measurement\n\nCollapsing...\nResult: |1⟩\nProbability: 64.3%\n\n✓ Wavefunction collapsed!`
        }];
      }
    },
    
    {
      name: 'fortune',
      aliases: ['quote'],
      description: 'Random inspirational quote',
      usage: 'fortune',
      category: 'general',
      handler: async () => {
        const quotes = [
          '"The future belongs to those who prepare for it today." - Malcolm X',
          '"Innovation distinguishes between a leader and a follower." - Steve Jobs',
          '"The only way to do great work is to love what you do." - Steve Jobs',
          '"Quantum mechanics: The dreams stuff is made of." - Steven Wright',
          '"In the middle of difficulty lies opportunity." - Einstein'
        ];
        return [{ type: 'info', content: `💭 ${quotes[Math.floor(Math.random() * quotes.length)]}` }];
      }
    },
    
    {
      name: 'joke',
      aliases: ['funny', 'lol'],
      description: 'Random tech joke',
      usage: 'joke',
      category: 'general',
      handler: async () => {
        const jokes = [
          'Why do programmers prefer dark mode?\nBecause light attracts bugs! 🐛',
          'What do you call a programmer from Finland?\nNerdic! 🇫🇮',
          "Why don't quantum physicists get lost?\nThey're in superposition! ⚛️",
          'How many programmers for a light bulb?\nNone. It\'s hardware! 💡'
        ];
        return [{ type: 'info', content: `😄 ${jokes[Math.floor(Math.random() * jokes.length)]}` }];
      }
    },
    
    {
      name: 'weather',
      aliases: ['forecast'],
      description: 'Show weather (demo)',
      usage: 'weather [city]',
      category: 'general',
      handler: async (args: string[]) => {
        const city = args.join(' ') || 'Philadelphia';
        return [{
          type: 'success',
          content: `🌤️ ${city}\n\nTemp: 72°F (22°C)\nConditions: Partly Cloudy\nHumidity: 65%\nWind: 8 mph NW\n\n✓ Clear skies ahead!`
        }];
      }
    },
    
    {
      name: 'cowsay',
      aliases: ['cow'],
      description: 'Make the cow speak',
      usage: 'cowsay <message>',
      category: 'general',
      handler: async (args: string[]) => {
        const msg = args.join(' ') || 'Hello!';
        return [{
          type: 'code',
          content: ` ${'_'.repeat(msg.length + 2)}\n< ${msg} >\n ${'‾'.repeat(msg.length + 2)}\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`
        }];
      }
    },
    
    {
      name: 'matrix',
      aliases: ['neo'],
      description: 'Enter the Matrix',
      usage: 'matrix',
      category: 'general',
      handler: async () => {
        return [{
          type: 'success',
          content: `Wake up, Neo...\n\nThe Matrix has you...\n\n🐰 Follow the white rabbit\n\nKnock, knock, Neo.`
        }];
      }
    },
    
    {
      name: 'hack',
      aliases: ['hacker', 'elite'],
      description: 'Hacker mode',
      usage: 'hack',
      category: 'general',
      handler: async () => {
        return [{
          type: 'success',
          content: `[HACKER MODE]\n\nInitializing...\n✓ Firewall bypassed\n✓ Mainframe accessed\n\n> You're in. 😎\n\nJK! Stay ethical 🛡️`
        }];
      }
    },
  ] as Command[];

  const executeCommand = useCallback(
    async (input: string, context: TerminalContext): Promise<Message[]> => {
      const trimmed = input.trim();
      if (!trimmed) return [];

      const parts = trimmed.split(/\s+/);
      const commandName = parts[0].toLowerCase();
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

        // Log command execution
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

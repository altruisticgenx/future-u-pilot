import { useEffect, useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Terminal, FolderPlus, FolderOpen, Search, Trash2, Edit, GitBranch, HelpCircle } from 'lucide-react';
import { Command as CommandType } from '@/types/terminal';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  commands: CommandType[];
  onCommandSelect: (commandName: string) => void;
}

const commandIcons: Record<string, any> = {
  help: HelpCircle,
  new: FolderPlus,
  open: FolderOpen,
  find: Search,
  delete: Trash2,
  edit: Edit,
  git: GitBranch,
  list: Terminal,
  clear: Terminal,
};

export const CommandPalette = ({ open, onOpenChange, commands, onCommandSelect }: CommandPaletteProps) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const categories = Array.from(new Set(commands.map(c => c.category)));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-2xl" style={{ backgroundColor: 'hsl(var(--terminal-surface))' }}>
        <Command className="border-0">
          <CommandInput 
            placeholder="Search commands..." 
            value={search}
            onValueChange={setSearch}
            className="border-0"
            style={{ 
              backgroundColor: 'hsl(var(--terminal-bg))',
              color: 'hsl(var(--terminal-text))'
            }}
          />
          <CommandList style={{ backgroundColor: 'hsl(var(--terminal-surface))' }}>
            <CommandEmpty style={{ color: 'hsl(var(--terminal-text))' }}>
              No commands found.
            </CommandEmpty>
            {categories.map((category) => {
              const categoryCommands = commands.filter(c => c.category === category);
              return (
                <CommandGroup 
                  key={category} 
                  heading={category.toUpperCase()}
                  className="text-xs"
                  style={{ color: 'hsl(var(--cmd-info))' }}
                >
                  {categoryCommands.map((command) => {
                    const Icon = commandIcons[command.name] || Terminal;
                    return (
                      <CommandItem
                        key={command.name}
                        onSelect={() => {
                          onCommandSelect(`/${command.name}`);
                          onOpenChange(false);
                          setSearch('');
                        }}
                        className="flex items-center gap-3 cursor-pointer"
                        style={{ color: 'hsl(var(--terminal-text))' }}
                      >
                        <Icon className="h-4 w-4" style={{ color: 'hsl(var(--cmd-success))' }} />
                        <div className="flex-1">
                          <div className="font-mono">/{command.name}</div>
                          <div className="text-xs opacity-60">{command.description}</div>
                        </div>
                        {command.aliases.length > 0 && (
                          <div className="text-xs opacity-40">
                            {command.aliases.map(a => `/${a}`).join(', ')}
                          </div>
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              );
            })}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

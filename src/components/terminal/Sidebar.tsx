import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Folder, FolderOpen, Plus, Search, Activity } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/types/terminal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  currentProjectId: string | null;
  onProjectSelect: (project: Project) => void;
  onNewProject: () => void;
}

export const Sidebar = ({ currentProjectId, onProjectSelect, onNewProject }: SidebarProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();

    const channel = supabase
      .channel('projects-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'projects',
      }, () => {
        fetchProjects();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('updated_at', { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
    setLoading(false);
  };

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'hsl(var(--cmd-success))';
      case 'planning':
        return 'hsl(var(--cmd-warning))';
      case 'completed':
        return 'hsl(var(--cmd-info))';
      default:
        return 'hsl(var(--terminal-text))';
    }
  };

  return (
    <div 
      className="w-full h-full flex flex-col bg-terminal-surface border-terminal-border"
    >
      <div className="p-3 sm:p-4 border-b border-terminal-border">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-cmd-success" />
          <h2 className="text-base sm:text-lg font-semibold text-terminal-text">
            Projects
          </h2>
        </div>
        
        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4 text-terminal-text/50" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-7 sm:pl-8 bg-transparent border-terminal-border text-terminal-text text-sm placeholder:text-terminal-text/40"
              aria-label="Search projects"
            />
          </div>
          <Button
            size="icon"
            onClick={onNewProject}
            className="flex-shrink-0 h-9 w-9 bg-cmd-success text-terminal-bg hover:bg-cmd-success/90"
            aria-label="Create new project"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {loading ? (
            <div className="p-4 text-center text-xs sm:text-sm text-terminal-text/50">
              Loading projects...
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="p-4 text-center text-xs sm:text-sm text-terminal-text/50">
              {searchQuery ? 'No matching projects' : 'No projects yet'}
            </div>
          ) : (
            filteredProjects.map((project) => {
              const isActive = currentProjectId === project.id;
              return (
                <motion.button
                  key={project.id}
                  onClick={() => onProjectSelect(project)}
                  whileHover={{ x: 4 }}
                  className={`w-full text-left p-2.5 sm:p-3 rounded-lg transition-all hover:bg-terminal-border/50 ${
                    isActive ? 'bg-terminal-border' : ''
                  }`}
                  aria-pressed={isActive}
                  aria-label={`Select project ${project.name}`}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    {isActive ? (
                      <FolderOpen className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5 text-cmd-success" />
                    ) : (
                      <Folder className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5 text-terminal-text/50" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                        <p className="font-mono text-xs sm:text-sm font-medium truncate text-terminal-text">
                          {project.name}
                        </p>
                        <Badge 
                          variant="outline" 
                          className="text-[10px] sm:text-xs flex-shrink-0 px-1 sm:px-2 border-current"
                          style={{ 
                            color: getStatusColor(project.status)
                          }}
                        >
                          {project.status}
                        </Badge>
                      </div>
                      {project.description && (
                        <p className="text-[10px] sm:text-xs truncate text-terminal-text/60">
                          {project.description}
                        </p>
                      )}
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5 sm:mt-2">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span 
                              key={tag}
                              className="text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 rounded bg-terminal-bg text-syntax-keyword"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

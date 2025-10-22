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
      className="w-full h-full flex flex-col border-r"
      style={{ 
        backgroundColor: 'hsl(var(--terminal-surface))',
        borderColor: 'hsl(var(--terminal-border))'
      }}
    >
      <div className="p-4 border-b" style={{ borderColor: 'hsl(var(--terminal-border))' }}>
        <div className="flex items-center gap-2 mb-3">
          <Activity className="h-5 w-5" style={{ color: 'hsl(var(--cmd-success))' }} />
          <h2 className="text-lg font-semibold" style={{ color: 'hsl(var(--terminal-text))' }}>
            Projects
          </h2>
        </div>
        
        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 opacity-50" style={{ color: 'hsl(var(--terminal-text))' }} />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 bg-transparent border"
              style={{ 
                borderColor: 'hsl(var(--terminal-border))',
                color: 'hsl(var(--terminal-text))'
              }}
            />
          </div>
          <Button
            size="icon"
            onClick={onNewProject}
            className="flex-shrink-0"
            style={{ 
              backgroundColor: 'hsl(var(--cmd-success))',
              color: 'hsl(var(--terminal-bg))'
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {loading ? (
            <div className="p-4 text-center text-sm" style={{ color: 'hsl(var(--terminal-text))', opacity: 0.5 }}>
              Loading projects...
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="p-4 text-center text-sm" style={{ color: 'hsl(var(--terminal-text))', opacity: 0.5 }}>
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
                  className="w-full text-left p-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor: isActive ? 'hsl(var(--terminal-border))' : 'transparent',
                  }}
                >
                  <div className="flex items-start gap-3">
                    {isActive ? (
                      <FolderOpen className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: 'hsl(var(--cmd-success))' }} />
                    ) : (
                      <Folder className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: 'hsl(var(--terminal-text))', opacity: 0.5 }} />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p 
                          className="font-mono text-sm font-medium truncate"
                          style={{ color: 'hsl(var(--terminal-text))' }}
                        >
                          {project.name}
                        </p>
                        <Badge 
                          variant="outline" 
                          className="text-xs flex-shrink-0"
                          style={{ 
                            borderColor: getStatusColor(project.status),
                            color: getStatusColor(project.status)
                          }}
                        >
                          {project.status}
                        </Badge>
                      </div>
                      {project.description && (
                        <p 
                          className="text-xs truncate"
                          style={{ color: 'hsl(var(--terminal-text))', opacity: 0.6 }}
                        >
                          {project.description}
                        </p>
                      )}
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span 
                              key={tag}
                              className="text-xs px-1.5 py-0.5 rounded"
                              style={{ 
                                backgroundColor: 'hsl(var(--terminal-bg))',
                                color: 'hsl(var(--syntax-keyword))'
                              }}
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

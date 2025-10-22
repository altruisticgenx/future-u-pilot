import { ReactNode } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface TerminalLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export const TerminalLayout = ({ sidebar, children }: TerminalLayoutProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="h-screen flex flex-col bg-terminal-bg">
        <div 
          className="flex items-center justify-between p-3 border-b border-terminal-border bg-terminal-surface/95 backdrop-blur-sm sticky top-0 z-10"
        >
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-terminal-text hover:bg-terminal-border/50"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="left" 
                className="p-0 w-[85vw] max-w-sm bg-terminal-surface border-terminal-border"
              >
                {sidebar}
              </SheetContent>
            </Sheet>
            <h1 
              className="text-base sm:text-lg font-mono font-bold text-cmd-success"
            >
              quantum-terminal
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden xs:block text-xs font-mono text-terminal-text/50">
              ⌘K
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-terminal-bg">
      <div className="w-80 h-full flex-shrink-0 border-r border-terminal-border">
        {sidebar}
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div 
          className="flex items-center justify-between px-6 py-4 border-b border-terminal-border bg-terminal-surface"
        >
          <h1 
            className="text-xl font-mono font-bold text-cmd-success"
          >
            quantum-terminal
          </h1>
          <div className="text-sm font-mono text-terminal-text/50">
            Press <kbd className="px-2 py-1 rounded bg-terminal-border text-terminal-text">⌘ K</kbd> for command palette
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

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
      <div className="h-screen flex flex-col bg-terminal-bg overflow-hidden">
        <div 
          className="flex items-center justify-between p-2.5 sm:p-3 border-b border-terminal-border bg-terminal-surface/95 glass-light sticky top-0 z-10 min-h-[50px]"
        >
          <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-terminal-text hover:bg-terminal-border/50 h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"
                >
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="left" 
                className="p-0 w-[85vw] max-w-sm bg-terminal-surface border-terminal-border overflow-y-auto"
              >
                {sidebar}
              </SheetContent>
            </Sheet>
            <h1 
              className="text-sm sm:text-base md:text-lg font-mono font-bold text-cmd-success truncate"
            >
              quantum-terminal
            </h1>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="hidden xs:inline-block text-[10px] sm:text-xs font-mono text-terminal-text/50 px-1.5 py-0.5 rounded bg-terminal-border/30">
              ⌘K
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-terminal-bg overflow-hidden">
      <div className="w-64 lg:w-80 h-full flex-shrink-0 border-r border-terminal-border overflow-y-auto">
        {sidebar}
      </div>
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <div 
          className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-terminal-border bg-terminal-surface"
        >
          <h1 
            className="text-lg md:text-xl font-mono font-bold text-cmd-success"
          >
            quantum-terminal
          </h1>
          <div className="hidden md:block text-sm font-mono text-terminal-text/50">
            Press <kbd className="px-2 py-1 rounded bg-terminal-border text-terminal-text">⌘ K</kbd> for command palette
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

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
      <div className="h-screen flex flex-col" style={{ backgroundColor: 'hsl(var(--terminal-bg))' }}>
        <div 
          className="flex items-center justify-between p-4 border-b"
          style={{ 
            backgroundColor: 'hsl(var(--terminal-surface))',
            borderColor: 'hsl(var(--terminal-border))'
          }}
        >
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  style={{ color: 'hsl(var(--terminal-text))' }}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="left" 
                className="p-0 w-80"
                style={{ backgroundColor: 'hsl(var(--terminal-surface))' }}
              >
                {sidebar}
              </SheetContent>
            </Sheet>
            <h1 
              className="text-lg font-mono font-bold"
              style={{ color: 'hsl(var(--cmd-success))' }}
            >
              Terminal
            </h1>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex" style={{ backgroundColor: 'hsl(var(--terminal-bg))' }}>
      <div className="w-80 h-full flex-shrink-0">
        {sidebar}
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div 
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ 
            backgroundColor: 'hsl(var(--terminal-surface))',
            borderColor: 'hsl(var(--terminal-border))'
          }}
        >
          <h1 
            className="text-xl font-mono font-bold"
            style={{ color: 'hsl(var(--cmd-success))' }}
          >
            Terminal
          </h1>
          <div className="text-sm font-mono" style={{ color: 'hsl(var(--terminal-text))', opacity: 0.5 }}>
            Press <kbd className="px-2 py-1 rounded" style={{ backgroundColor: 'hsl(var(--terminal-border))' }}>⌘ K</kbd> for command palette
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

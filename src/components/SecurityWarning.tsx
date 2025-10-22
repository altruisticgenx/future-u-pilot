import { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isDevelopment } from '@/lib/security';

export const SecurityWarning = () => {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if warning was previously dismissed
    const wasDismissed = localStorage.getItem('security-warning-dismissed');
    if (wasDismissed === 'true') {
      setDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('security-warning-dismissed', 'true');
  };

  // Only show in development and if not dismissed
  if (!isDevelopment || dismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md animate-in slide-in-from-bottom-5">
      <Alert variant="destructive" className="bg-orange-500/10 border-orange-500/50 text-orange-500">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle className="flex items-center justify-between">
          Development Mode - Security Notice
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-orange-500/20"
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
          </Button>
        </AlertTitle>
        <AlertDescription className="text-xs mt-2">
          This application currently operates without authentication. All data is public. 
          Before deploying to production, implement authentication and RLS policies.
          <br />
          <a 
            href="#security" 
            className="underline hover:text-orange-400 mt-1 inline-block"
            onClick={(e) => {
              e.preventDefault();
              // Scroll to security section in README or open documentation
              console.log('See README.md Security Considerations section');
            }}
          >
            Learn more about security setup
          </a>
        </AlertDescription>
      </Alert>
    </div>
  );
};

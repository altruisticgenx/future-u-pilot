import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { checkColorContrast } from '@/lib/accessibility';

interface ContrastWarningProps {
  foreground: string;
  background: string;
  text: string;
}

export const ContrastWarning = ({ foreground, background, text }: ContrastWarningProps) => {
  const [show, setShow] = useState(false);
  const [contrast, setContrast] = useState({ ratio: 0, level: '' });

  useEffect(() => {
    if (import.meta.env.DEV) {
      const result = checkColorContrast(foreground, background);
      setContrast(result);
      setShow(result.level === 'FAIL');
    }
  }, [foreground, background]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'c') {
        setShow((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!import.meta.env.DEV || !show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm p-4 bg-cmd-warning/90 backdrop-blur-sm rounded-lg border-2 border-cmd-error shadow-lg">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-cmd-error flex-shrink-0 mt-0.5" />
        <div className="flex-1 text-sm">
          <div className="font-bold text-foreground mb-1">
            Contrast Warning
          </div>
          <div className="text-xs text-foreground/80 space-y-1">
            <p>Text: "{text.substring(0, 30)}..."</p>
            <p>Ratio: {contrast.ratio.toFixed(2)}:1</p>
            <p>Level: {contrast.level}</p>
            <p className="pt-2 border-t border-foreground/20">
              Press Alt+C to toggle warnings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

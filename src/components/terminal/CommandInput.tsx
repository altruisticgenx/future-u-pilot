import { useState, useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useCommandHistory } from '@/hooks/useCommandHistory';

interface CommandInputProps {
  onSubmit: (command: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const CommandInput = ({ onSubmit, disabled = false, placeholder = 'Type help or /help for commands...' }: CommandInputProps) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToHistory, navigateHistory, resetIndex } = useCommandHistory();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      addToHistory(input);
      onSubmit(input.trim());
      setInput('');
      resetIndex();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const cmd = navigateHistory('up');
      if (cmd !== null) setInput(cmd);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const cmd = navigateHistory('down');
      if (cmd !== null) setInput(cmd);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-terminal-border sticky bottom-0 glass-light bg-terminal-surface/95">
      <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-4">
        <Terminal className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-cmd-success" />
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 font-mono text-sm sm:text-base text-terminal-text placeholder:text-syntax-comment"
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </form>
  );
};

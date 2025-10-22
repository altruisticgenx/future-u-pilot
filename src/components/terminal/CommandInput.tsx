import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useCommandHistory } from '@/hooks/useCommandHistory';
import { TerminalPrompt } from './TerminalPrompt';

interface CommandInputProps {
  onSubmit: (command: string) => void;
  disabled?: boolean;
  placeholder?: string;
  projectName?: string;
}

export const CommandInput = ({ onSubmit, disabled = false, placeholder = 'Type /help for commands...', projectName }: CommandInputProps) => {
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
    <form onSubmit={handleSubmit} className="border-t" style={{ borderColor: 'hsl(var(--terminal-border))' }}>
      <div className="flex items-center gap-3 p-4" style={{ backgroundColor: 'hsl(var(--terminal-surface))' }}>
        <TerminalPrompt projectName={projectName} />
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 font-mono"
          style={{ color: 'hsl(var(--terminal-text))' }}
          autoComplete="off"
        />
      </div>
    </form>
  );
};

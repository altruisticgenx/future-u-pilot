import { useEffect, useState } from "react";

interface TerminalPromptProps {
  projectName?: string;
}

export const TerminalPrompt = ({ projectName }: TerminalPromptProps) => {
  const [currentPath, setCurrentPath] = useState("~");
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimestamp(now.toLocaleTimeString('en-US', { hour12: false }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (projectName) {
      setCurrentPath(`~/projects/${projectName}`);
    } else {
      setCurrentPath("~");
    }
  }, [projectName]);

  return (
    <div 
      className="font-mono text-sm flex items-center gap-2 select-none"
      style={{ color: 'hsl(var(--terminal-text))' }}
    >
      <span style={{ color: 'hsl(var(--cmd-success))' }} className="font-semibold">
        user@quantum
      </span>
      <span style={{ color: 'hsl(var(--terminal-text))', opacity: 0.5 }}>
        [{timestamp}]
      </span>
      <span style={{ color: 'hsl(var(--cmd-warning))' }}>
        {currentPath}
      </span>
      <span style={{ color: 'hsl(var(--primary))' }} className="font-bold">
        $
      </span>
    </div>
  );
};

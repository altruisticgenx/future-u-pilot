import { useState, useEffect } from 'react';

export const CyberpunkTerminalWidget = () => {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const commands = [
    { cmd: 'system.init()', output: '✓ Quantum matrix initialized' },
    { cmd: 'profile.load("developer")', output: '✓ Loading neural interface...' },
    { cmd: 'skills.query()', output: 'React • TypeScript • Node.js • AI/ML' },
    { cmd: 'status.check()', output: 'SYSTEM ONLINE - All circuits nominal' }
  ];

  useEffect(() => {
    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < commands.length) {
        setIsTyping(true);
        setTimeout(() => {
          setTerminalLines(prev => [
            ...prev,
            `C:\\> ${commands[lineIndex].cmd}`,
            commands[lineIndex].output
          ]);
          setIsTyping(false);
          lineIndex++;
        }, 800);
      } else {
        clearInterval(interval);
      }
    }, 1600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="perspective-1000 w-full max-w-4xl mx-auto p-6"
      data-theme="terminal"
    >
      {/* Main Terminal Container */}
      <div className="ambient-light glass-card-3d elevation-4 rounded-xl p-6 bg-[hsl(var(--terminal-bg))] border-2 border-[hsl(var(--terminal-border))]">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[hsl(var(--terminal-border)/0.3)]">
          <div className="flex items-center gap-4">
            <h1 className="glitch-text text-2xl md:text-3xl font-mono font-bold text-[hsl(var(--primary))]">
              NEO-PROFILE v5.1
            </h1>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[hsl(var(--cmd-error))] animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-[hsl(var(--cmd-warning))]"></div>
              <div className="w-3 h-3 rounded-full bg-[hsl(var(--cmd-success))] animate-pulse"></div>
            </div>
          </div>
          
          {/* Status Bar with Shimmer */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--terminal-surface))] border border-[hsl(var(--primary)/0.3)]">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--cmd-success))] animate-pulse"></div>
            <span className="text-xs font-mono text-[hsl(var(--primary))] animate-shimmer bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--primary-glow))] to-[hsl(var(--primary))] bg-clip-text text-transparent">
              CONNECTION ACTIVE
            </span>
          </div>
        </div>

        {/* Command Output Panel with Glassmorphism */}
        <div className="glass-card-3d elevation-3 rounded-lg p-6 mb-6 bg-[hsl(var(--terminal-surface)/0.5)] backdrop-blur-xl min-h-[300px] scrollbar-thin overflow-y-auto max-h-[400px]">
          <div className="font-mono text-sm space-y-2">
            {/* Welcome Message */}
            <div className="text-[hsl(var(--terminal-text))] mb-4">
              <span className="text-[hsl(var(--primary))]">&gt;&gt;&gt;</span> NEURAL INTERFACE ACTIVE
            </div>
            <div className="text-[hsl(var(--terminal-text)/0.7)] text-xs mb-6">
              Initializing quantum protocols...
            </div>

            {/* Terminal Lines */}
            {terminalLines.map((line, idx) => (
              <div
                key={idx}
                className={`
                  ${line.startsWith('C:\\>') 
                    ? 'text-[hsl(var(--cmd-info))] font-bold' 
                    : line.includes('✓') 
                      ? 'text-[hsl(var(--cmd-success))] pl-6' 
                      : 'text-[hsl(var(--terminal-text))] pl-6'
                  }
                `}
              >
                {line}
              </div>
            ))}

            {isTyping && (
              <div className="text-[hsl(var(--primary))] flex items-center gap-2">
                <span>▋</span>
                <span className="animate-pulse">Processing...</span>
              </div>
            )}

            {/* Profile Data Display */}
            {terminalLines.length >= commands.length * 2 && (
              <div className="mt-6 pt-6 border-t border-[hsl(var(--terminal-border)/0.3)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[hsl(var(--syntax-keyword))]">const</span>{' '}
                    <span className="text-[hsl(var(--primary))]">name</span>{' '}
                    <span className="text-[hsl(var(--terminal-text))]">=</span>{' '}
                    <span className="text-[hsl(var(--syntax-string))]">"Quantum Developer"</span>
                  </div>
                  <div>
                    <span className="text-[hsl(var(--syntax-keyword))]">const</span>{' '}
                    <span className="text-[hsl(var(--primary))]">role</span>{' '}
                    <span className="text-[hsl(var(--terminal-text))]">=</span>{' '}
                    <span className="text-[hsl(var(--syntax-string))]">"Full Stack Engineer"</span>
                  </div>
                  <div>
                    <span className="text-[hsl(var(--syntax-keyword))]">const</span>{' '}
                    <span className="text-[hsl(var(--primary))]">experience</span>{' '}
                    <span className="text-[hsl(var(--terminal-text))]">=</span>{' '}
                    <span className="text-[hsl(var(--syntax-number))]">5+</span>{' '}
                    <span className="text-[hsl(var(--terminal-text))]">years</span>
                  </div>
                  <div>
                    <span className="text-[hsl(var(--syntax-keyword))]">const</span>{' '}
                    <span className="text-[hsl(var(--primary))]">status</span>{' '}
                    <span className="text-[hsl(var(--terminal-text))]">=</span>{' '}
                    <span className="text-[hsl(var(--cmd-success))]">AVAILABLE</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <button 
            className="btn-3d-teal press-scale px-6 py-3 rounded-lg font-mono text-sm focus-halo"
            onClick={() => console.log('Run protocol')}
            aria-label="Run quantum protocol"
          >
            <span className="flex items-center gap-2">
              <span>▶</span> RUN PROTOCOL
            </span>
          </button>
          
          <button 
            className="btn-3d-purple press-scale px-6 py-3 rounded-lg font-mono text-sm focus-halo"
            onClick={() => console.log('View matrix')}
            aria-label="View neural matrix"
          >
            <span className="flex items-center gap-2">
              <span>◈</span> VIEW MATRIX
            </span>
          </button>
          
          <button 
            className="btn-3d-gold press-scale px-6 py-3 rounded-lg font-mono text-sm focus-halo"
            onClick={() => console.log('Download data')}
            aria-label="Download system data"
          >
            <span className="flex items-center gap-2">
              <span>↓</span> EXTRACT DATA
            </span>
          </button>
        </div>

        {/* System Info Footer */}
        <div className="mt-6 pt-4 border-t border-[hsl(var(--terminal-border)/0.3)] flex flex-wrap gap-4 justify-between items-center text-xs font-mono">
          <div className="flex items-center gap-4 text-[hsl(var(--terminal-text)/0.6)]">
            <span>KERNEL: v2077.5</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">UPTIME: 42d 13h</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--cmd-success))] animate-pulse"></div>
            <span className="text-[hsl(var(--cmd-success))]">ALL SYSTEMS NOMINAL</span>
          </div>
        </div>
      </div>

      {/* Floating Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {[
          { label: 'PROJECTS', value: '47', color: 'var(--cmd-success)' },
          { label: 'COMMITS', value: '2.8K', color: 'var(--cmd-info)' },
          { label: 'UPTIME', value: '99.8%', color: 'var(--cmd-warning)' },
          { label: 'STARS', value: '1.2K', color: 'var(--primary)' }
        ].map((stat, idx) => (
          <div
            key={idx}
            className="glass-card-3d hover-3d-lift elevation-2 rounded-lg p-4 bg-[hsl(var(--terminal-surface)/0.3)] border border-[hsl(var(--terminal-border)/0.3)] text-center"
          >
            <div className={`text-2xl font-bold font-mono mb-1`} style={{ color: `hsl(${stat.color})` }}>
              {stat.value}
            </div>
            <div className="text-xs font-mono text-[hsl(var(--terminal-text)/0.6)]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message } from '@/types/terminal';
import { Terminal, CheckCircle2, XCircle, Info, Code, List, Loader2 } from 'lucide-react';

interface MessageStreamProps {
  messages: Message[];
}

const MessageIcon = ({ type }: { type: Message['type'] }) => {
  const iconProps = { className: 'h-4 w-4 flex-shrink-0 mt-0.5' };
  
  switch (type) {
    case 'user':
      return <Terminal {...iconProps} style={{ color: 'hsl(var(--cmd-info))' }} />;
    case 'success':
      return <CheckCircle2 {...iconProps} style={{ color: 'hsl(var(--cmd-success))' }} />;
    case 'error':
      return <XCircle {...iconProps} style={{ color: 'hsl(var(--cmd-error))' }} />;
    case 'code':
      return <Code {...iconProps} style={{ color: 'hsl(var(--syntax-keyword))' }} />;
    case 'list':
      return <List {...iconProps} style={{ color: 'hsl(var(--terminal-text))' }} />;
    case 'loading':
      return <Loader2 {...iconProps} className="animate-spin" style={{ color: 'hsl(var(--cmd-info))' }} />;
    default:
      return <Info {...iconProps} style={{ color: 'hsl(var(--terminal-text))' }} />;
  }
};

const MessageBubble = ({ message, index }: { message: Message; index: number }) => {
  const getMessageStyle = () => {
    switch (message.type) {
      case 'user':
        return { color: 'hsl(var(--cmd-info))' };
      case 'success':
        return { color: 'hsl(var(--cmd-success))' };
      case 'error':
        return { color: 'hsl(var(--cmd-error))' };
      case 'code':
        return { 
          color: 'hsl(var(--syntax-string))',
          backgroundColor: 'hsl(var(--terminal-surface))',
          padding: '0.75rem',
          borderRadius: '0.375rem',
          fontFamily: 'monospace',
        };
      case 'list':
        return { color: 'hsl(var(--terminal-text))', opacity: 0.9 };
      default:
        return { color: 'hsl(var(--terminal-text))', opacity: 0.8 };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.02 }}
      className="flex gap-3 py-2 px-4 hover:bg-white/5 transition-colors"
    >
      <MessageIcon type={message.type} />
      <div className="flex-1 font-mono text-sm whitespace-pre-wrap break-words" style={getMessageStyle()}>
        {message.content}
      </div>
      {message.timestamp && (
        <span className="text-xs opacity-50 flex-shrink-0" style={{ color: 'hsl(var(--terminal-text))' }}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      )}
    </motion.div>
  );
};

export const MessageStream = ({ messages }: MessageStreamProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div 
      className="flex-1 overflow-y-auto p-4 space-y-1" 
      style={{ backgroundColor: 'hsl(var(--terminal-bg))' }}
    >
      <AnimatePresence>
        {messages.map((message, index) => (
          <MessageBubble key={message.id || index} message={message} index={index} />
        ))}
      </AnimatePresence>
      <div ref={bottomRef} />
    </div>
  );
};

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message } from '@/types/terminal';
import { Terminal, CheckCircle2, XCircle, Info, Code, List, Loader2 } from 'lucide-react';

interface MessageStreamProps {
  messages: Message[];
}

const MessageIcon = ({ type }: { type: Message['type'] }) => {
  const iconProps = { className: 'h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 mt-0.5' };
  
  switch (type) {
    case 'user':
      return <Terminal {...iconProps} className={`${iconProps.className} text-cmd-info`} />;
    case 'success':
      return <CheckCircle2 {...iconProps} className={`${iconProps.className} text-cmd-success`} />;
    case 'error':
      return <XCircle {...iconProps} className={`${iconProps.className} text-cmd-error`} />;
    case 'code':
      return <Code {...iconProps} className={`${iconProps.className} text-syntax-keyword`} />;
    case 'list':
      return <List {...iconProps} className={`${iconProps.className} text-terminal-text`} />;
    case 'loading':
      return <Loader2 {...iconProps} className={`${iconProps.className} animate-spin text-cmd-info`} />;
    default:
      return <Info {...iconProps} className={`${iconProps.className} text-terminal-text`} />;
  }
};

const MessageBubble = ({ message, index }: { message: Message; index: number }) => {
  const getMessageStyle = () => {
    switch (message.type) {
      case 'user':
        return 'text-cmd-info font-semibold';
      case 'success':
        return 'text-cmd-success';
      case 'error':
        return 'text-cmd-error';
      case 'code':
        return 'text-syntax-string bg-terminal-surface px-3 py-2 rounded';
      case 'list':
        return 'text-terminal-text/90';
      case 'loading':
        return 'text-cmd-info animate-pulse';
      default:
        return 'text-terminal-text/80';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.15, delay: Math.min(index * 0.01, 0.3) }}
      className="flex gap-1.5 sm:gap-2 md:gap-3 py-1 sm:py-1.5 md:py-2 px-1 sm:px-2 md:px-4 hover:bg-white/5 rounded-sm transition-colors group"
    >
      <MessageIcon type={message.type} />
      <div className={`flex-1 font-mono text-[10px] sm:text-xs md:text-sm whitespace-pre-wrap break-words ${getMessageStyle()}`}>
        {message.content}
      </div>
      {message.timestamp && (
        <span className="text-[10px] sm:text-xs opacity-0 group-hover:opacity-50 transition-opacity flex-shrink-0 text-terminal-text hidden sm:inline">
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
      className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 space-y-0.5 bg-terminal-bg scrollbar-thin scrollbar-thumb-terminal-border scrollbar-track-transparent"
    >
      <AnimatePresence mode="popLayout">
        {messages.map((message, index) => (
          <MessageBubble key={message.id || index} message={message} index={index} />
        ))}
      </AnimatePresence>
      <div ref={bottomRef} className="h-2 sm:h-4" />
    </div>
  );
};

import { motion } from "framer-motion";
import type { TerminalWindowProps } from "@/types/hero";

/**
 * 3D animated terminal window component
 * Displays cycling command output with scanline effect
 */
export const TerminalWindow = ({
  cmdIndex,
  commands,
  animationsReady,
  prefersReducedMotion
}: TerminalWindowProps) => {
  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
      transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 0.3 }}
      className="relative w-full"
      whileHover={prefersReducedMotion ? {} : {
        rotateY: 5,
        rotateX: -2,
        transition: { duration: 0.3 }
      }}
      style={{ perspective: '1000px' }}
      role="complementary"
      aria-label="Terminal command output demonstration"
    >
      <motion.div
        className="rounded-lg backdrop-blur-md bg-card/60 border border-border/50 shadow-xl overflow-hidden max-w-md mx-auto"
        animate={prefersReducedMotion ? {} : {
          y: [0, -10, 0],
          transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
        style={{
          minHeight: '200px',
          boxShadow: '0 0 40px hsl(173 80% 40% / 0.3), 0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Terminal header */}
        <div className="bg-muted/50 border-b border-border/50 px-2 sm:px-3 py-1.5 sm:py-2 flex items-center gap-2">
          <div className="flex gap-1 sm:gap-1.5" role="presentation">
            <div 
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500" 
              aria-label="Close button"
            />
            <div 
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-500"
              aria-label="Minimize button"
            />
            <div 
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse"
              aria-label="Maximize button - active"
            />
          </div>
          <span className="text-[10px] sm:text-xs text-muted-foreground ml-1 sm:ml-2 font-mono">
            quantum.sh
          </span>
        </div>
        
        {/* Terminal content with scanline effect */}
        <div className="relative p-2 sm:p-3 font-mono text-[9px] xs:text-[10px] sm:text-xs min-h-[160px] sm:min-h-[200px] bg-terminal-bg/50 overflow-hidden">
          {/* Scanline animation overlay */}
          {animationsReady && !prefersReducedMotion && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(0deg, transparent 0%, hsl(173 80% 60% / 0.05) 50%, transparent 100%)',
                height: '100%',
              }}
              animate={{
                y: ['-100%', '200%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              aria-hidden="true"
            />
          )}
          <div 
            className="relative z-10 space-y-0.5 sm:space-y-1"
            role="log"
            aria-live="polite"
            aria-atomic="false"
          >
            {commands.slice(0, Math.min(cmdIndex + 1, 8)).map((cmd, i) => (
              <motion.div
                key={i}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                transition={prefersReducedMotion ? {} : { delay: i * 0.05 }}
                className={`leading-relaxed ${
                  cmd.startsWith('$') ? 'text-cmd-info font-bold' :
                  cmd.startsWith('⚡') || cmd.startsWith('🤖') || cmd.startsWith('🔬') ? 'text-cmd-warning' :
                  cmd.startsWith('✓') ? 'text-cmd-success' :
                  'text-terminal-text/50'
                }`}
              >
                {cmd}
              </motion.div>
            ))}
            <span 
              className="inline-block w-1 h-2.5 sm:w-1.5 sm:h-3 bg-cmd-success animate-pulse"
              aria-label="Terminal cursor"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Terminal, ArrowRight, Zap, Code, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TerminalCTA() {
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden bg-gradient-to-br from-emerald-950/30 via-background to-emerald-950/20">
      {/* Scanline effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(0deg,transparent_0%,rgba(0,255,0,0.1)_50%,transparent_100%)] bg-[length:100%_4px] animate-[scan_8s_linear_infinite]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-3 gap-8 items-center"
        >
          {/* Left: Terminal Icon */}
          <div className="flex justify-center lg:justify-start">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
              <div className="relative p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                <Terminal className="h-16 w-16 text-emerald-400" />
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute bottom-8 right-8 w-1 h-6 bg-emerald-400"
                />
              </div>
            </motion.div>
          </div>

          {/* Center: Content */}
          <div className="lg:col-span-1 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 font-mono">
              <span className="text-emerald-400">$</span> Launch Terminal
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Explore live data, run quantum simulations, and query policy compliance in real-time.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <Zap className="h-4 w-4" />
                <span className="font-mono">Real-time</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <Code className="h-4 w-4" />
                <span className="font-mono">Interactive</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <Database className="h-4 w-4" />
                <span className="font-mono">Live Data</span>
              </div>
            </div>
          </div>

          {/* Right: CTA Button */}
          <div className="flex justify-center lg:justify-end">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-lg px-8 py-6 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all"
              asChild
            >
              <Link to="/terminal">
                Launch Terminal
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Bottom hint text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-sm text-muted-foreground font-mono"
        >
          Try commands like <code className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400">help</code>, 
          <code className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 ml-2">list-projects</code>, or 
          <code className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 ml-2">quantum-status</code>
        </motion.p>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}

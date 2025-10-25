import { motion } from "framer-motion";
import { Terminal, Code, Database, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const TerminalCTA = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card-3d rounded-xl overflow-hidden bg-gradient-to-br from-terminal-bg via-terminal-surface to-terminal-bg border border-terminal-border shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
    >
      <div className="relative p-6 sm:p-8">
        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,transparent_50%,hsl(var(--terminal-text))_50%,hsl(var(--terminal-text))_100%)] bg-[length:100%_4px] animate-scan" />
        </div>

        <div className="relative grid md:grid-cols-[1fr,auto] gap-6 items-center">
          {/* Left: Icon + Content */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20 border border-primary/40">
                <Terminal className="w-6 h-6 text-primary" />
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-4 bg-primary animate-pulse" />
                <span className="text-xs text-terminal-text/50 font-mono">_</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-terminal-text mb-2">
                Terminal (For Builders)
              </h3>
              <p className="text-sm text-terminal-text/70 leading-relaxed mb-3">
                Spin up datasets, run pilots, and generate model cards from your browser.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-terminal-surface border border-terminal-border text-xs text-terminal-text/80">
                  <Code className="w-3 h-3 text-cmd-success" />
                  <span>No secrets in client</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-terminal-surface border border-terminal-border text-xs text-terminal-text/80">
                  <Database className="w-3 h-3 text-cmd-info" />
                  <span>No vendor lock-in</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-terminal-surface border border-terminal-border text-xs text-terminal-text/80">
                  <Terminal className="w-3 h-3 text-cmd-warning" />
                  <span>Open source</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: CTA Button */}
          <div>
            <Button
              size="lg"
              className="btn-3d-primary text-sm sm:text-base font-semibold group"
              onClick={() => navigate('/terminal')}
            >
              Launch Terminal
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

import { Cloud, Cpu } from "lucide-react";
import { useLocalAI } from "@/contexts/LocalAIContext";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const AIModeToggle = () => {
  const { mode, setMode, webgpuCapabilities } = useLocalAI();

  const isLocalAvailable = webgpuCapabilities?.available ?? false;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative inline-flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMode(mode === 'cloud' ? 'local' : 'cloud')}
              disabled={!isLocalAvailable && mode === 'cloud'}
              className={cn(
                "relative font-mono text-xs transition-all duration-300",
                mode === 'local' && "text-primary"
              )}
            >
              {mode === 'cloud' ? (
                <>
                  <Cloud className="w-4 h-4 mr-2" />
                  <span>Cloud AI</span>
                  {isLocalAvailable && (
                    <motion.div
                      className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-blue-500"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </>
              ) : (
                <>
                  <Cpu className="w-4 h-4 mr-2" />
                  <span>Local AI</span>
                  <motion.div
                    className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-primary"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </>
              )}
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="font-mono text-xs">
          {!isLocalAvailable ? (
            <div className="space-y-1">
              <p className="font-semibold text-yellow-500">WebGPU Not Available</p>
              <p className="text-muted-foreground">
                {webgpuCapabilities?.reason || 'Local AI requires WebGPU support'}
              </p>
              <p className="text-xs">Using Cloud AI</p>
            </div>
          ) : mode === 'cloud' ? (
            <div className="space-y-1">
              <p className="font-semibold">Cloud Mode</p>
              <p className="text-muted-foreground">Using Lovable AI Gateway</p>
              <p className="text-xs text-primary">Click to switch to Local AI →</p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="font-semibold text-primary">Local Mode</p>
              <p className="text-muted-foreground">100% private, on-device AI</p>
              <p className="text-xs">← Click to switch to Cloud AI</p>
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

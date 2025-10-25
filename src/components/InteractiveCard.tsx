import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, ChevronDown, ChevronUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InteractiveCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  highlights?: string[];
  detailedContent?: string;
  color?: string;
  index?: number;
}

export const InteractiveCard = ({
  icon: Icon,
  title,
  subtitle,
  description,
  highlights,
  detailedContent,
  color = "from-primary/15 via-accent/10 to-primary/15",
  index = 0,
}: InteractiveCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      className="h-full"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div 
        className={`glass-card-3d rounded-xl overflow-hidden h-full bg-gradient-to-br ${color} border border-primary/20 relative`}
        whileHover={{ 
          y: -8,
          rotateY: 2,
          rotateX: 2,
          scale: 1.02,
          boxShadow: "0 20px 60px hsl(var(--primary) / 0.3), 0 10px 30px hsl(var(--primary) / 0.2)"
        }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translateZ(0)'
        }}
      >
        <div className="p-6 space-y-4" style={{ transform: 'translateZ(20px)' }}>
          {/* Header */}
          <div className="flex items-start gap-4">
            <motion.div 
              className="p-3 rounded-lg bg-primary/10 border border-primary/20"
              whileHover={{
                rotate: [0, -15, 15, -15, 0],
                scale: 1.1
              }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-6 h-6 text-primary" />
            </motion.div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground">{title}</h3>
              <p className="text-sm text-foreground/70 font-medium">{subtitle}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-foreground/90 leading-relaxed">{description}</p>

          {/* Expandable Summary */}
          {highlights && highlights.length > 0 && (
            <div className="space-y-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <span>Key Highlights</span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 overflow-hidden"
                  >
                    {highlights.map((highlight, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-2 text-sm text-foreground/80"
                      >
                        <span className="text-primary mt-1">•</span>
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Modal Trigger */}
          {detailedContent && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full mt-4 hover-3d-lift">
                  Learn More
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <DialogTitle className="text-xl">{title}</DialogTitle>
                      <DialogDescription>{subtitle}</DialogDescription>
                    </div>
                  </div>
                </DialogHeader>
                <div className="space-y-4 text-sm">
                  <p className="text-foreground/90 leading-relaxed">{description}</p>
                  {detailedContent && (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: detailedContent }} />
                    </div>
                  )}
                  {highlights && highlights.length > 0 && (
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3">Key Highlights:</h4>
                      <ul className="space-y-2">
                        {highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary mt-1">✓</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* 3D depth indicator */}
        <motion.div
          className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-primary/40"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

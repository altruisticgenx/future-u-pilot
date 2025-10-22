import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const terminalLines = [
  "> Initializing Quantum/AI Consultancy Platform…",
  "> Loading quantum computing frameworks…",
  "> Connecting to research partnerships…",
  "> Scanning public-sector implementation protocols…",
  "> Analyzing organizational readiness for quantum technologies…",
  "> Establishing quantum-safe cryptography protocols…",
  "> Syncing with institutional databases…",
  "> System ready. Empowering practical quantum/AI adoption.",
];

export const Hero = () => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex < terminalLines.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, terminalLines[currentLineIndex]]);
        setCurrentLineIndex((prev) => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
      }, 3000);
      return () => clearTimeout(resetTimer);
    }
  }, [currentLineIndex]);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  const navigateToProposals = () => {
    window.location.href = "/proposals";
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {/* Background gradient with animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10 animate-gradient" />
      
      {/* Floating orbs for depth */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        animate={{
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Status tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
            >
              <span
                className="w-2 h-2 rounded-full bg-primary animate-pulse-soft"
              />
              <span className="text-sm font-medium text-primary">
                Experiment status: active
              </span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-foreground">B2B Consultancy</span>
                <span className="block bg-gradient-hero bg-clip-text text-transparent">
                  For The Quantum-AI Era
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl">
                We help organizations adapt to quantum computing and AI with practical, test-bed consulting—turning pilots into reusable, reliable systems.
              </p>
              
              <p className="text-sm text-muted-foreground italic">
                Quantum is coming. AI's already here. We help you not panic.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="text-base group shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all hover:scale-105"
              >
                Book Strategy Session
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={navigateToProposals}
                className="text-base group border-2 hover:scale-105 transition-transform"
                aria-label="View our proposals"
              >
                <Play className="mr-2 h-5 w-5" />
                Proposals
              </Button>
            </div>
          </motion.div>

          {/* Right column - Terminal with 3D effect */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative perspective-1000"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="rounded-2xl backdrop-blur-md bg-card/60 border border-border/50 shadow-2xl overflow-hidden"
              whileHover={{
                rotateY: 2,
                rotateX: -2,
              }}
              transition={{ duration: 0.3 }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Terminal header */}
              <div className="bg-muted/50 border-b border-border/50 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm text-muted-foreground ml-2 font-mono">
                  quantum-ai-platform.sh
                </span>
              </div>
              
              {/* Terminal content */}
              <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-2 min-h-[250px] sm:min-h-[300px]">
                {displayedLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary"
                  >
                    {line}
                  </motion.div>
                ))}
                {currentLineIndex < terminalLines.length && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-primary ml-1"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

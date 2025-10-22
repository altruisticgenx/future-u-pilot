import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Terminal as TerminalIcon } from "lucide-react";
import { TypeAnimation } from 'react-type-animation';

const terminalCommands = [
  "$ quantum-check --infrastructure",
  "⚡ Scanning quantum readiness...",
  "✓ Crypto inventory complete",
  "✓ Migration path mapped",
  "",
  "$ ai-deploy --compliance",
  "🤖 Testing explainability...",
  "✓ Policy gaps identified",
  "✓ Pilot ready in 8 weeks",
  "",
  "$ testbed-run --live",
  "🔬 Real project, real results",
  "✓ Lessons captured",
  "✓ Framework refined",
];

export const Hero = () => {
  const [cmdIndex, setCmdIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCmdIndex((prev) => (prev + 1) % terminalCommands.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  const navigateToAbout = () => {
    window.location.href = "/about";
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-foreground mb-2">Practical Consulting for</span>
                <span className="block bg-gradient-hero bg-clip-text text-transparent glitch-text">
                  <TypeAnimation
                    sequence={[
                      'Quantum Computing',
                      2000,
                      'AI Deployment',
                      2000,
                      'Policy Compliance',
                      2000,
                      'Security Migration',
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                AltruisticXAI helps organizations adapt to quantum computing and AI through practical consulting—think of it as a <span className="text-primary font-semibold">testbed for emerging technology adoption</span>. We work with government agencies, businesses, and legislative bodies to streamline workflows, secure infrastructure, and deploy AI that actually works.
              </p>
              
              <p className="text-base text-muted-foreground italic border-l-2 border-primary pl-4">
                Each project refines proven, reusable solutions. Quantum is coming. AI's already here. We help you not panic.
              </p>
            </div>

            {/* CTAs - 3D Glowing Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  onClick={scrollToContact}
                  className="btn-3d-primary text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 font-bold group w-full sm:w-auto"
                >
                  📅 Book Session
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  onClick={navigateToAbout}
                  className="btn-3d-accent text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 font-bold group w-full sm:w-auto"
                  aria-label="Learn about our approach"
                >
                  <Play className="mr-2 h-5 w-5" />
                  About Us
                </Button>
              </motion.div>
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
              <div className="relative p-4 sm:p-6 font-mono text-xs sm:text-sm min-h-[280px] sm:min-h-[350px] bg-terminal-bg/50">
                {/* Scan lines effect */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.03)_50%)] bg-[length:100%_4px] pointer-events-none animate-scan" />
                
                {/* Floating particles */}
                <div className="absolute top-4 right-4 w-1 h-1 bg-cmd-success rounded-full animate-pulse" />
                <div className="absolute bottom-8 left-8 w-1 h-1 bg-cmd-info rounded-full animate-pulse delay-150" />
                <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-cmd-warning rounded-full animate-pulse delay-300" />
                
                <div className="relative z-10 space-y-1.5">
                  {terminalCommands.slice(0, cmdIndex + 1).map((cmd, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.05 }}
                      className={`${
                        cmd.startsWith('$') ? 'text-cmd-info font-bold' :
                        cmd.startsWith('⚡') || cmd.startsWith('🤖') || cmd.startsWith('🔬') ? 'text-cmd-warning' :
                        cmd.startsWith('✓') ? 'text-cmd-success' :
                        'text-terminal-text/50'
                      }`}
                    >
                      {cmd}
                    </motion.div>
                  ))}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-cmd-success ml-1 align-middle"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

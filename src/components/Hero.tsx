import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Terminal as TerminalIcon, Video } from "lucide-react";
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
  const [animationsReady, setAnimationsReady] = useState(false);

  useEffect(() => {
    // Defer animations until after initial paint
    const timer = setTimeout(() => setAnimationsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!animationsReady) return;
    const interval = setInterval(() => {
      setCmdIndex((prev) => (prev + 1) % terminalCommands.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [animationsReady]);

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
      
      {/* Floating orbs for depth - deferred */}
      {animationsReady && (
        <>
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
        </>
      )}
      
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
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="block text-foreground">
                  {animationsReady ? (
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
                      className="bg-gradient-hero bg-clip-text text-transparent"
                    />
                  ) : (
                    <span className="bg-gradient-hero bg-clip-text text-transparent">
                      Quantum Computing
                    </span>
                  )}
                </span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                AltruisticXAI is a sandbox for the future. We help governments, businesses, and policymakers deploy quantum and AI in ways that actually work—practical, bold, and ahead of the curve.
              </p>
            </div>

            {/* CTAs - 3D Glowing Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  onClick={scrollToContact}
                  className="btn-3d-primary text-sm sm:text-base px-5 sm:px-6 py-4 sm:py-5 font-bold group w-full sm:w-auto"
                >
                  📅 Book Session
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  onClick={navigateToAbout}
                  className="btn-3d-accent text-sm sm:text-base px-5 sm:px-6 py-4 sm:py-5 font-bold group w-full sm:w-auto"
                  aria-label="Learn about our approach"
                >
                  <Play className="mr-2 h-4 w-4" />
                  About Us
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Button
                  size="sm"
                  onClick={() => window.open('https://notebooklm.google.com/notebook/1fb98627-5703-4814-9781-d1bd457305fc?artifactId=1584d5ac-e77f-45d9-92cb-576903d9fb93', '_blank')}
                  className="relative text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3 font-bold group w-full sm:w-auto bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[gradient_3s_ease_infinite] shadow-[0_0_15px_rgba(99,102,241,0.5)] hover:shadow-[0_0_25px_rgba(99,102,241,0.7)] transition-shadow duration-300"
                  aria-label="Watch intro video"
                >
                  <Video className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                  Intro Video
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right column - Compact Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden md:block"
          >
            <div className="rounded-lg backdrop-blur-md bg-card/60 border border-border/50 shadow-xl overflow-hidden max-w-md mx-auto">
              {/* Terminal header */}
              <div className="bg-muted/50 border-b border-border/50 px-3 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-muted-foreground ml-2 font-mono">
                  quantum.sh
                </span>
              </div>
              
              {/* Terminal content - Optimized */}
              <div className="relative p-3 font-mono text-[10px] sm:text-xs min-h-[200px] bg-terminal-bg/50">
                <div className="relative z-10 space-y-1">
                  {terminalCommands.slice(0, Math.min(cmdIndex + 1, 8)).map((cmd, i) => (
                    <div
                      key={i}
                      className={`${
                        cmd.startsWith('$') ? 'text-cmd-info font-bold' :
                        cmd.startsWith('⚡') || cmd.startsWith('🤖') || cmd.startsWith('🔬') ? 'text-cmd-warning' :
                        cmd.startsWith('✓') ? 'text-cmd-success' :
                        'text-terminal-text/50'
                      }`}
                    >
                      {cmd}
                    </div>
                  ))}
                  <span className="inline-block w-1.5 h-3 bg-cmd-success animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

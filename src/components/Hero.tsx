import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Sparkles, Video } from "lucide-react";
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
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const timer = setTimeout(() => setAnimationsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!animationsReady) return;
    const interval = setInterval(() => {
      setCmdIndex((prev) => (prev + 1) % terminalCommands.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [animationsReady]);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  const navigateToAbout = () => {
    window.location.href = "/about";
  };

  const springConfig = {
    type: "spring" as const,
    stiffness: 260,
    damping: 20,
    mass: 1,
  };

  const buttonVariants = {
    initial: prefersReducedMotion ? {} : { scale: 0, opacity: 0 },
    animate: prefersReducedMotion 
      ? { scale: 1, opacity: 1 }
      : { 
          scale: 1, 
          opacity: 1,
          transition: {
            ...springConfig,
            delay: 0.5,
          }
        },
    hover: prefersReducedMotion ? {} : {
      scale: 1.05,
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: prefersReducedMotion ? {} : {
      scale: 0.98,
      y: 0,
      transition: { duration: 0.15 }
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20"
      role="region"
      aria-labelledby="hero-heading"
    >
      {/* 21st.dev Quantum Background */}
      <div className="absolute inset-0 hero-quantum" />
      
      {/* Rotating Light Overlay */}
      {animationsReady && !prefersReducedMotion && (
        <div className="hero-light-overlay" />
      )}
      
      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />
      
      {/* Floating Glass Blur Panels - 4% opacity */}
      {animationsReady && !prefersReducedMotion && (
        <>
          <motion.div
            className="glass-blur-4 absolute rounded-2xl hidden md:block"
            style={{
              width: '200px',
              height: '150px',
              top: '15%',
              left: '8%',
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="glass-blur-4 absolute rounded-3xl hidden lg:block"
            style={{
              width: '180px',
              height: '180px',
              top: '60%',
              right: '12%',
            }}
            animate={{
              x: [0, -25, 0],
              y: [0, 15, 0],
              rotate: [0, -3, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="glass-blur-4 absolute rounded-2xl hidden xl:block"
            style={{
              width: '220px',
              height: '120px',
              bottom: '20%',
              left: '15%',
            }}
            animate={{
              x: [0, 20, 0],
              y: [0, -15, 0],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}
      
      {/* 3D Layered Floating Orbs - Multiple Depths */}
      {animationsReady && !prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 md:w-72 md:h-72 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, hsl(173 80% 40% / 0.25), transparent)',
            }}
            animate={{
              y: [0, 30, 0],
              x: [0, 15, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 md:w-96 md:h-96 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, hsl(190 84% 29% / 0.3), transparent)',
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, -20, 0],
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full blur-2xl hidden lg:block"
            style={{
              background: 'radial-gradient(circle, hsl(195 85% 16% / 0.2), transparent)',
            }}
            animate={{
              y: [0, 20, 0],
              x: [0, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}
      
      {/* Grid overlay with ocean theme */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(173_80%_40%/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(173_80%_40%/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Status tag - Spring Bounce Animation */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
              transition={prefersReducedMotion ? {} : { delay: 0.2, ...springConfig }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm animate-spring-bounce"
            >
              <span
                className="w-2 h-2 rounded-full bg-primary animate-pulse-soft"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-primary">
                Experiment status: active
              </span>
            </motion.div>

            {/* Headline with 3D Text Shadow */}
            <div className="space-y-3 sm:space-y-4">
              <h1 
                id="hero-heading"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                style={{
                  minHeight: '2.5em',
                  textShadow: '0 2px 10px rgba(20, 184, 166, 0.3), 0 4px 20px rgba(14, 116, 144, 0.2)',
                }}
              >
                <span className="block text-white">
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
                      className="relative inline-block"
                      style={{
                        background: 'linear-gradient(135deg, hsl(173 80% 70%), hsl(190 84% 50%))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    />
                  ) : (
                    <span 
                      className="relative inline-block"
                      style={{
                        background: 'linear-gradient(135deg, hsl(173 80% 70%), hsl(190 84% 50%))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Quantum Computing
                    </span>
                  )}
                </span>
              </h1>
              
              <motion.p 
                className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl leading-relaxed"
                initial={prefersReducedMotion ? {} : { opacity: 0, rotateX: -10 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, rotateX: 0 }}
                transition={prefersReducedMotion ? {} : { delay: 0.3, duration: 0.4 }}
              >
                AltruisticXAI is a sandbox for the future. We help governments, businesses, and policymakers deploy quantum and AI in ways that actually work—practical, bold, and ahead of the curve.
              </motion.p>
            </div>

            {/* CTAs - Smaller 3D Flowing Buttons with Unique Colors */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? {} : { 
                delay: 0.6,
                staggerChildren: 0.1 
              }}
            >
              <motion.div
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  onClick={scrollToContact}
                  className="btn-3d-teal text-[10px] sm:text-xs px-3 py-2 font-semibold w-full sm:w-auto min-w-[90px] flex items-center justify-center gap-1.5 shadow-lg"
                  data-analytics-id="cta_book_strategy"
                  data-ph-capture-attribute-button-type="book"
                  data-ph-capture-attribute-button-position="hero-primary"
                  aria-label="Book a strategy session"
                >
                  <Calendar className="h-3 w-3 animate-pulse" aria-hidden="true" />
                  Book
                </Button>
              </motion.div>
              
              <motion.div
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                transition={prefersReducedMotion ? {} : { delay: 0.7 }}
              >
                <Button
                  onClick={navigateToAbout}
                  className="btn-3d-purple text-[10px] sm:text-xs px-3 py-2 font-semibold w-full sm:w-auto min-w-[90px] flex items-center justify-center gap-1.5 shadow-lg"
                  data-ph-capture-attribute-button-type="about"
                  data-ph-capture-attribute-button-position="hero-secondary"
                  aria-label="Learn about our approach"
                >
                  <Sparkles className="h-3 w-3 animate-rotate-3d" aria-hidden="true" />
                  About
                </Button>
              </motion.div>

              <motion.div
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                transition={prefersReducedMotion ? {} : { delay: 0.8 }}
              >
                <Button
                  onClick={() => window.open('https://drive.google.com/file/d/1vuiN0NYOvToHIxkqjSSFFEYLitv-zyK7/view?usp=sharing', '_blank')}
                  className="btn-3d-cyan text-[10px] sm:text-xs px-3 py-2 font-semibold w-full sm:w-auto min-w-[90px] flex items-center justify-center gap-1.5 shadow-lg"
                  data-ph-capture-attribute-button-type="video"
                  data-ph-capture-attribute-button-position="hero-tertiary"
                  aria-label="Watch intro video"
                >
                  <Video className="h-3 w-3 animate-pulse-soft" aria-hidden="true" />
                  Video
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right column - 3D Terminal with Parallax & Glow */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 0.3 }}
            className="relative hidden md:block"
            whileHover={prefersReducedMotion ? {} : {
              rotateY: 5,
              rotateX: -2,
              transition: { duration: 0.3 }
            }}
            style={{ perspective: '1000px' }}
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
                minHeight: '280px',
                boxShadow: '0 0 40px hsl(173 80% 40% / 0.3), 0 8px 32px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Terminal header */}
              <div className="bg-muted/50 border-b border-border/50 px-3 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                <span className="text-xs text-muted-foreground ml-2 font-mono">
                  quantum.sh
                </span>
              </div>
              
              {/* Terminal content with scanline effect */}
              <div className="relative p-3 font-mono text-[10px] sm:text-xs min-h-[200px] bg-terminal-bg/50 overflow-hidden">
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
                  />
                )}
                <div className="relative z-10 space-y-1">
                  {terminalCommands.slice(0, Math.min(cmdIndex + 1, 8)).map((cmd, i) => (
                    <motion.div
                      key={i}
                      initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                      transition={prefersReducedMotion ? {} : { delay: i * 0.05 }}
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
                  <span className="inline-block w-1.5 h-3 bg-cmd-success animate-pulse" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

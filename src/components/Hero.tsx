import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { TypeAnimation } from 'react-type-animation';
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { StatusBadge } from "@/components/hero/StatusBadge";
import { TerminalWindow } from "@/components/hero/TerminalWindow";
import { HeroCTAGroup } from "@/components/hero/HeroCTAGroup";
import { useNavigate } from "react-router-dom";

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
  const heroRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const [cmdIndex, setCmdIndex] = useState(0);
  const [animationsReady, setAnimationsReady] = useState(false);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Intersection Observer for lazy animations
  const isVisible = useIntersectionObserver(heroRef, {
    threshold: 0.2,
    freezeOnceVisible: true,
  });

  // Performance monitoring (dev only)
  const { shouldReduceAnimations } = usePerformanceMonitor('Hero');
  
  // Combine user preference with performance detection
  const shouldAnimate = !prefersReducedMotion && !shouldReduceAnimations && isVisible;

  useEffect(() => {
    // Only start animations when component is visible
    if (!isVisible) return;
    const timer = setTimeout(() => setAnimationsReady(true), 100);
    return () => clearTimeout(timer);
  }, [isVisible]);

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
    navigate('/about');
  };

  const handleVideoClick = () => {
    window.open('https://drive.google.com/file/d/1vuiN0NYOvToHIxkqjSSFFEYLitv-zyK7/view?usp=sharing', '_blank');
  };

  return (
    <section 
      ref={heroRef}
      id="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20"
      role="region"
      aria-labelledby="hero-heading"
    >
      {/* 21st.dev Quantum Background */}
      <div className="absolute inset-0 hero-quantum" />
      
      {/* Rotating Light Overlay */}
      {animationsReady && shouldAnimate && (
        <div className="hero-light-overlay" aria-hidden="true" />
      )}
      
      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />
      
      {/* Floating Glass Blur Panels - 4% opacity */}
      {animationsReady && shouldAnimate && (
        <>
          <motion.div
            className="glass-blur-4 absolute rounded-2xl hidden md:block"
            style={{
              width: '200px',
              height: '150px',
              top: '15%',
              left: '8%',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              willChange: 'transform',
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
      {animationsReady && shouldAnimate && (
        <>
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 md:w-72 md:h-72 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, hsl(173 80% 40% / 0.25), transparent)',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              willChange: 'transform, opacity',
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
            <StatusBadge 
              status="Experiment status: active"
              animationsReady={animationsReady}
              prefersReducedMotion={!shouldAnimate}
            />

            {/* Headline with 3D Text Shadow */}
            <div className="space-y-3 sm:space-y-4">
              <h1 
                id="hero-heading"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                style={{
                  minHeight: '3em',
                  height: '3em',
                  textShadow: '0 2px 10px rgba(20, 184, 166, 0.3), 0 4px 20px rgba(14, 116, 144, 0.2)',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                }}
              >
                <span className="block text-primary-foreground font-bold">
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
                className="text-sm sm:text-base md:text-lg text-primary-foreground/95 max-w-2xl leading-relaxed font-medium"
                initial={prefersReducedMotion ? {} : { opacity: 0, rotateX: -10 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, rotateX: 0 }}
                transition={prefersReducedMotion ? {} : { delay: 0.3, duration: 0.4 }}
              >
                AltruisticXAI is a sandbox for the future. We help governments, businesses, and policymakers deploy quantum and AI in ways that actually work—practical, bold, and ahead of the curve.
              </motion.p>
            </div>

            {/* CTAs - Interactive Hover Buttons */}
            <HeroCTAGroup
              onBookStrategy={scrollToContact}
              onAbout={navigateToAbout}
              onVideo={handleVideoClick}
              animationsReady={animationsReady}
              prefersReducedMotion={!shouldAnimate}
            />
          </motion.div>

          {/* Right column - 3D Terminal with Parallax & Glow */}
          <TerminalWindow
            cmdIndex={cmdIndex}
            commands={terminalCommands}
            animationsReady={animationsReady}
            prefersReducedMotion={!shouldAnimate}
          />
        </div>
      </div>
    </section>
  );
};

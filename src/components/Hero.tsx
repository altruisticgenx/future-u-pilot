import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Sparkles } from "lucide-react";
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

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14 sm:pt-16 animate-fade-in"
      role="region"
      aria-labelledby="hero-heading"
    >
      {/* Enhanced Quantum Background with animations */}
      <div className="absolute inset-0 hero-quantum animate-pulse" style={{ animationDuration: '8s' }} />
      
      {/* Rotating Light Overlay - CSS only */}
      <div className="absolute inset-0 opacity-30 bg-gradient-conic from-primary/20 via-accent/20 to-primary/20 animate-spin" style={{ animationDuration: '20s' }} />
      
      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />
      
      {/* Floating Glass Blur Panels - CSS animations */}
      <div className="glass-blur-4 absolute rounded-2xl hidden md:block animate-float w-[200px] h-[150px] top-[15%] left-[8%]" style={{ animationDuration: '8s' }} />
      <div className="glass-blur-4 absolute rounded-3xl hidden lg:block animate-float w-[180px] h-[180px] top-[60%] right-[12%]" style={{ animationDuration: '10s', animationDelay: '1s' }} />
      <div className="glass-blur-4 absolute rounded-2xl hidden xl:block animate-float w-[220px] h-[120px] bottom-[20%] left-[15%]" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      
      {/* 3D Layered Floating Orbs - CSS animations */}
      <div className="absolute top-20 left-10 w-64 h-64 md:w-72 md:h-72 rounded-full blur-3xl bg-[radial-gradient(circle,hsl(173_80%_40%/0.25),transparent)] animate-float" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-20 right-10 w-80 h-80 md:w-96 md:h-96 rounded-full blur-3xl bg-[radial-gradient(circle,hsl(190_84%_29%/0.3),transparent)] animate-float" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full blur-2xl hidden lg:block bg-[radial-gradient(circle,hsl(195_85%_16%/0.2),transparent)] animate-float" style={{ animationDuration: '12s', animationDelay: '4s' }} />
      
      {/* Grid overlay with ocean theme - enhanced */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(173_80%_40%/0.12)_1px,transparent_1px),linear-gradient(to_bottom,hsl(173_80%_40%/0.12)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_60%,transparent_100%)] animate-pulse" style={{ animationDuration: '4s' }} />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left column - Content */}
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Status tag - Tailwind Animation */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm hover-scale animate-scale-in shadow-lg shadow-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-semibold text-primary tracking-wide">
                Experiment status: active
              </span>
            </div>

            {/* Headline with Enhanced 3D Text Shadow */}
            <div className="space-y-3 sm:space-y-4 animate-scale-in" style={{ animationDelay: '200ms' }}>
              <h1 
                id="hero-heading"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight"
                style={{
                  minHeight: '2.5em',
                  textShadow: '0 0 30px rgba(20, 184, 166, 0.6), 0 0 60px rgba(14, 116, 144, 0.4), 0 4px 20px rgba(0, 0, 0, 0.8)',
                }}
              >
                <span className="block text-white drop-shadow-2xl">
                  {animationsReady ? (
                    <TypeAnimation
                      sequence={[
                        'Advanced Computing',
                        2000,
                        'AI Deployment',
                        2000,
                        'Policy Compliance',
                        2000,
                        'Future-Proof Security',
                        2000,
                      ]}
                      wrapper="span"
                      speed={50}
                      repeat={Infinity}
                      className="relative inline-block bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 bg-clip-text text-transparent animate-gradient-x"
                    />
                  ) : (
                    <span className="relative inline-block bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 bg-clip-text text-transparent">
                      Advanced Computing
                    </span>
                  )}
                </span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-white/95 max-w-2xl leading-relaxed animate-fade-in shadow-lg" style={{ animationDelay: '400ms' }}>
                Pennsylvania invented the ambulance, polio vaccine, and digital computer. We're helping PA communities prepare for new technology that affects energy costs, healthcare, cybersecurity, and job training—practical solutions anyone can understand.
              </p>
            </div>

            {/* CTAs - Enhanced with Tailwind animations */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center animate-scale-in" style={{ animationDelay: '600ms' }}>
              <Button
                onClick={scrollToContact}
                className="btn-3d-teal text-xs sm:text-sm px-4 py-2.5 font-bold w-full sm:w-auto min-w-[100px] flex items-center justify-center gap-2 shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 animate-pulse-soft group"
                data-analytics-id="cta_book_strategy"
                aria-label="Book a strategy session"
              >
                <Calendar className="h-4 w-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                Book Session
              </Button>
              
              <Button
                onClick={navigateToAbout}
                className="btn-3d-purple text-xs sm:text-sm px-4 py-2.5 font-bold w-full sm:w-auto min-w-[100px] flex items-center justify-center gap-2 shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/50 transition-all duration-300 group"
                aria-label="Learn about our approach"
              >
                <Sparkles className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" aria-hidden="true" />
                Learn More
              </Button>
            </div>
          </div>

          {/* Right column - Enhanced Terminal with Pure CSS */}
          <div className="relative w-full animate-fade-in perspective-1000" style={{ animationDelay: '300ms' }}>
            <div className="rounded-xl backdrop-blur-xl bg-gradient-to-br from-card/80 to-card/60 border-2 border-primary/30 shadow-2xl shadow-primary/40 overflow-hidden max-w-lg mx-auto hover:border-primary/50 hover:shadow-primary/60 transition-all duration-500 hover:scale-[1.02] hover-lift group">
              {/* Terminal header - Enhanced */}
              <div className="bg-gradient-to-r from-muted/70 to-muted/50 border-b-2 border-primary/20 px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-3 backdrop-blur-sm">
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 hover:scale-110 transition-transform cursor-pointer shadow-lg shadow-red-500/50" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500 hover:scale-110 transition-transform cursor-pointer shadow-lg shadow-yellow-500/50" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 animate-pulse hover:scale-110 transition-transform cursor-pointer shadow-lg shadow-green-500/50" />
                </div>
                <span className="text-xs sm:text-sm text-primary/90 ml-1 sm:ml-2 font-mono font-bold tracking-wider">
                  advanced-tech.sh
                </span>
                <div className="ml-auto flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/20 animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
              </div>
              
              {/* Terminal content with enhanced effects */}
              <div className="relative p-3 sm:p-4 font-mono text-[10px] xs:text-xs sm:text-sm min-h-[180px] sm:min-h-[220px] bg-gradient-to-b from-terminal-bg/70 to-terminal-bg/90 overflow-hidden">
                {/* Enhanced scanline effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(0deg,transparent_0%,hsl(173_80%_60%/0.08)_50%,transparent_100%)] h-full animate-scan" />
                
                {/* CRT screen effect */}
                <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,hsl(173_80%_60%/0.03)_2px,hsl(173_80%_60%/0.03)_4px)]" />
                
                {/* Glow effect */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,hsl(173_80%_60%/0.15),transparent_70%)] opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                
                <div className="relative z-10 space-y-1 sm:space-y-1.5">
                  {terminalCommands.slice(0, Math.min(cmdIndex + 1, 8)).map((cmd, i) => (
                    <div
                      key={i}
                      className={`leading-relaxed animate-fade-in hover:translate-x-1 transition-transform ${
                        cmd.startsWith('$') ? 'text-cmd-info font-extrabold text-shadow-glow' :
                        cmd.startsWith('⚡') || cmd.startsWith('🤖') || cmd.startsWith('🔬') ? 'text-cmd-warning font-bold' :
                        cmd.startsWith('✓') ? 'text-cmd-success font-semibold' :
                        'text-terminal-text/60'
                      }`}
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      {cmd}
                    </div>
                  ))}
                  <span className="inline-block w-1.5 h-3 sm:w-2 sm:h-4 bg-cmd-success animate-pulse shadow-lg shadow-cmd-success/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

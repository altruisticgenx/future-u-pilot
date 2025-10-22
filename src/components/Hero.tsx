import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import { Sparkles, ArrowRight, Info } from "lucide-react";

const terminalLines = [
  "$ quantum-readiness --scan",
  "> Analyzing infrastructure...",
  "> Crypto inventory: 47 systems",
  "> AI workflow assessment: COMPLETE",
  "> Post-quantum migration plan: READY",
  "✓ Analysis complete. Ready to deploy.",
];

const Hero = () => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex < terminalLines.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, terminalLines[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
      }, 800);
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

  const navigateToAbout = () => {
    window.location.href = "/about";
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-20" />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Status badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm mx-auto lg:mx-0"
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Quantum + AI Readiness
              </span>
            </motion.div>

            {/* Main heading with glitch effect */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold">
                <span className="block text-foreground mb-2">
                  AltruisticXAI
                </span>
                <span className="block bg-gradient-hero bg-clip-text text-transparent relative">
                  <TypeAnimation
                    sequence={[
                      'Testbed for Tomorrow',
                      2000,
                      'Practical AI Solutions',
                      2000,
                      'Quantum-Ready Today',
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    className="inline-block glitch-text"
                  />
                </span>
              </h1>
            </div>

            {/* Rewritten subtitle - less jargon */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              We help organizations adapt to quantum computing and AI through practical consulting—think of it as a <span className="text-primary font-semibold">testbed for emerging technology</span>. We work with government agencies, legislative bodies, and businesses to streamline workflows, secure infrastructure for the quantum era, and deploy AI systems that actually work.
            </motion.p>

            {/* CTA Buttons - 3D glowing different colors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                onClick={scrollToContact}
                className="group relative px-8 py-4 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl font-semibold shadow-xl overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                data-analytics-id="cta_book_strategy"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 blur-xl bg-primary/50 -z-10 group-hover:blur-2xl transition-all" />
                <span className="relative flex items-center justify-center gap-2">
                  Book Strategy Session
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-xl border-2 border-white/20" />
              </motion.button>

              <motion.button
                onClick={navigateToAbout}
                className="group relative px-8 py-4 bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-xl font-semibold shadow-xl overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 blur-xl bg-accent/50 -z-10 group-hover:blur-2xl transition-all" />
                <span className="relative flex items-center justify-center gap-2">
                  <Info className="w-5 h-5" />
                  About Us
                </span>
                <div className="absolute inset-0 rounded-xl border-2 border-white/20" />
              </motion.button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Pilot → Production in 8 weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span>45+ Organizations Served</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Enhanced Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 blur-3xl opacity-60 animate-pulse" />
              
              {/* Terminal window */}
              <motion.div
                className="relative backdrop-blur-xl bg-gradient-to-br from-black/80 via-black/70 to-black/80 border-2 border-primary/30 rounded-2xl shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-primary/20 to-accent/20 border-b border-primary/30">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs font-mono text-primary/80">quantum-terminal v2.0</span>
                  </div>
                </div>

                {/* Terminal content */}
                <div className="p-6 space-y-3 font-mono text-sm min-h-[300px] sm:min-h-[400px]">
                  {displayedLines.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`${
                        line.startsWith('$') 
                          ? 'text-primary font-semibold' 
                          : line.startsWith('>') 
                          ? 'text-accent/90' 
                          : 'text-green-400'
                      }`}
                    >
                      {line}
                      {index === displayedLines.length - 1 && (
                        <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse" />
                      )}
                    </motion.div>
                  ))}
                  
                  {displayedLines.length === 0 && (
                    <div className="text-muted-foreground/50 flex items-center gap-2">
                      <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
                      <span>Initializing...</span>
                    </div>
                  )}
                </div>

                {/* Scan lines effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"
                  animate={{
                    y: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>

              {/* Floating particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/50 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full p-1">
          <motion.div
            className="w-1 h-3 bg-primary rounded-full mx-auto"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

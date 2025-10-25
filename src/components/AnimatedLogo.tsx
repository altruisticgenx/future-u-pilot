import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface AnimatedLogoProps {
  onClick?: () => void;
  className?: string;
}

export const AnimatedLogo = ({ onClick, className = "" }: AnimatedLogoProps) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 4000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <motion.button
      onClick={onClick}
      className={`relative flex items-center gap-2 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="AltruisticXAI Home"
    >
      {/* Spinning Globe */}
      <motion.div
        className="relative w-8 h-8"
        animate={{ rotateY: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Globe outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary"
          style={{
            boxShadow: "0 0 20px hsl(var(--primary) / 0.4), inset 0 0 20px hsl(var(--primary) / 0.2)"
          }}
        />
        
        {/* Globe meridians */}
        <motion.div
          className="absolute inset-1 rounded-full border border-primary/60"
          animate={{ rotateZ: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-1 rounded-full border border-primary/40"
          animate={{ rotateX: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Globe core */}
        <motion.div
          className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/80 to-accent/60"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            boxShadow: "0 0 15px hsl(var(--primary-glow) / 0.8)"
          }}
        />
        
        {/* Quantum particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-glow rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transformOrigin: "0 0"
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>

      {/* Logo Text with Glitch Effect */}
      <div className="relative">
        <motion.span
          className={`text-lg sm:text-xl font-bold bg-gradient-hero bg-clip-text text-transparent relative z-10 ${
            isGlitching ? "glitch-text" : ""
          }`}
          style={{
            textShadow: isGlitching
              ? "0 0 10px hsl(var(--primary) / 0.8), 2px 2px 0 hsl(var(--error) / 0.5), -2px -2px 0 hsl(var(--info) / 0.5)"
              : "0 4px 12px rgba(20, 184, 166, 0.4)",
            filter: isGlitching ? "blur(0.5px)" : "none",
            WebkitTextStroke: "0.5px hsl(var(--primary) / 0.3)"
          }}
        >
          AltruisticXAI
        </motion.span>

        {/* Glitch layers */}
        {isGlitching && (
          <>
            <motion.span
              className="absolute inset-0 text-lg sm:text-xl font-bold bg-gradient-hero bg-clip-text text-transparent"
              style={{
                textShadow: "2px 0 0 hsl(var(--error) / 0.7)",
                left: "-2px"
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.2 }}
            >
              AltruisticXAI
            </motion.span>
            <motion.span
              className="absolute inset-0 text-lg sm:text-xl font-bold bg-gradient-hero bg-clip-text text-transparent"
              style={{
                textShadow: "-2px 0 0 hsl(var(--info) / 0.7)",
                left: "2px"
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              AltruisticXAI
            </motion.span>
          </>
        )}

        {/* Quantum scan line */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/30 to-transparent h-1"
          animate={{ y: [-20, 40] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ filter: "blur(2px)" }}
        />
      </div>

      {/* Glowing backdrop */}
      <motion.div
        className="absolute -inset-2 rounded-full bg-primary/10 blur-xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.button>
  );
};
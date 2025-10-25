import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const Logo3D = () => {
  return (
    <motion.div 
      className="relative inline-flex items-center gap-2 cursor-pointer group perspective-1000"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* 3D Icon with floating animation */}
      <motion.div
        className="relative w-7 h-7 sm:w-8 sm:h-8"
        animate={{
          rotateY: [0, 360],
          rotateX: [0, 10, 0],
        }}
        transition={{
          rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {/* Glow background */}
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-bright via-ocean-glow to-primary rounded-lg blur-md opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Icon container with 3D transform */}
        <div className="relative w-full h-full bg-gradient-to-br from-ocean-bright to-ocean-glow rounded-lg shadow-lg flex items-center justify-center transform-gpu">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-ocean-deep" strokeWidth={2.5} />
        </div>

        {/* Floating particles */}
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 bg-ocean-bright rounded-full blur-sm"
          animate={{
            y: [-2, -6, -2],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* 3D Text with gradient */}
      <div className="relative">
        {/* Shadow layer */}
        <span className="absolute top-0.5 left-0.5 text-xs sm:text-sm md:text-base font-extrabold text-ocean-deep/20 tracking-tight blur-[0.5px]">
          AltruisticXAI
        </span>
        
        {/* Main text */}
        <span className="relative text-xs sm:text-sm md:text-base font-extrabold bg-gradient-to-br from-ocean-foam via-ocean-bright to-ocean-glow bg-clip-text text-transparent tracking-tight drop-shadow-sm">
          AltruisticXAI
        </span>

        {/* Underline accent */}
        <motion.div
          className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-transparent via-ocean-bright to-transparent"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ocean-bright/0 via-ocean-bright/10 to-ocean-bright/0 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
    </motion.div>
  );
};

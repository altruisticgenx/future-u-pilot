import { Mail, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="relative border-t border-ocean-light/20 bg-gradient-to-b from-ocean-deep/50 to-ocean-darkest overflow-hidden">
      {/* Glowing top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-ocean-bright to-transparent opacity-60" />
      
      {/* Animated glow orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-64 h-64 bg-ocean-bright/10 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-0 right-1/4 w-64 h-64 bg-ocean-glow/10 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid md:grid-cols-3 gap-6 py-8">
          {/* Brand - More compact */}
          <div className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold bg-gradient-hero bg-clip-text text-transparent glow-pulse">
              AltruisticXAI
            </h3>
            <p className="text-[10px] sm:text-xs text-ocean-foam/70 leading-relaxed">
              Building explainable AI workflows and quantum-ready roadmaps with public-interest DNA.
            </p>
          </div>

          {/* Links - More compact */}
          <div className="space-y-2">
            <h4 className="text-xs sm:text-sm font-semibold text-ocean-foam">Quick Links</h4>
            <nav className="flex flex-col space-y-1">
              <a
                href="#services"
                className="text-[10px] sm:text-xs text-ocean-foam/70 hover:text-ocean-bright transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Services
              </a>
              <a
                href="/storytelling"
                className="text-[10px] sm:text-xs text-ocean-foam/70 hover:text-ocean-bright transition-colors"
              >
                Storytelling
              </a>
              <a
                href="#contact"
                className="text-[10px] sm:text-xs text-ocean-foam/70 hover:text-ocean-bright transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Connect - More compact with glow buttons */}
          <div className="space-y-2">
            <h4 className="text-xs sm:text-sm font-semibold text-ocean-foam">Connect</h4>
            <div className="flex gap-2">
              <motion.a
                href="mailto:altruisticxai@gmail.com"
                aria-label="Email us"
                className="p-2 rounded-lg bg-ocean-bright/10 text-ocean-bright hover:bg-ocean-bright/20 border border-ocean-bright/30 hover:border-ocean-bright/50 transition-all hover:shadow-[0_0_15px_rgba(20,184,166,0.3)]"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="https://github.com/altruisticgenx/projectz#readme"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg bg-ocean-bright/10 text-ocean-bright hover:bg-ocean-bright/20 border border-ocean-bright/30 hover:border-ocean-bright/50 transition-all hover:shadow-[0_0_15px_rgba(20,184,166,0.3)]"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/inga-kaltak-11i41141/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg bg-ocean-bright/10 text-ocean-bright hover:bg-ocean-bright/20 border border-ocean-bright/30 hover:border-ocean-bright/50 transition-all hover:shadow-[0_0_15px_rgba(20,184,166,0.3)]"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="h-4 w-4" />
              </motion.a>
            </div>
            <p className="text-[9px] sm:text-[10px] text-ocean-foam/50 pt-2">
              © {new Date().getFullYear()} AltruisticXAI. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-ocean-bright/50 to-transparent" />
    </footer>
  );
};

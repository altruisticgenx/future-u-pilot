import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const navItems = [{
    label: "Home",
    href: "/"
  }, {
    label: "About Us",
    href: "/about"
  }, {
    label: "FAQ",
    href: "/faq"
  }, {
    label: "Open Project(s)",
    href: "https://keen-hardboard-afe.notion.site/28cf142372ef8050ac86f4a3b4c813db?v=28cf142372ef8073b8cf000c0ebfca06&source=copy_link"
  }, {
    label: "Terminal",
    href: "/terminal"
  }, {
    label: "Contact",
    href: "#contact"
  }];
  const handleNavClick = (href: string) => {
    if (href.startsWith("http")) {
      // External link
      window.open(href, "_blank", "noopener,noreferrer");
    } else if (href.startsWith("#")) {
      const element = document.getElementById(href.substring(1));
      element?.scrollIntoView({
        behavior: "smooth"
      });
    } else {
      // Use React Router navigate instead of window.location
      navigate(href);
    }
    setIsMobileMenuOpen(false);
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/90 border-b border-primary/20 shadow-2xl" 
         style={{
           boxShadow: '0 8px 32px rgba(20, 184, 166, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)',
           transform: 'translateZ(0)',
           willChange: 'transform'
         }}
         role="navigation" 
         aria-label="Main navigation">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo with 3D Transform */}
          <motion.button 
            onClick={() => navigate("/")}
            className="text-lg sm:text-xl font-bold bg-gradient-hero bg-clip-text text-transparent relative" 
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.3 }
            }} 
            whileTap={{ scale: 0.95 }}
            style={{
              textShadow: '0 4px 12px rgba(20, 184, 166, 0.4)',
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
            aria-label="AltruisticXAI Home"
          >
            <span className="relative block" style={{ transform: 'translateZ(20px)' }}>
              AltruisticXAI
            </span>
          </motion.button>

          {/* Desktop Navigation with 3D Cards */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, idx) => <motion.button 
              key={item.label} 
              onClick={() => handleNavClick(item.href)} 
              className="px-3 py-2 rounded-xl text-sm font-medium text-foreground hover:text-primary transition-all relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.05), rgba(14, 116, 144, 0.08))',
                boxShadow: '0 2px 8px rgba(20, 184, 166, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
              }}
              whileHover={{ 
                y: -2, 
                scale: 1.03,
                rotateX: 5,
                boxShadow: '0 6px 20px rgba(20, 184, 166, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                transition: { duration: 0.2 }
              }} 
              whileTap={{ scale: 0.97, y: 0 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              aria-label={`Navigate to ${item.label}`}
            >
              {/* Shimmer effect on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                    style={{ transform: 'translateX(-100%)', animation: 'shimmer 2s infinite' }} />
              <span className="relative z-10">{item.label}</span>
            </motion.button>)}
            
            {/* Theme Toggle with 3D effect */}
            <motion.div
              whileHover={{ scale: 1.1, rotateZ: 180 }}
              transition={{ duration: 0.3 }}
            >
              <ThemeToggle />
            </motion.div>
          </div>

          {/* Mobile Menu Button - Enhanced with 3D */}
          <motion.button 
            className="lg:hidden p-3 rounded-xl hover:bg-primary/10 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.08), rgba(14, 116, 144, 0.12))',
              boxShadow: '0 2px 8px rgba(20, 184, 166, 0.15)',
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 4px 16px rgba(20, 184, 166, 0.25)',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6 text-primary" aria-hidden="true" /> : <Menu className="h-6 w-6 text-primary" aria-hidden="true" />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu with 3D entrance */}
      <AnimatePresence>
        {isMobileMenuOpen && <motion.div 
          initial={{
            opacity: 0,
            height: 0,
            rotateX: -15
          }} 
          animate={{
            opacity: 1,
            height: "auto",
            rotateX: 0
          }} 
          exit={{
            opacity: 0,
            height: 0,
            rotateX: -15
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="lg:hidden border-t border-border/50 backdrop-blur-xl overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(20, 184, 166, 0.05), rgba(14, 116, 144, 0.08))',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            transformStyle: 'preserve-3d'
          }}
        >
            <div className="container mx-auto px-4 py-6 space-y-2">
              {navItems.map((item, index) => <motion.button 
              key={item.label} 
              onClick={() => handleNavClick(item.href)} 
              className="w-full text-left px-5 py-4 rounded-xl text-foreground hover:text-primary transition-all font-medium text-base min-h-[52px] relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.08), rgba(14, 116, 144, 0.12))',
                boxShadow: '0 2px 8px rgba(20, 184, 166, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              }}
              initial={{ opacity: 0, x: -30, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -30, rotateY: -15 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`Navigate to ${item.label}`}
            >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">{item.label}</span>
              </motion.button>)}
              
              {/* Mobile Theme Toggle */}
              <div className="flex mt-6 pt-4 border-t border-border/30">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <ThemeToggle />
                </motion.div>
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </nav>
  );
};
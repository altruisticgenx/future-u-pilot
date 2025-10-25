import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
  return <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-ocean-deep/95 border-b border-ocean-light/20 shadow-[0_8px_32px_hsl(173_80%_40%/0.15)]" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
          {/* Logo */}
          <motion.button 
            onClick={() => navigate("/")}
            className="text-base sm:text-lg font-bold bg-gradient-hero bg-clip-text text-transparent" 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            aria-label="AltruisticXAI Home"
          >
            AltruisticXAI
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => <motion.button 
              key={item.label} 
              onClick={() => handleNavClick(item.href)} 
              className="px-4 py-2 rounded-xl text-sm font-medium text-ocean-text hover:bg-ocean-light/15 hover:text-ocean-glow transition-all backdrop-blur-sm border border-transparent hover:border-ocean-light/30" 
              whileHover={{ y: -2, scale: 1.03 }} 
              whileTap={{ scale: 0.97 }}
              aria-label={`Navigate to ${item.label}`}
            >
                {item.label}
              </motion.button>)}
            
            {/* Auth Button */}
            <Button
              size="sm"
              onClick={() => navigate("/auth")}
              className="ml-3 bg-ocean-light hover:bg-ocean-glow text-ocean-deep font-semibold shadow-[0_4px_16px_hsl(173_80%_40%/0.3)]"
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu Button - Enhanced touch target for iOS/Android */}
          <button 
            className="lg:hidden p-4 rounded-xl hover:bg-ocean-light/15 active:bg-ocean-light/25 transition-all min-w-[48px] min-h-[48px] flex items-center justify-center backdrop-blur-sm border border-ocean-light/20 shadow-[0_2px_8px_hsl(173_80%_40%/0.15)]" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {isMobileMenuOpen ? <X className="h-7 w-7 text-ocean-glow" aria-hidden="true" /> : <Menu className="h-7 w-7 text-ocean-text" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - iOS/Android Optimized */}
      <AnimatePresence>
        {isMobileMenuOpen && <motion.div 
          initial={{ opacity: 0, height: 0 }} 
          animate={{ opacity: 1, height: "auto" }} 
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="lg:hidden border-t border-ocean-light/20 bg-ocean-deep/98 backdrop-blur-2xl overflow-hidden shadow-[0_8px_32px_hsl(173_80%_40%/0.2)]"
        >
            <div className="container mx-auto px-4 py-6 space-y-3">
              {navItems.map((item, index) => <motion.button 
              key={item.label} 
              onClick={() => handleNavClick(item.href)} 
              className="w-full text-left px-5 py-4 rounded-xl text-ocean-text hover:bg-ocean-light/15 active:bg-ocean-light/25 hover:text-ocean-glow transition-all font-medium text-lg min-h-[56px] border border-ocean-light/10 backdrop-blur-sm shadow-[0_2px_8px_hsl(173_80%_40%/0.1)]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              aria-label={`Navigate to ${item.label}`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
                  {item.label}
                </motion.button>)}
              
              {/* Mobile Auth Button */}
              <Button 
                className="w-full mt-6 min-h-[56px] text-lg bg-ocean-light hover:bg-ocean-glow text-ocean-deep font-bold shadow-[0_4px_16px_hsl(173_80%_40%/0.3)] border-2 border-ocean-glow/30" 
                onClick={() => navigate("/auth")} 
                aria-label="Login or Sign Up"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                Login / Sign Up
              </Button>
            </div>
          </motion.div>}
      </AnimatePresence>
    </nav>;
};
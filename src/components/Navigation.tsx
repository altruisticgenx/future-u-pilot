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
  return <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-ocean-deep/98 border-b border-ocean-light/10 shadow-sm" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-16">
          {/* Logo */}
          <motion.button 
            onClick={() => navigate("/")}
            className="text-sm sm:text-base md:text-lg font-extrabold bg-gradient-hero bg-clip-text text-transparent tracking-tight" 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            aria-label="AltruisticXAI Home"
          >
            AltruisticXAI
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map(item => <motion.button 
              key={item.label} 
              onClick={() => handleNavClick(item.href)} 
              className="px-3 py-1.5 rounded-lg text-[13px] font-semibold text-ocean-text/90 hover:bg-ocean-light/10 hover:text-ocean-glow transition-all" 
              whileHover={{ y: -1 }} 
              whileTap={{ scale: 0.98 }}
              aria-label={`Navigate to ${item.label}`}
            >
                {item.label}
              </motion.button>)}
            
            {/* Auth Button */}
            <Button
              size="sm"
              onClick={() => navigate("/auth")}
              className="ml-2 h-8 px-4 text-xs bg-ocean-light hover:bg-ocean-glow text-ocean-deep font-bold rounded-lg"
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu Button - Enhanced touch target for iOS/Android */}
          <button 
            className="lg:hidden p-3 rounded-lg hover:bg-ocean-light/10 active:bg-ocean-light/20 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6 text-ocean-glow" aria-hidden="true" /> : <Menu className="h-6 w-6 text-ocean-text" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - iOS/Android Optimized */}
      <AnimatePresence>
        {isMobileMenuOpen && <motion.div 
          initial={{ opacity: 0, height: 0 }} 
          animate={{ opacity: 1, height: "auto" }} 
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="lg:hidden border-t border-ocean-light/10 bg-ocean-deep/98 backdrop-blur-xl overflow-hidden"
        >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item, index) => <motion.button 
              key={item.label} 
              onClick={() => handleNavClick(item.href)} 
              className="w-full text-left px-4 py-3 rounded-lg text-ocean-text/90 hover:bg-ocean-light/10 active:bg-ocean-light/20 hover:text-ocean-glow transition-all font-medium text-sm min-h-[48px]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04 }}
              aria-label={`Navigate to ${item.label}`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
                  {item.label}
                </motion.button>)}
              
              {/* Mobile Auth Button */}
              <Button 
                className="w-full mt-4 min-h-[48px] text-sm bg-ocean-light hover:bg-ocean-glow text-ocean-deep font-bold rounded-lg" 
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
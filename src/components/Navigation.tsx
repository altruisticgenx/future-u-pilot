import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, signOut } = useAuth();
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
  return <nav className="fixed top-0 left-0 right-0 z-50 glass-card-3d backdrop-blur-xl bg-background/85 border-b border-primary/20 shadow-lg" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-14 sm:h-16">
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
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map(item => <motion.button 
              key={item.label} 
              onClick={() => handleNavClick(item.href)} 
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-all glass-card-3d" 
              whileHover={{ y: -1, scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              aria-label={`Navigate to ${item.label}`}
            >
                {item.label}
              </motion.button>)}
            
            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-2 ml-2 pl-2 border-l border-border/50">
                <div className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground">
                  <UserIcon className="h-4 w-4" />
                  {user.email?.split('@')[0]}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                  className="text-xs"
                >
                  <LogOut className="h-3 w-3 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                onClick={() => navigate("/auth")}
                className="ml-2 text-xs"
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button - Enhanced touch target */}
          <button 
            className="lg:hidden p-3 rounded-lg hover:bg-primary/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: "auto"
      }} exit={{
        opacity: 0,
        height: 0
      }} className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-lg overflow-hidden">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item, index) => <motion.button 
              key={item.label} 
              onClick={() => handleNavClick(item.href)} 
              className="w-full text-left px-4 py-3.5 rounded-lg text-foreground hover:bg-primary/10 hover:text-primary transition-all font-medium text-base min-h-[44px]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              aria-label={`Navigate to ${item.label}`}
            >
                  {item.label}
                </motion.button>)}
              
              {/* Mobile Auth Buttons */}
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground border-t border-border/50 mt-2 pt-4">
                    <UserIcon className="h-4 w-4" />
                    {user.email}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full min-h-[44px]"
                    onClick={() => signOut()}
                    aria-label="Sign out of your account"
                  >
                    <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button className="w-full mt-4 min-h-[44px]" onClick={() => navigate("/auth")} aria-label="Login or Sign Up">
                  Login / Sign Up
                </Button>
              )}
            </div>
          </motion.div>}
      </AnimatePresence>
    </nav>;
};
import { useState } from "react";
import { Menu, X } from "lucide-react";
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
  return <nav className="fixed top-0 left-0 right-0 z-50 glass-card-3d backdrop-blur-xl bg-background/90 border-b border-primary/20 shadow-lg animate-fade-in" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-7xl">
        <div className="flex items-center justify-between h-11 sm:h-12">
          {/* Logo */}
          <button 
            onClick={() => navigate("/")}
            className="text-xs sm:text-sm font-bold bg-gradient-hero bg-clip-text text-transparent hover-scale transition-transform duration-200"
            aria-label="AltruisticXAI Home"
          >
            AltruisticXAI
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map(item => <button 
              key={item.label} 
              onClick={() => handleNavClick(item.href)} 
              className="px-2 py-1 rounded-md text-[9px] font-medium text-foreground/80 hover:bg-primary/10 hover:text-primary hover:-translate-y-0.5 transition-all duration-200 story-link"
              aria-label={`Navigate to ${item.label}`}
            >
                {item.label}
              </button>)}
            
            {/* Theme Toggle */}
            <div className="ml-1">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button - Enhanced touch target */}
          <button 
            className="lg:hidden p-2.5 rounded-lg hover:bg-primary/10 transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center hover-scale" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-lg overflow-hidden animate-accordion-down">
          <div className="container mx-auto px-3 py-3 space-y-1.5">
            {navItems.map((item, index) => (
              <button 
                key={item.label} 
                onClick={() => handleNavClick(item.href)} 
                className="w-full text-left px-3 py-2.5 rounded-lg text-foreground/90 hover:bg-primary/10 hover:text-primary transition-all duration-200 font-medium text-xs min-h-[44px] animate-fade-in hover:translate-x-1"
                style={{ animationDelay: `${index * 50}ms` }}
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Theme Toggle */}
            <div className="mt-3 pt-3 border-t border-border/50">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>;
};
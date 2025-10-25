import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themes = [
  { id: "default", name: "Ocean Teal", colors: ["#14b8a6", "#0e7490", "#f59e0b"] },
  { id: "quantum", name: "Quantum", colors: ["#22d3ee", "#f59e0b", "#a855f7"] },
  { id: "terminal", name: "Terminal", colors: ["#10b981", "#14b8a6", "#f59e0b"] },
];

export const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState("default");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("color-theme") || "default";
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (theme: string) => {
    const root = document.documentElement;
    
    if (theme === "default") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }
    
    localStorage.setItem("color-theme", theme);
  };

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    applyTheme(themeId);
    setIsOpen(false);
  };

  const currentThemeData = themes.find(t => t.id === currentTheme);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative overflow-hidden border-2 hover:scale-105 transition-transform"
          aria-label="Select color theme"
        >
          <motion.div
            className="flex items-center justify-center"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <Palette className="h-4 w-4" />
          </motion.div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <AnimatePresence>
          {themes.map((theme, index) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <DropdownMenuItem
                onClick={() => handleThemeChange(theme.id)}
                className="flex items-center justify-between gap-2 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {theme.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full border border-border/50"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{theme.name}</span>
                </div>
                {currentTheme === theme.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <Check className="h-4 w-4 text-primary" />
                  </motion.div>
                )}
              </DropdownMenuItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = root.classList.contains('dark');
    setIsDark(currentTheme);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const newTheme = !isDark;
    
    if (newTheme) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="relative h-9 w-9 rounded-lg hover:bg-primary/10"
        aria-label="Toggle theme"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </motion.div>
  );
};

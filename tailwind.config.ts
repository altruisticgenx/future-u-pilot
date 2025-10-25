import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

// Helper function to support opacity with HSL CSS variables
const withOpacityValue = (variable: string) => {
  return ({ opacityValue }: { opacityValue?: string }) => {
    if (opacityValue !== undefined) {
      return `hsl(var(${variable}) / ${opacityValue})`;
    }
    return `hsl(var(${variable}))`;
  };
};

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.5s ease-out",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
        "slide-in": "slide-in 0.3s ease-out",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "spring-bounce": "spring-bounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "flow": "flow 1.5s ease-in-out infinite",
        "shimmer-flow": "shimmer-flow 3s linear infinite",
        "float-3d": "float-3d 6s ease-in-out infinite",
        "rotate-3d": "rotate-3d 20s linear infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "pulse-soft": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.5",
          },
        },
        "glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px hsl(var(--primary) / 0.5)",
          },
          "50%": {
            boxShadow: "0 0 40px hsl(var(--primary) / 0.8)",
          },
        },
        "slide-in": {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        "bounce-subtle": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
        "spring-bounce": {
          "0%": { transform: "scale(0.95) translateY(0)" },
          "50%": { transform: "scale(1.05) translateY(-4px)" },
          "100%": { transform: "scale(1) translateY(0)" },
        },
        "float-3d": {
          "0%, 100%": {
            transform: "translateY(0) translateZ(0) rotateX(0deg)",
          },
          "33%": {
            transform: "translateY(-20px) translateZ(10px) rotateX(2deg)",
          },
          "66%": {
            transform: "translateY(-10px) translateZ(-10px) rotateX(-2deg)",
          },
        },
        "rotate-3d": {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.1)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
      },
      colors: {
        border: withOpacityValue("--border"),
        input: withOpacityValue("--input"),
        ring: withOpacityValue("--ring"),
        background: withOpacityValue("--background"),
        foreground: withOpacityValue("--foreground"),
        base: {
          100: withOpacityValue("--base-100"),
          200: withOpacityValue("--base-200"),
          300: withOpacityValue("--base-300"),
          DEFAULT: withOpacityValue("--base"),
          content: withOpacityValue("--base-content"),
        },
        primary: {
          100: withOpacityValue("--primary-100"),
          200: withOpacityValue("--primary-200"),
          300: withOpacityValue("--primary-300"),
          DEFAULT: withOpacityValue("--primary"),
          foreground: withOpacityValue("--primary-foreground"),
          glow: withOpacityValue("--primary-glow"),
        },
        secondary: {
          100: withOpacityValue("--secondary-100"),
          200: withOpacityValue("--secondary-200"),
          300: withOpacityValue("--secondary-300"),
          DEFAULT: withOpacityValue("--secondary"),
          foreground: withOpacityValue("--secondary-foreground"),
        },
        accent: {
          100: withOpacityValue("--accent-100"),
          200: withOpacityValue("--accent-200"),
          300: withOpacityValue("--accent-300"),
          DEFAULT: withOpacityValue("--accent"),
          foreground: withOpacityValue("--accent-foreground"),
        },
        neutral: {
          100: withOpacityValue("--neutral-100"),
          200: withOpacityValue("--neutral-200"),
          300: withOpacityValue("--neutral-300"),
          DEFAULT: withOpacityValue("--neutral"),
          content: withOpacityValue("--neutral-content"),
        },
        info: {
          100: withOpacityValue("--info-100"),
          200: withOpacityValue("--info-200"),
          300: withOpacityValue("--info-300"),
          DEFAULT: withOpacityValue("--info"),
          content: withOpacityValue("--info-content"),
        },
        success: {
          100: withOpacityValue("--success-100"),
          200: withOpacityValue("--success-200"),
          300: withOpacityValue("--success-300"),
          DEFAULT: withOpacityValue("--success"),
          content: withOpacityValue("--success-content"),
        },
        warning: {
          100: withOpacityValue("--warning-100"),
          200: withOpacityValue("--warning-200"),
          300: withOpacityValue("--warning-300"),
          DEFAULT: withOpacityValue("--warning"),
          content: withOpacityValue("--warning-content"),
        },
        error: {
          100: withOpacityValue("--error-100"),
          200: withOpacityValue("--error-200"),
          300: withOpacityValue("--error-300"),
          DEFAULT: withOpacityValue("--error"),
          content: withOpacityValue("--error-content"),
        },
        destructive: {
          DEFAULT: withOpacityValue("--destructive"),
          foreground: withOpacityValue("--destructive-foreground"),
        },
        muted: {
          DEFAULT: withOpacityValue("--muted"),
          foreground: withOpacityValue("--muted-foreground"),
        },
        popover: {
          DEFAULT: withOpacityValue("--popover"),
          foreground: withOpacityValue("--popover-foreground"),
        },
        card: {
          DEFAULT: withOpacityValue("--card"),
          foreground: withOpacityValue("--card-foreground"),
        },
        sidebar: {
          DEFAULT: withOpacityValue("--sidebar-background"),
          foreground: withOpacityValue("--sidebar-foreground"),
          primary: withOpacityValue("--sidebar-primary"),
          "primary-foreground": withOpacityValue("--sidebar-primary-foreground"),
          accent: withOpacityValue("--sidebar-accent"),
          "accent-foreground": withOpacityValue("--sidebar-accent-foreground"),
          border: withOpacityValue("--sidebar-border"),
          ring: withOpacityValue("--sidebar-ring"),
        },
        gradient: {
          start: withOpacityValue("--gradient-start"),
          mid: withOpacityValue("--gradient-mid"),
          end: withOpacityValue("--gradient-end"),
        },
        terminal: {
          bg: withOpacityValue("--terminal-bg"),
          surface: withOpacityValue("--terminal-surface"),
          border: withOpacityValue("--terminal-border"),
          text: withOpacityValue("--terminal-text"),
        },
        cmd: {
          success: withOpacityValue("--cmd-success"),
          error: withOpacityValue("--cmd-error"),
          info: withOpacityValue("--cmd-info"),
          warning: withOpacityValue("--cmd-warning"),
        },
        syntax: {
          keyword: withOpacityValue("--syntax-keyword"),
          string: withOpacityValue("--syntax-string"),
          number: withOpacityValue("--syntax-number"),
          comment: withOpacityValue("--syntax-comment"),
        },
        glass: {
          bg: withOpacityValue("--glass-bg"),
          border: withOpacityValue("--glass-border"),
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        box: "var(--radius-box)",
        field: "var(--radius-field)",
        selector: "var(--radius-selector)",
      },
      fontFamily: {
        sans: ["Rajdhani", "Inter", "var(--font-sans)"],
        display: ["Rajdhani", "var(--font-display)"],
        mono: ["Fira Code", "var(--font-mono)"],
        cyber: ["Rajdhani", "sans-serif"],
        code: ["Fira Code", "monospace"],
      },
      fontSize: {
        xs: "var(--text-xs)",
        sm: "var(--text-sm)",
        base: "var(--text-base)",
        lg: "var(--text-lg)",
        xl: "var(--text-xl)",
        "2xl": "var(--text-2xl)",
        "3xl": "var(--text-3xl)",
        "4xl": "var(--text-4xl)",
      },
      lineHeight: {
        tight: "var(--leading-tight)",
        normal: "var(--leading-normal)",
        relaxed: "var(--leading-relaxed)",
      },
      boxShadow: {
        "elevation-0": "var(--elevation-0)",
        "elevation-1": "var(--elevation-1)",
        "elevation-2": "var(--elevation-2)",
        "elevation-3": "var(--elevation-3)",
        "elevation-4": "var(--elevation-4)",
        "elevation-5": "var(--elevation-5)",
        depth: "var(--depth-shadow)",
        "depth-hover": "var(--depth-shadow-hover)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-hero": "linear-gradient(135deg, hsl(var(--gradient-start)), hsl(var(--gradient-mid)), hsl(var(--gradient-end)))",
        "gradient-ocean": "linear-gradient(135deg, hsl(195 85% 16%) 0%, hsl(190 84% 29%) 50%, hsl(173 80% 40%) 100%)",
      },
      transitionDuration: {
        instant: "var(--motion-instant)",
        fast: "var(--motion-fast)",
        medium: "var(--motion-medium)",
        slow: "var(--motion-slow)",
        slower: "var(--motion-slower)",
      },
      transitionTimingFunction: {
        standard: "var(--easing-standard)",
        emphatic: "var(--easing-emphatic)",
        decelerate: "var(--easing-decelerate)",
        accelerate: "var(--easing-accelerate)",
        smooth: "var(--easing-smooth)",
      },
      textShadow: {
        glow: "var(--text-glow-primary)",
        "glow-accent": "var(--text-glow-accent)",
        "glow-secondary": "var(--text-glow-secondary)",
        none: "none",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function({ addUtilities, matchUtilities, theme }) {
      // Glassmorphism utilities
      addUtilities({
        ".bg-glass": {
          "background-color": "hsl(var(--glass-bg))",
        },
        ".border-glass": {
          "border-color": "hsl(var(--glass-border))",
        },
        // Elevation utilities
        ".elevation-0": {
          "box-shadow": "var(--elevation-0)",
        },
        ".elevation-1": {
          "box-shadow": "var(--elevation-1)",
        },
        ".elevation-2": {
          "box-shadow": "var(--elevation-2)",
        },
        ".elevation-3": {
          "box-shadow": "var(--elevation-3)",
        },
        ".elevation-4": {
          "box-shadow": "var(--elevation-4)",
        },
        ".elevation-5": {
          "box-shadow": "var(--elevation-5)",
        },
        // Text glow utilities
        ".text-glow": {
          "text-shadow": "var(--text-glow-primary)",
        },
        ".text-glow-accent": {
          "text-shadow": "var(--text-glow-accent)",
        },
        ".text-glow-secondary": {
          "text-shadow": "var(--text-glow-secondary)",
        },
        // Cyberpunk boot-up animation
        ".cyber-fade-in": {
          "animation": "fadeIn 1s ease-out forwards",
          "opacity": "0",
        },
        // Performance hint
        ".will-change-transform": {
          "will-change": "transform",
        },
      });
      
      // Dynamic text shadow utilities
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
} satisfies Config;

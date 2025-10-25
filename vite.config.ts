import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { criticalCSS } from "./vite-plugin-critical-css";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    mode === "production" && criticalCSS({
      inlineThreshold: 14000,
      criticalSelectors: [
        'body', '#root', '.container', 'nav', 'header',
        '.hero', '#hero-section', 'button', '.btn',
        'h1', 'h2', 'h3', 'p', '.sr-only',
        '.glass-light', '.flex', '.grid'
      ],
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select'],
          'vendor-forms': ['react-hook-form', 'zod'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'posthog': ['posthog-js'],
        },
        // Separate CSS files for better caching
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            // Critical CSS goes in main, others get separate files
            if (assetInfo.name.includes('index') || assetInfo.name.includes('critical')) {
              return 'assets/critical-[hash].css';
            }
            return 'assets/[name]-[hash].css';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    chunkSizeWarningLimit: 600,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
    },
    cssMinify: true,
    cssCodeSplit: true, // Enable CSS code splitting for lazy loading
    target: 'es2020',
    sourcemap: false,
  },
}));

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React - loaded on every page
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
            return 'vendor-react';
          }
          // Animation library - defer until needed
          if (id.includes('framer-motion')) {
            return 'vendor-motion';
          }
          // UI components - split by usage
          if (id.includes('@radix-ui')) {
            // Group commonly used radix components
            if (id.includes('dialog') || id.includes('dropdown-menu') || id.includes('popover')) {
              return 'vendor-ui-overlay';
            }
            if (id.includes('select') || id.includes('checkbox') || id.includes('radio')) {
              return 'vendor-ui-form';
            }
            return 'vendor-ui-misc';
          }
          // Forms - only load when needed
          if (id.includes('react-hook-form') || id.includes('zod')) {
            return 'vendor-forms';
          }
          // Query library - defer until needed
          if (id.includes('@tanstack/react-query')) {
            return 'vendor-query';
          }
          // Supabase - defer until needed
          if (id.includes('@supabase/supabase-js')) {
            return 'vendor-supabase';
          }
          // Analytics - defer until user interaction
          if (id.includes('posthog')) {
            return 'vendor-analytics';
          }
          // Charts - defer until needed
          if (id.includes('recharts') || id.includes('chart.js')) {
            return 'vendor-charts';
          }
          // Syntax highlighting - defer until needed
          if (id.includes('react-syntax-highlighter')) {
            return 'vendor-syntax';
          }
          // Node modules that don't match above
          if (id.includes('node_modules')) {
            return 'vendor-misc';
          }
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
        passes: 3,
        unsafe_arrows: true,
        unsafe_methods: true,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    cssMinify: 'lightningcss',
    cssCodeSplit: true,
    target: 'es2020',
    sourcemap: false,
    reportCompressedSize: false,
    modulePreload: {
      polyfill: false,
    },
  },
}));

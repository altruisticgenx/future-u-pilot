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
          // Defer analytics to separate chunk
          if (id.includes('posthog')) {
            return 'analytics';
          }
          // Core React bundle
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
            return 'vendor-react';
          }
          // Animation library
          if (id.includes('framer-motion')) {
            return 'vendor-motion';
          }
          // UI components
          if (id.includes('@radix-ui')) {
            return 'vendor-ui';
          }
          // Forms
          if (id.includes('react-hook-form') || id.includes('zod')) {
            return 'vendor-forms';
          }
          // Data fetching
          if (id.includes('@tanstack/react-query')) {
            return 'vendor-query';
          }
          // Backend
          if (id.includes('@supabase/supabase-js')) {
            return 'vendor-supabase';
          }
          // Chart libraries (defer)
          if (id.includes('recharts') || id.includes('chart.js')) {
            return 'vendor-charts';
          }
          // Syntax highlighting (defer)
          if (id.includes('react-syntax-highlighter')) {
            return 'vendor-syntax';
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
        dead_code: true,
        unused: true,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    cssMinify: true,
    cssCodeSplit: true,
    target: 'es2020',
    sourcemap: false,
    reportCompressedSize: false,
  },
}));

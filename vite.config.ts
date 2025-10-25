import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Plugin to make CSS non-render-blocking
const asyncCssPlugin = (): Plugin => ({
  name: 'async-css',
  enforce: 'post' as const,
  transformIndexHtml(html: string) {
    // Transform CSS links to load asynchronously
    return html.replace(
      /<link([^>]*rel=["']stylesheet["'][^>]*)>/gi,
      (match: string, attrs: string) => {
        // Skip if already has media attribute or if it's a font
        if (attrs.includes('media=') || attrs.includes('fonts.googleapis')) {
          return match;
        }
        // Add media="print" and onload handler for async loading
        return `<link${attrs} media="print" onload="this.media='all';this.onload=null">`;
      }
    );
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    asyncCssPlugin()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Aggressively separate analytics to keep it off critical path
          if (id.includes('posthog') || id.includes('lib/posthog')) {
            return 'analytics-async';
          }
          
          // Split Supabase into smaller chunks - defer auth/storage/realtime
          if (id.includes('@supabase/supabase-js')) {
            if (id.includes('auth') || id.includes('storage') || id.includes('realtime')) {
              return 'supabase-features';
            }
            return 'vendor-supabase';
          }
          
          // Defer chart libraries
          if (id.includes('recharts') || id.includes('chart.js') || id.includes('react-chartjs')) {
            return 'charts-deferred';
          }
          
          // Defer syntax highlighting
          if (id.includes('react-syntax-highlighter') || id.includes('prismjs')) {
            return 'syntax-deferred';
          }
          
          // Core React bundle (critical) - keep minimal
          if (id.includes('node_modules/react/') && !id.includes('react-dom')) {
            return 'vendor-react-core';
          }
          if (id.includes('node_modules/react-dom/')) {
            return 'vendor-react-dom';
          }
          
          // React Router (critical for SPA)
          if (id.includes('react-router-dom')) {
            return 'vendor-router';
          }
          
          // Split Framer Motion - defer variants and gestures
          if (id.includes('framer-motion')) {
            if (id.includes('variants') || id.includes('gestures') || id.includes('drag')) {
              return 'motion-features';
            }
            return 'vendor-motion';
          }
          
          // Split Radix UI by component to improve tree-shaking
          if (id.includes('@radix-ui')) {
            // Only load dialog/dropdown/popover when needed
            if (id.includes('dialog') || id.includes('dropdown') || id.includes('popover')) {
              return 'ui-overlays';
            }
            // Defer form components
            if (id.includes('select') || id.includes('checkbox') || id.includes('radio')) {
              return 'ui-forms';
            }
            // Keep primitives in main bundle
            return 'vendor-ui';
          }
          
          // Forms (below fold, can be split)
          if (id.includes('react-hook-form') || id.includes('zod')) {
            return 'vendor-forms';
          }
          
          // Data fetching (defer until needed)
          if (id.includes('@tanstack/react-query')) {
            return 'vendor-query';
          }
          
          // Split large vendor libraries
          if (id.includes('node_modules')) {
            // Defer date libraries
            if (id.includes('date-fns')) {
              return 'vendor-dates';
            }
            // Defer validation libraries
            if (id.includes('validator') || id.includes('yup')) {
              return 'vendor-validation';
            }
          }
        },
        // Optimize chunk file names for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 600,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
        passes: 4, // Increased for better optimization
        dead_code: true,
        unused: true,
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        // Additional tree-shaking options
        side_effects: true, // Remove code with no side effects
        collapse_vars: true, // Collapse single-use variables
        reduce_vars: true, // Optimize variable assignments
        hoist_props: true, // Hoist object properties
        join_vars: true, // Join consecutive var statements
        conditionals: true, // Optimize if/else and conditional expressions
        comparisons: true, // Optimize comparisons
        evaluate: true, // Evaluate constant expressions
        booleans: true, // Optimize boolean expressions
        loops: true, // Optimize loops
        if_return: true, // Optimize if/return sequences
        inline: 3, // Inline functions aggressively
        drop_unreachable: true, // Remove unreachable code
      },
      mangle: {
        safari10: true,
        toplevel: true,
        properties: {
          regex: /^_/, // Mangle properties starting with underscore
        },
      },
      format: {
        comments: false,
        ecma: 2020,
        ascii_only: true, // Use ASCII for better compatibility and smaller size
      },
    },
    cssMinify: true,
    cssCodeSplit: true,
    target: 'es2020',
    sourcemap: false,
    reportCompressedSize: false,
    assetsInlineLimit: 4096,
  },
}));

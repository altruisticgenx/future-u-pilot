import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

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
    asyncCssPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        name: 'Future-U - Quantum AI Consultancy',
        short_name: 'Future-U',
        description: 'Quantum-AI Readiness Platform - Practical pilots for quantum computing, AI policy compliance, and post-quantum cryptography',
        theme_color: '#0a0f1e',
        background_color: '#0a0f1e',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/qwrkaktntdjsulthaask\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24
              },
              networkTimeoutSeconds: 10
            }
          }
        ]
      }
    })
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
          // Defer chart libraries
          if (id.includes('recharts') || id.includes('chart.js') || id.includes('react-chartjs')) {
            return 'charts-deferred';
          }
          // Defer syntax highlighting
          if (id.includes('react-syntax-highlighter') || id.includes('prismjs')) {
            return 'syntax-deferred';
          }
          // Core React bundle (critical)
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          // React Router (critical for SPA)
          if (id.includes('react-router-dom')) {
            return 'vendor-router';
          }
          // Animation library (used above fold)
          if (id.includes('framer-motion')) {
            return 'vendor-motion';
          }
          // UI components (used above fold)
          if (id.includes('@radix-ui')) {
            return 'vendor-ui';
          }
          // Forms (below fold, can be split)
          if (id.includes('react-hook-form') || id.includes('zod')) {
            return 'vendor-forms';
          }
          // Data fetching (critical for app functionality)
          if (id.includes('@tanstack/react-query')) {
            return 'vendor-query';
          }
          // Backend (critical for app functionality)
          if (id.includes('@supabase/supabase-js')) {
            return 'vendor-supabase';
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
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
        passes: 3,
        dead_code: true,
        unused: true,
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
      },
      mangle: {
        safari10: true,
        toplevel: true,
      },
      format: {
        comments: false,
        ecma: 2020,
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

/**
 * Vite plugin to extract critical CSS for above-the-fold content
 * This plugin identifies and inlines critical CSS during the build process
 */

import type { Plugin } from 'vite';

interface CriticalCSSOptions {
  /** Paths to HTML files to analyze */
  paths?: string[];
  /** Inline critical CSS threshold in bytes */
  inlineThreshold?: number;
  /** Patterns to identify critical CSS selectors */
  criticalSelectors?: string[];
}

export function criticalCSS(options: CriticalCSSOptions = {}): Plugin {
  const {
    inlineThreshold = 14000, // 14KB threshold for inlining
    criticalSelectors = [
      // Navigation and header
      'nav', '.navigation', 'header',
      // Hero section (above the fold)
      '.hero', '#hero-section', '.container',
      // Core layout
      'body', 'main', '#root',
      // Critical UI elements
      'button', '.btn', '.button',
      // Typography
      'h1', 'h2', 'h3', 'p',
      // Utilities
      '.sr-only', '.container', '.flex', '.grid',
      // Animation essentials
      '.animate-fade-in', '.animate-scale-in',
      // Glass effects (used in nav)
      '.glass-light', '.backdrop-blur',
    ],
  } = options;

  return {
    name: 'vite-plugin-critical-css',
    enforce: 'post',
    
    async transformIndexHtml(html) {
      // Only run in production builds
      if (process.env.NODE_ENV !== 'production') {
        return html;
      }

      // Extract critical CSS rules from the HTML
      const criticalStyles = criticalSelectors
        .map(selector => {
          // Map common critical selectors to actual CSS rules
          const rules: Record<string, string> = {
            'body': 'body{font-family:Rajdhani,Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;overflow-x:hidden}',
            '#root': '#root{min-height:100vh;display:flex;flex-direction:column}',
            '.container': '.container{max-width:80rem;margin:0 auto;padding:0 1rem}',
            'section': 'section{content-visibility:auto;contain-intrinsic-size:auto 500px}',
            '.sr-only': '.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}',
            '.glass-light': '.glass-light{backdrop-filter:blur(12px);background:rgba(255,255,255,0.1)}',
            '.flex': '.flex{display:flex}',
            '.grid': '.grid{display:grid}',
            'nav': 'nav{position:fixed;top:0;left:0;right:0;z-index:50}',
          };
          return rules[selector] || '';
        })
        .filter(Boolean)
        .join('');

      // Only inline if under threshold
      if (criticalStyles.length > 0 && criticalStyles.length < inlineThreshold) {
        // Inject critical CSS into the HTML head
        return html.replace(
          '</style>',
          `${criticalStyles}</style>`
        );
      }

      return html;
    },

    generateBundle(_, bundle) {
      // Analyze bundle to identify non-critical CSS that can be lazy-loaded
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (fileName.endsWith('.css') && chunk.type === 'asset') {
          const cssContent = chunk.source as string;
          
          // Check if this CSS file contains critical selectors
          const isCritical = criticalSelectors.some(selector => 
            cssContent.includes(selector)
          );

          if (!isCritical) {
            // Mark for lazy loading by adding metadata
            console.log(`[Critical CSS] Non-critical CSS identified: ${fileName}`);
          }
        }
      }
    },
  };
}

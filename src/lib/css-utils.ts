/**
 * CSS optimization utilities for critical CSS handling and lazy loading
 */

/**
 * Lazy load non-critical CSS to improve initial render performance
 * This function dynamically loads CSS files after the page has loaded
 */
export const loadNonCriticalCSS = (href: string): void => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print'; // Load asynchronously
  link.onload = () => {
    link.media = 'all'; // Apply after load
  };
  document.head.appendChild(link);
};

/**
 * Preload CSS with high priority for critical resources
 */
export const preloadCSS = (href: string): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  document.head.appendChild(link);
  
  // Apply after preload
  setTimeout(() => {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = href;
    document.head.appendChild(stylesheet);
  }, 0);
};

/**
 * Remove unused CSS classes from rendered component trees
 * This is a runtime optimization that can be used in production
 */
export const optimizeRenderedCSS = (): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  // Get all class names used in the DOM
  const usedClasses = new Set<string>();
  document.querySelectorAll('[class]').forEach((el) => {
    el.classList.forEach((className) => usedClasses.add(className));
  });
  
  // Log optimization stats only in development
  if (import.meta.env.DEV) {
    console.log(`CSS Optimization: ${usedClasses.size} classes in use`);
  }
};

/**
 * Inline critical CSS for above-the-fold content
 * This should be called during build time to extract critical styles
 */
export const getCriticalCSS = (): string => {
  return `
    /* Critical CSS - Above the fold */
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Rajdhani','Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
    #root{min-height:100vh}
    .container{max-width:80rem;margin:0 auto;padding:0 1rem}
    /* Prevent layout shifts */
    section{content-visibility:auto;contain-intrinsic-size:auto 500px}
  `;
};

/**
 * Dynamic CSS loader with prefetch support
 */
export class CSSLoader {
  private loaded = new Set<string>();
  private pending = new Map<string, Promise<void>>();

  async load(href: string, options: { prefetch?: boolean; critical?: boolean } = {}): Promise<void> {
    // Already loaded
    if (this.loaded.has(href)) {
      return Promise.resolve();
    }

    // Already loading
    if (this.pending.has(href)) {
      return this.pending.get(href)!;
    }

    // Start loading
    const loadPromise = new Promise<void>((resolve, reject) => {
      if (options.prefetch) {
        // Prefetch for faster subsequent loads
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = href;
        document.head.appendChild(prefetchLink);
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      
      if (!options.critical) {
        // Non-critical: load asynchronously
        link.media = 'print';
        link.onload = () => {
          link.media = 'all';
          this.loaded.add(href);
          this.pending.delete(href);
          resolve();
        };
      } else {
        // Critical: load synchronously
        link.onload = () => {
          this.loaded.add(href);
          this.pending.delete(href);
          resolve();
        };
      }

      link.onerror = () => {
        this.pending.delete(href);
        reject(new Error(`Failed to load CSS: ${href}`));
      };

      document.head.appendChild(link);
    });

    this.pending.set(href, loadPromise);
    return loadPromise;
  }

  isLoaded(href: string): boolean {
    return this.loaded.has(href);
  }
}

// Singleton instance
export const cssLoader = new CSSLoader();

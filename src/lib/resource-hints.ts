/**
 * Resource hints utilities for optimizing critical resource loading
 * Implements preload, prefetch, and preconnect strategies
 */

interface ResourceHintOptions {
  /** Resource type */
  as?: 'style' | 'script' | 'font' | 'image' | 'fetch' | 'document';
  /** Media query for conditional loading */
  media?: string;
  /** Crossorigin attribute */
  crossorigin?: 'anonymous' | 'use-credentials';
  /** Resource priority */
  importance?: 'high' | 'low' | 'auto';
}

/**
 * Preload critical resources to load them with high priority
 * Use for resources needed for initial render
 */
export const preloadResource = (
  href: string,
  options: ResourceHintOptions = {}
): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  
  if (options.as) link.as = options.as;
  if (options.media) link.media = options.media;
  if (options.crossorigin) link.crossOrigin = options.crossorigin;
  if (options.importance) link.setAttribute('importance', options.importance);
  
  document.head.appendChild(link);
};

/**
 * Prefetch resources for next navigation
 * Use for resources likely needed soon
 */
export const prefetchResource = (
  href: string,
  options: Pick<ResourceHintOptions, 'as'> = {}
): void => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  
  if (options.as) link.as = options.as;
  
  document.head.appendChild(link);
};

/**
 * Preconnect to origin for faster subsequent requests
 */
export const preconnectOrigin = (
  origin: string,
  crossorigin: boolean = false
): void => {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = origin;
  
  if (crossorigin) link.crossOrigin = 'anonymous';
  
  document.head.appendChild(link);
};

/**
 * DNS prefetch for early DNS resolution
 */
export const dnsPrefetch = (origin: string): void => {
  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = origin;
  
  document.head.appendChild(link);
};

/**
 * Batch resource hints for optimal loading
 */
export class ResourceLoader {
  private loaded = new Set<string>();
  private pending = new Set<string>();

  /**
   * Preload critical resources in optimal order
   */
  preloadCritical(): void {
    // 1. Critical fonts (highest priority)
    this.preloadFonts([
      'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap',
    ]);

    // 2. Critical CSS (if split)
    // Already inlined in index.html

    // 3. Hero images (if any)
    // Add hero image preloads here if needed
  }

  /**
   * Preload fonts with proper CORS and type
   */
  private preloadFonts(urls: string[]): void {
    urls.forEach((url) => {
      if (this.loaded.has(url) || this.pending.has(url)) return;
      
      this.pending.add(url);
      preloadResource(url, {
        as: 'style',
        crossorigin: 'anonymous',
      });
    });
  }

  /**
   * Prefetch resources for next page
   */
  prefetchNextPage(route: string): void {
    const routeResources: Record<string, string[]> = {
      '/about': ['about-page.css', 'about-page.js'],
      '/terminal': ['terminal-page.css', 'terminal-page.js', 'terminal-data.json'],
      '/experiments': ['experiments-page.css', 'experiments-page.js'],
    };

    const resources = routeResources[route];
    if (!resources) return;

    resources.forEach((resource) => {
      if (this.loaded.has(resource)) return;
      
      const ext = resource.split('.').pop();
      const as = ext === 'css' ? 'style' : ext === 'js' ? 'script' : 'fetch';
      
      prefetchResource(`/assets/${resource}`, { as });
    });
  }

  /**
   * Mark resource as loaded
   */
  markLoaded(href: string): void {
    this.loaded.add(href);
    this.pending.delete(href);
  }

  /**
   * Check if resource is loaded
   */
  isLoaded(href: string): boolean {
    return this.loaded.has(href);
  }
}

// Singleton instance
export const resourceLoader = new ResourceLoader();

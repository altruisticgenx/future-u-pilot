/**
 * Image Optimization Utilities
 * Provides helpers for responsive images, lazy loading, and WebP support
 */

/**
 * Generate srcset for responsive images
 * @param baseUrl - Base URL of the image
 * @param widths - Array of widths to generate
 * @returns srcset string
 */
export const generateSrcSet = (baseUrl: string, widths: number[]): string => {
  return widths.map(width => `${baseUrl}?w=${width} ${width}w`).join(', ');
};

/**
 * Generate sizes attribute for responsive images
 * Common breakpoints: 320px, 375px, 768px, 1024px
 */
export const responsiveSizes = {
  // Full width on mobile, half on tablet, third on desktop
  hero: '100vw',
  card: '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
  feature: '(min-width: 768px) 50vw, 100vw',
  thumbnail: '(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw',
};

/**
 * Check if browser supports WebP
 */
export const supportsWebP = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
};

/**
 * Get optimized image format
 * @param originalUrl - Original image URL
 * @returns URL with optimal format
 */
export const getOptimizedImageUrl = (originalUrl: string): string => {
  if (!originalUrl) return originalUrl;
  
  // If image is already optimized or is SVG, return as-is
  if (originalUrl.includes('.svg') || originalUrl.includes('webp')) {
    return originalUrl;
  }
  
  // Add format conversion hint for CDN/proxy that supports it
  const url = new URL(originalUrl, window.location.origin);
  
  if (supportsWebP()) {
    url.searchParams.set('format', 'webp');
  }
  
  return url.toString();
};

/**
 * Image loading observer for lazy loading
 */
export class ImageLoadObserver {
  private observer: IntersectionObserver | null = null;
  
  constructor() {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
              if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
                img.removeAttribute('data-srcset');
              }
              this.observer?.unobserve(img);
            }
          });
        },
        {
          rootMargin: '50px', // Start loading 50px before entering viewport
          threshold: 0.01
        }
      );
    }
  }
  
  observe(element: HTMLElement) {
    if (this.observer) {
      this.observer.observe(element);
    }
  }
  
  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

/**
 * Common image widths for responsive images
 */
export const IMAGE_WIDTHS = {
  thumbnail: [320, 640],
  card: [375, 768, 1024],
  hero: [768, 1024, 1536, 1920],
  full: [1024, 1536, 1920, 2560],
};

/**
 * Preload critical images
 * @param urls - Array of image URLs to preload
 */
export const preloadImages = (urls: string[]) => {
  if (typeof window === 'undefined') return;
  
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

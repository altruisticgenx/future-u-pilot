import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Aspect ratio (e.g., "16/9", "4/3", "1/1") */
  aspectRatio?: string;
  /** Width in pixels for container reservation */
  width?: number;
  /** Height in pixels for container reservation */
  height?: number;
  /** Lazy load image (default: true) */
  lazy?: boolean;
  /** Fallback image if load fails */
  fallback?: string;
  /** Loading skeleton background color */
  skeletonColor?: string;
  /** Class name for container */
  containerClassName?: string;
}

/**
 * Optimized image component with:
 * - Reserved space to prevent layout shifts (CLS)
 * - Lazy loading by default
 * - Aspect ratio preservation
 * - Loading skeleton
 * - Error fallback
 * - Intersection observer for optimal loading
 */
export const OptimizedImage = ({
  src,
  alt,
  aspectRatio,
  width,
  height,
  lazy = true,
  fallback = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%239ca3af" font-family="sans-serif" font-size="18"%3EImage%3C/text%3E%3C/svg%3E',
  skeletonColor = 'bg-muted/50',
  containerClassName,
  className,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection observer for lazy loading
  useEffect(() => {
    if (!lazy || shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before visible
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, shouldLoad]);

  // Calculate container style with reserved space
  const containerStyle: React.CSSProperties = {};
  
  if (aspectRatio) {
    containerStyle.aspectRatio = aspectRatio;
  } else if (width && height) {
    containerStyle.aspectRatio = `${width} / ${height}`;
  }
  
  if (width) {
    containerStyle.maxWidth = `${width}px`;
  }
  if (height && !aspectRatio) {
    containerStyle.height = `${height}px`;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden',
        containerClassName
      )}
      style={containerStyle}
    >
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div
          className={cn(
            'absolute inset-0 animate-pulse',
            skeletonColor
          )}
          aria-hidden="true"
        />
      )}

      {/* Actual image */}
      <img
        ref={imgRef}
        src={shouldLoad ? (hasError ? fallback : src) : fallback}
        alt={alt}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        // Explicit width/height for better CLS
        width={width}
        height={height}
        {...props}
      />
    </div>
  );
};

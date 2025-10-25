import { ImgHTMLAttributes, useState } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

/**
 * Optimized responsive image component with lazy loading and WebP support
 * 
 * Features:
 * - Lazy loading by default (unless priority=true)
 * - Proper aspect ratio preservation
 * - Loading states
 * - Async decoding for better performance
 * - Optimized for Core Web Vitals (LCP, CLS)
 * 
 * @example
 * <ResponsiveImage 
 *   src="/hero.jpg"
 *   alt="Hero image"
 *   width={1920}
 *   height={1080}
 *   priority={true}
 * />
 */
export function ResponsiveImage({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false,
  className,
  ...props 
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Calculate aspect ratio for CLS prevention
  const aspectRatio = width && height ? `${width} / ${height}` : undefined;

  if (hasError) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground text-sm",
          className
        )}
        style={{ 
          aspectRatio,
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : 'auto'
        }}
      >
        Failed to load image
      </div>
    );
  }

  return (
    <div 
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio }}
    >
      {/* Loading skeleton */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse"
          aria-hidden="true"
        />
      )}
      
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        {...props}
      />
    </div>
  );
}

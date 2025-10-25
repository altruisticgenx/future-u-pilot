import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  /** Video source URL */
  src: string;
  /** Aspect ratio (e.g., "16/9", "4/3") */
  aspectRatio?: string;
  /** Width in pixels for container reservation */
  width?: number;
  /** Height in pixels for container reservation */
  height?: number;
  /** Lazy load video (default: true) */
  lazy?: boolean;
  /** Poster image URL */
  poster?: string;
  /** Container class name */
  containerClassName?: string;
}

/**
 * Optimized video component with:
 * - Reserved space to prevent layout shifts
 * - Lazy loading using intersection observer
 * - Aspect ratio preservation
 * - Automatic play when visible (for autoplay videos)
 */
export const OptimizedVideo = ({
  src,
  aspectRatio = '16/9',
  width,
  height,
  lazy = true,
  poster,
  containerClassName,
  className,
  autoPlay,
  ...props
}: OptimizedVideoProps) => {
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection observer for lazy loading
  useEffect(() => {
    if (!lazy || shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            
            // Auto-play when visible if autoPlay is set
            if (autoPlay && videoRef.current) {
              videoRef.current.play().catch(() => {
                // Ignore autoplay errors (browser policy)
              });
            }
            
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px',
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, shouldLoad, autoPlay]);

  // Calculate container style
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
      className={cn('relative overflow-hidden bg-muted/20', containerClassName)}
      style={containerStyle}
    >
      {shouldLoad ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className={cn('w-full h-full object-cover', className)}
          width={width}
          height={height}
          preload="metadata"
          playsInline
          {...props}
        />
      ) : (
        // Placeholder with poster
        poster && (
          <img
            src={poster}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )
      )}
    </div>
  );
};

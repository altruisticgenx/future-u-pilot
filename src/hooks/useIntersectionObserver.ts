import { useEffect, useState, RefObject } from 'react';

interface UseIntersectionObserverOptions {
  /** Threshold for intersection (0-1) */
  threshold?: number;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Whether to freeze after first intersection */
  freezeOnceVisible?: boolean;
}

/**
 * Hook to detect when an element enters the viewport
 * Useful for lazy-loading animations and content
 */
export const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  options: UseIntersectionObserverOptions = {}
): boolean => {
  const {
    threshold = 0.2,
    rootMargin = '0px',
    freezeOnceVisible = true,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // If already visible and we should freeze, don't observe
    if (freezeOnceVisible && isIntersecting) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsIntersecting(isVisible);

        // Disconnect if we should freeze after first visibility
        if (freezeOnceVisible && isVisible) {
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, threshold, rootMargin, freezeOnceVisible, isIntersecting]);

  return isIntersecting;
};

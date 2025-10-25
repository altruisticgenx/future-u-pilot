import { useCallback, useRef } from 'react';

/**
 * Custom hook for smooth scrolling with RAF batching
 * Optimizes DOM reads/writes by batching them in requestAnimationFrame
 */
export const useSmoothScroll = () => {
  const rafIdRef = useRef<number | null>(null);

  const scrollToElement = useCallback((elementId: string, options?: ScrollIntoViewOptions) => {
    // Cancel any pending RAF
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    // Batch DOM read in RAF
    rafIdRef.current = requestAnimationFrame(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          ...options 
        });
      }
    });
  }, []);

  const scrollToTop = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, []);

  return { scrollToElement, scrollToTop };
};

/**
 * Custom hook for auto-scrolling containers with RAF batching
 * Used for chat scrolling and similar auto-scroll behaviors
 */
export const useAutoScroll = (dependencies: any[] = []) => {
  const rafIdRef = useRef<number | null>(null);

  const scrollToBottom = useCallback((element: HTMLElement | null) => {
    if (!element) return;

    // Cancel any pending RAF
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    // Batch DOM read (scrollHeight) and write (scrollTop) in RAF
    rafIdRef.current = requestAnimationFrame(() => {
      // Read phase
      const scrollHeight = element.scrollHeight;
      
      // Write phase
      requestAnimationFrame(() => {
        element.scrollTop = scrollHeight;
      });
    });
  }, dependencies);

  return { scrollToBottom };
};

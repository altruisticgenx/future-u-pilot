import { useEffect, useState } from 'react';
import type { PerformanceMetrics } from '@/types/hero';

/**
 * Hook to monitor Web Vitals and page performance metrics
 * Only active in development mode
 */
export const usePerformanceMonitor = (componentName: string = 'Component') => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [shouldReduceAnimations, setShouldReduceAnimations] = useState(false);

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log paint timing
        if (entry.entryType === 'paint') {
          console.log(`[${componentName}] ${entry.name}: ${entry.startTime.toFixed(2)}ms`);
          
          if (entry.name === 'first-contentful-paint') {
            setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
          }
        }

        // Log largest contentful paint
        if (entry.entryType === 'largest-contentful-paint') {
          const lcpEntry = entry as PerformanceEntry & { size: number };
          console.log(`[${componentName}] LCP: ${entry.startTime.toFixed(2)}ms (size: ${lcpEntry.size})`);
          setMetrics(prev => ({ ...prev, lcp: entry.startTime }));
        }

        // Log layout shifts
        if (entry.entryType === 'layout-shift') {
          const lsEntry = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
          if (!lsEntry.hadRecentInput) {
            setMetrics(prev => ({ 
              ...prev, 
              cls: (prev.cls || 0) + lsEntry.value 
            }));
            console.log(`[${componentName}] CLS: ${((metrics.cls || 0) + lsEntry.value).toFixed(4)}`);
          }
        }

        // Monitor long tasks (> 50ms)
        if (entry.entryType === 'longtask') {
          console.warn(`[${componentName}] Long task detected: ${entry.duration.toFixed(2)}ms`);
          
          // If we detect consistent performance issues, reduce animations
          if (entry.duration > 100) {
            setShouldReduceAnimations(true);
          }
        }
      }
    });

    // Observe all relevant entry types
    try {
      observer.observe({ 
        entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift', 'longtask'] 
      });
    } catch (e) {
      // Some browsers may not support all entry types
      console.warn(`[${componentName}] PerformanceObserver error:`, e);
    }

    return () => {
      observer.disconnect();
    };
  }, [componentName, metrics.cls]);

  return { metrics, shouldReduceAnimations };
};

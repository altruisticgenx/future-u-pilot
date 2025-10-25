import React from 'react';

// Convert hex color to RGB
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Calculate relative luminance
const getLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const val = c / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

// Calculate contrast ratio between two colors
export const checkColorContrast = (
  foreground: string,
  background: string
): { ratio: number; level: 'AAA' | 'AA' | 'FAIL' } => {
  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);

  if (!fg || !bg) {
    return { ratio: 0, level: 'FAIL' };
  }

  const l1 = getLuminance(fg.r, fg.g, fg.b);
  const l2 = getLuminance(bg.r, bg.g, bg.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);

  let level: 'AAA' | 'AA' | 'FAIL' = 'FAIL';
  if (ratio >= 7) {
    level = 'AAA';
  } else if (ratio >= 4.5) {
    level = 'AA';
  }

  return { ratio, level };
};

// Initialize axe-core in development mode
export const initAccessibilityAuditing = async () => {
  if (process.env.NODE_ENV !== 'production') {
    const axe = await import('@axe-core/react');
    const ReactDOM = await import('react-dom');
    
    axe.default(React, ReactDOM, 1000, {
      rules: [
        { id: 'color-contrast', enabled: true },
        { id: 'aria-allowed-attr', enabled: true },
        { id: 'aria-required-attr', enabled: true },
        { id: 'button-name', enabled: true },
        { id: 'image-alt', enabled: true },
        { id: 'label', enabled: true },
        { id: 'link-name', enabled: true },
      ],
    });
    
    console.log('♿ Accessibility auditing enabled. Check console for violations.');
  }
};

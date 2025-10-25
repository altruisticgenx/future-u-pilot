import React from 'react';

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

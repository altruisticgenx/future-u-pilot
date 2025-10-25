/**
 * Source Code Protection Utilities
 * 
 * NOTE: These are basic deterrents for casual users only.
 * Technical users can easily bypass these restrictions via:
 * - Browser DevTools settings
 * - View-source: protocol
 * - Network tab inspection
 * - Browser extensions
 * 
 * This is NOT a security measure - all client-side code is inherently accessible.
 */

export const initSourceProtection = () => {
  // Only run in production environment
  if (import.meta.env.DEV) {
    console.log('Source protection disabled in development mode');
    return;
  }

  // Disable right-click context menu
  document.addEventListener('contextmenu', (e: MouseEvent) => {
    e.preventDefault();
    console.log('Right-click disabled');
  });

  // Disable specific keyboard shortcuts
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.key.toLowerCase() === 'u') {
      e.preventDefault();
      console.log('Ctrl+U disabled');
      return;
    }

    // Ctrl+Shift+I (DevTools)
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') {
      e.preventDefault();
      console.log('Ctrl+Shift+I disabled');
      return;
    }

    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'j') {
      e.preventDefault();
      console.log('Ctrl+Shift+J disabled');
      return;
    }

    // Ctrl+Shift+C (Inspect Element)
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      console.log('Ctrl+Shift+C disabled');
      return;
    }

    // F12 (DevTools)
    if (e.key === 'F12') {
      e.preventDefault();
      console.log('F12 disabled');
      return;
    }

    // Cmd+Option+I (DevTools on Mac)
    if (e.metaKey && e.altKey && e.key.toLowerCase() === 'i') {
      e.preventDefault();
      console.log('Cmd+Option+I disabled');
      return;
    }

    // Cmd+Option+J (Console on Mac)
    if (e.metaKey && e.altKey && e.key.toLowerCase() === 'j') {
      e.preventDefault();
      console.log('Cmd+Option+J disabled');
      return;
    }

    // Cmd+Option+C (Inspect on Mac)
    if (e.metaKey && e.altKey && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      console.log('Cmd+Option+C disabled');
      return;
    }
  });

  // Detect DevTools opening (basic detection)
  const devToolsDetector = () => {
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if (widthThreshold || heightThreshold) {
      console.log('DevTools detected - consider redirecting or showing warning');
      // Optional: You could redirect or show a modal here
      // window.location.href = '/';
    }
  };

  // Check periodically (only in production)
  setInterval(devToolsDetector, 1000);

  // Disable text selection (optional - uncomment if needed)
  // document.addEventListener('selectstart', (e: Event) => {
  //   e.preventDefault();
  // });

  // Disable copy (optional - uncomment if needed)
  // document.addEventListener('copy', (e: ClipboardEvent) => {
  //   e.preventDefault();
  // });

  console.log('Source code protection enabled (production mode only)');
};

// Optional: Clear console periodically to remove debug messages
export const clearConsoleInterval = () => {
  if (import.meta.env.PROD) {
    setInterval(() => {
      console.clear();
    }, 5000);
  }
};

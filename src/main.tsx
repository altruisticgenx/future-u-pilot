import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Polyfill for requestIdleCallback
if (!('requestIdleCallback' in window)) {
  (window as any).requestIdleCallback = (cb: IdleRequestCallback) => {
    const start = Date.now();
    return setTimeout(() => {
      cb({
        didTimeout: false,
        timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
      });
    }, 1);
  };
}

// Render app immediately for fast TTI (loading indicator now in CSS)
const rootElement = document.getElementById("root")!;
createRoot(rootElement).render(<App />);

// Initialize accessibility auditing in development
if (process.env.NODE_ENV !== 'production') {
  import('./lib/accessibility').then(({ initAccessibilityAuditing }) => {
    initAccessibilityAuditing();
  });
}

// Defer analytics initialization until user interacts or scrolls
let analyticsLoaded = false;
const loadAnalytics = () => {
  if (analyticsLoaded) return;
  analyticsLoaded = true;
  
  requestIdleCallback(() => {
    import("./lib/posthog").then(({ initPostHog }) => initPostHog());
  }, { timeout: 3000 });
};

// Load on scroll, click, or after delay
window.addEventListener('scroll', loadAnalytics, { once: true, passive: true });
window.addEventListener('click', loadAnalytics, { once: true, passive: true });
window.addEventListener('touchstart', loadAnalytics, { once: true, passive: true });

// Fallback: load after 5 seconds if no interaction
setTimeout(loadAnalytics, 5000);

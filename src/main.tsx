import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LocalAIProvider } from "./contexts/LocalAIContext";

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

// Show loading screen immediately
const rootElement = document.getElementById("root")!;
rootElement.innerHTML = `
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: hsl(195 100% 5%);">
    <div style="text-align: center;">
      <div style="width: 48px; height: 48px; border: 3px solid hsl(173 80% 40%); border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
      <style>@keyframes spin { to { transform: rotate(360deg); }}</style>
    </div>
  </div>
`;

// Render app immediately for fast TTI
createRoot(rootElement).render(
  <LocalAIProvider>
    <App />
  </LocalAIProvider>
);

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

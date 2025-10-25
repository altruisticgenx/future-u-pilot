import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initPostHog } from "./lib/posthog";

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

// Initialize PostHog async
initPostHog();

// Render app after fonts load
if (document.fonts) {
  document.fonts.ready.then(() => {
    createRoot(rootElement).render(<App />);
  });
} else {
  createRoot(rootElement).render(<App />);
}

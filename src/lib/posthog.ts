import posthog from 'posthog-js'

export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    // Only initialize if API key is provided
    const apiKey = import.meta.env.VITE_POSTHOG_KEY
    const apiHost = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com'
    
    if (apiKey) {
      // Defer PostHog initialization until after page load for better FCP
      const initializePostHog = () => {
        posthog.init(apiKey, {
          api_host: apiHost,
          person_profiles: 'identified_only',
          capture_pageview: true,
          capture_pageleave: true,
          // Privacy-friendly options
          opt_out_capturing_by_default: false,
          respect_dnt: true,
          // Performance
          loaded: (posthog) => {
            if (import.meta.env.DEV) posthog.debug()
          },
        })
      }
      
      // Initialize after page is fully loaded to improve FCP
      if (document.readyState === 'complete') {
        initializePostHog()
      } else {
        window.addEventListener('load', initializePostHog, { once: true })
      }
    } else {
      console.warn('PostHog API key not found. Analytics disabled.')
    }
  }
}

export { posthog }

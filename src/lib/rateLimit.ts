/**
 * Simple in-memory rate limiter for edge functions
 * Production apps should use Redis or similar distributed cache
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry> = new Map();
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number = 60000, maxRequests: number = 10) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    
    // Clean up old entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  check(identifier: string): { allowed: boolean; resetAt: number } {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    // No previous requests or window expired
    if (!entry || now > entry.resetAt) {
      this.requests.set(identifier, {
        count: 1,
        resetAt: now + this.windowMs,
      });
      return { allowed: true, resetAt: now + this.windowMs };
    }

    // Within rate limit
    if (entry.count < this.maxRequests) {
      entry.count++;
      return { allowed: true, resetAt: entry.resetAt };
    }

    // Rate limit exceeded
    return { allowed: false, resetAt: entry.resetAt };
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.requests.entries()) {
      if (now > entry.resetAt) {
        this.requests.delete(key);
      }
    }
  }
}

// Export singleton instances for different use cases
export const chatRateLimiter = new RateLimiter(60000, 10); // 10 req/min
export const imageRateLimiter = new RateLimiter(60000, 5);  // 5 req/min
export const analysisRateLimiter = new RateLimiter(60000, 20); // 20 req/min

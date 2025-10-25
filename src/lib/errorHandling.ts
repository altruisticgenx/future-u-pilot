// Sanitized error messages for production
const FRIENDLY_ERROR_MESSAGES: Record<string, string> = {
  // Database errors
  '23505': 'This name is already in use. Please choose a different one.',
  '23503': 'Invalid reference. Please check your input.',
  '23502': 'Required field is missing.',
  '42501': 'You do not have permission to perform this action.',
  '42P01': 'Resource not found.',
  
  // Generic fallbacks
  'PGRST116': 'No data found.',
  'default': 'An error occurred. Please try again.',
};

/**
 * Sanitizes error messages for display to users
 * Logs full error details in development only
 * @param error - The error object
 * @param context - Optional context for logging
 * @returns User-friendly error message
 */
export const sanitizeError = (error: any, context?: string): string => {
  // Log full error in development only
  if (import.meta.env.DEV) {
    console.error(`[ERROR${context ? ` - ${context}` : ''}]:`, error);
  }
  
  // Return generic message in production
  if (error?.code && FRIENDLY_ERROR_MESSAGES[error.code]) {
    return FRIENDLY_ERROR_MESSAGES[error.code];
  }
  
  return FRIENDLY_ERROR_MESSAGES.default;
};

/**
 * Environment-aware logging
 * Only logs in development to avoid exposing sensitive data
 */
export const devLog = {
  error: (...args: any[]) => {
    if (import.meta.env.DEV) {
      console.error(...args);
    }
  },
  warn: (...args: any[]) => {
    if (import.meta.env.DEV) {
      console.warn(...args);
    }
  },
  info: (...args: any[]) => {
    if (import.meta.env.DEV) {
      console.info(...args);
    }
  },
  log: (...args: any[]) => {
    if (import.meta.env.DEV) {
      console.log(...args);
    }
  },
};

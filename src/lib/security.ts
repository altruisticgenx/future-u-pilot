import { supabase } from '@/integrations/supabase/client';

/**
 * Security utility functions for the application
 * ⚠️ WARNING: Current implementation does not include authentication
 * All database operations are currently public
 */

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
}

// Get current user ID (returns null if not authenticated)
export async function getCurrentUserId(): Promise<string | null> {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user?.id ?? null;
}

// Security warning for development
export function logSecurityWarning(operation: string): void {
  if (import.meta.env.DEV) {
    console.warn(
      `⚠️ SECURITY WARNING: ${operation} is currently public\n` +
      `Before production: Implement authentication and add user_id to queries\n` +
      `See README.md Security Considerations section`
    );
  }
}

// Wrapper for database operations with security warnings
export async function secureOperation<T>(
  operation: () => Promise<T>,
  operationName: string
): Promise<T> {
  logSecurityWarning(operationName);
  
  // Check if authenticated (for future use)
  const authenticated = await isAuthenticated();
  
  if (!authenticated && import.meta.env.DEV) {
    console.info(`ℹ️ ${operationName}: Operating without authentication (development mode)`);
  }
  
  return operation();
}

// Environment checks
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;

// Feature flags for security features
export const securityFeatures = {
  authEnabled: false, // Set to true when authentication is implemented
  rlsEnabled: false,  // Set to true when RLS policies are in place
  inputValidation: true, // Already implemented
};

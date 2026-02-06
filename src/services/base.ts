/**
 * Base service utilities for error handling and response formatting
 */

import type { PostgrestError } from '@supabase/supabase-js';

export interface ServiceResponse<T> {
  data: T | null;
  error: string | null;
}

/**
 * Normalize Supabase errors into user-friendly messages
 */
export function handleSupabaseError(
  error: PostgrestError | null
): string | null {
  if (!error) return null;

  // Handle common Supabase error codes
  switch (error.code) {
    case 'PGRST116':
      return 'No rows found';
    case '23505':
      return 'This record already exists';
    case '23503':
      return 'Referenced record not found';
    case '42501':
      return 'Permission denied';
    default:
      return error.message || 'An error occurred';
  }
}

/**
 * Create a standardized service response
 */
export function createServiceResponse<T>(
  data: T | null,
  error: PostgrestError | null
): ServiceResponse<T> {
  return {
    data,
    error: handleSupabaseError(error),
  };
}

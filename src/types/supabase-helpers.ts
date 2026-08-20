// Temporary wrapper types for Supabase queries to fix TypeScript inference issues
// TODO: Replace with proper generated types from Supabase CLI

export type SupabaseQueryResult<T = any> = {
  data: T | null;
  error: any;
};

export type SupabaseResponse<T = any> = Promise<SupabaseQueryResult<T>>;

// Helper to cast Supabase query results
export function castQuery<T = any>(promise: any): SupabaseResponse<T> {
  return promise as SupabaseResponse<T>;
}

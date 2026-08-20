import { supabase, isSupabaseConfigured } from '@/lib/supabase';

/**
 * Storage mode type
 * - 'cloud': User is authenticated and online, use Supabase
 * - 'local': User is offline or not authenticated, use SQLite
 */
export type StorageMode = 'cloud' | 'local';

/**
 * StorageAdapter decides whether to use cloud (Supabase) or local (SQLite) storage
 * based on authentication status and connectivity.
 */
export class StorageAdapter {
  /**
   * Determines the current storage mode
   * @returns 'cloud' if user is authenticated and Supabase is configured, 'local' otherwise
   */
  static async getMode(): Promise<StorageMode> {
    // If Supabase is not configured, always use local
    if (!isSupabaseConfigured) {
      return 'local';
    }

    try {
      // Check if user is authenticated
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // If authenticated, use cloud
      return session ? 'cloud' : 'local';
    } catch (error) {
      console.warn('Error checking auth session, falling back to local:', error);
      return 'local';
    }
  }

  /**
   * Checks if the app is online and Supabase is configured
   * @returns true if online and Supabase is available, false otherwise
   */
  static async isOnline(): Promise<boolean> {
    if (!navigator.onLine || !isSupabaseConfigured) {
      return false;
    }

    try {
      // Quick health check - try to get session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      return session !== null;
    } catch {
      return false;
    }
  }

  /**
   * Checks if user is authenticated
   * @returns true if user has valid session, false otherwise
   */
  static async isAuthenticated(): Promise<boolean> {
    if (!isSupabaseConfigured) {
      return false;
    }

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      return session !== null;
    } catch {
      return false;
    }
  }

  /**
   * Gets the current user ID if authenticated
   * @returns User ID or null if not authenticated
   */
  static async getUserId(): Promise<string | null> {
    if (!isSupabaseConfigured) {
      return null;
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user?.id ?? null;
    } catch {
      return null;
    }
  }

  /**
   * Adds event listeners for connectivity and auth changes
   * @param onModeChange Callback when storage mode changes
   */
  static addModeChangeListener(onModeChange: (mode: StorageMode) => void): () => void {
    const checkAndNotify = async () => {
      const mode = await this.getMode();
      onModeChange(mode);
    };

    // Listen for online/offline events
    window.addEventListener('online', checkAndNotify);
    window.addEventListener('offline', checkAndNotify);

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkAndNotify();
    });

    // Return cleanup function
    return () => {
      window.removeEventListener('online', checkAndNotify);
      window.removeEventListener('offline', checkAndNotify);
      subscription.unsubscribe();
    };
  }
}

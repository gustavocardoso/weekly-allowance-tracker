import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import { syncService } from '@/services/SyncService';
import SyncDialog from '@/components/SyncDialog';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSyncDialog, setShowSyncDialog] = useState(false);
  const [localDataCounts, setLocalDataCounts] = useState({ profiles: 0, situations: 0, cycles: 0, entries: 0 });

  // Check for local data and prompt sync if needed
  const checkAndPromptSync = async () => {
    try {
      const counts = await syncService.getLocalDataCounts();
      const totalItems = counts.profiles + counts.situations + counts.cycles + counts.entries;
      
      if (totalItems > 0) {
        setLocalDataCounts(counts);
        setShowSyncDialog(true);
      }
    } catch (error) {
      console.error('Error checking local data:', error);
    }
  };

  // Handle sync completion
  const handleSyncComplete = () => {
    setShowSyncDialog(false);
    setLocalDataCounts({ profiles: 0, situations: 0, cycles: 0, entries: 0 });
  };

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured. Please set up environment variables.');
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // After successful login, check for local data
    await checkAndPromptSync();
  };

  const signUp = async (email: string, password: string): Promise<void> => {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured. Please set up environment variables.');
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
  };

  const signInWithGoogle = async (): Promise<void> => {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured. Please set up environment variables.');
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
  };

  const signInWithFacebook = async (): Promise<void> => {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured. Please set up environment variables.');
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
  };

  const signOut = async (): Promise<void> => {
    if (!isSupabaseConfigured) {
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    isConfigured: isSupabaseConfigured,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      
      {/* Sync Dialog */}
      <SyncDialog
        isOpen={showSyncDialog}
        onClose={() => setShowSyncDialog(false)}
        onSyncComplete={handleSyncComplete}
        localDataCounts={localDataCounts}
      />
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

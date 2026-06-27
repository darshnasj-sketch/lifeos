import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { AuthContext, type AuthContextValue } from './AuthContext';
import { requireSupabase, supabase } from '../lib/supabase';
import { ensureProfile } from '../services/profileService';
import type { Profile } from '../types/profile';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const user = session?.user ?? null;

  const refreshProfile = useCallback(async () => {
    if (!session?.user) {
      setProfile(null);
      return;
    }

    const nextProfile = await ensureProfile(session.user);
    setProfile(nextProfile);
  }, [session]);

  useEffect(() => {
    let mounted = true;

    if (!supabase) {
      setLoading(false);
      return () => {
        mounted = false;
      };
    }

    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;

      setSession(data.session);

      if (data.session?.user) {
        const nextProfile = await ensureProfile(data.session.user);
        if (mounted) setProfile(nextProfile);
      }

      if (mounted) setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);

      if (!nextSession?.user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      ensureProfile(nextSession.user)
        .then(setProfile)
        .finally(() => setLoading(false));
    });

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    const supabase = requireSupabase();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;
  }, []);

  const signUpWithEmail = useCallback(async (fullName: string, email: string, password: string) => {
    const supabase = requireSupabase();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) throw error;

    if (data.user && data.session) {
      const nextProfile = await ensureProfile(data.user, fullName);
      setProfile(nextProfile);
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const supabase = requireSupabase();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (error) throw error;
  }, []);

  const sendPasswordReset = useCallback(async (email: string) => {
    const supabase = requireSupabase();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });

    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    const supabase = requireSupabase();
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user,
      profile,
      loading,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      sendPasswordReset,
      signOut,
      refreshProfile,
    }),
    [
      session,
      user,
      profile,
      loading,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      sendPasswordReset,
      signOut,
      refreshProfile,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

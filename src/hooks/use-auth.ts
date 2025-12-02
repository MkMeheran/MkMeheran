"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { createBrowserClient } from "@/lib/supabase";
import { User, Session } from "@supabase/supabase-js";
import type { UserRole } from "@/types";

interface AuthState {
  user: User | null;
  session: Session | null;
  role: UserRole | null;
  loading: boolean;
  error: Error | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    role: null,
    loading: true,
    error: null,
  });

  const supabase = useMemo(() => {
    if (typeof window === "undefined") return null;
    return createBrowserClient();
  }, []);

  useEffect(() => {
    if (!supabase) {
      setState(prev => ({ ...prev, loading: false }));
      return;
    }
    
    // Get initial session
    const getSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) throw error;

        if (session) {
          // Get user role from metadata or default to 'user'
          const role =
            (session.user.user_metadata?.role as UserRole) || "user";
          setState({
            user: session.user,
            session,
            role,
            loading: false,
            error: null,
          });
        } else {
          setState({
            user: null,
            session: null,
            role: null,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: error as Error,
        }));
      }
    };

    getSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const role =
          (session.user.user_metadata?.role as UserRole) || "user";
        setState({
          user: session.user,
          session,
          role,
          loading: false,
          error: null,
        });
      } else {
        setState({
          user: null,
          session: null,
          role: null,
          loading: false,
          error: null,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      if (!supabase) throw new Error("Supabase client not available");
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        return data;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: error as Error,
        }));
        throw error;
      }
    },
    [supabase]
  );

  const signUp = useCallback(
    async (email: string, password: string, role: UserRole = "user") => {
      if (!supabase) throw new Error("Supabase client not available");
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              role,
            },
          },
        });
        if (error) throw error;
        return data;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: error as Error,
        }));
        throw error;
      }
    },
    [supabase]
  );

  const signOut = useCallback(async () => {
    if (!supabase) throw new Error("Supabase client not available");
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error as Error,
      }));
      throw error;
    }
  }, [supabase]);

  const hasRole = useCallback(
    (requiredRole: UserRole | UserRole[]) => {
      if (!state.role) return false;
      if (Array.isArray(requiredRole)) {
        return requiredRole.includes(state.role);
      }
      return state.role === requiredRole || state.role === "admin";
    },
    [state.role]
  );

  return {
    ...state,
    signIn,
    signUp,
    signOut,
    hasRole,
    isAuthenticated: !!state.session,
    isAdmin: state.role === "admin",
  };
}

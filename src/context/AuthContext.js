import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, isUserCoach } from '../services/authService';
import supabase from '../supabaseClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isCoach, setIsCoach] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Check if Supabase is initialized
    if (!supabase || !supabase.auth) {
      console.error("Supabase client not properly initialized. Check your .env file for valid credentials.");
      setAuthError("Erreur d'initialisation de l'authentification. Veuillez contacter l'administrateur.");
      setLoading(false);
      return;
    }

    // Check for existing session
    const initializeAuth = async () => {
      try {
        setLoading(true);
        
        // Get the current session directly first
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Auth session error:', sessionError);
          throw sessionError;
        }

        if (sessionData?.session?.user) {
          const currentUser = sessionData.session.user;
          setUser(currentUser);
          
          // Check if the user is a coach
          const coachStatus = await isUserCoach(currentUser.id);
          setIsCoach(coachStatus);
        } else {
          // No session found - normal for not logged-in users
          setUser(null);
          setIsCoach(false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setAuthError(error.message);
        setUser(null);
        setIsCoach(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email || "No user");
        
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          try {
            const coachStatus = await isUserCoach(session.user.id);
            setIsCoach(coachStatus);
          } catch (error) {
            console.error("Failed to check coach status:", error);
          }
        } else if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
          setUser(null);
          setIsCoach(false);
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          setUser(session.user);
        }
      }
    );

    // Clean up the listener when the component unmounts
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // Value object to provide through the context
  const value = {
    user,
    isCoach,
    loading,
    authError,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 
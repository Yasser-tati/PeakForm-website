import supabase from '../supabaseClient';
import { v4 as uuidv4 } from 'uuid';

/**
 * Register a new user with Supabase Auth and store user data in the database
 */
export const registerUser = async (userData) => {
  try {
    if (!supabase || !supabase.auth) {
      throw new Error("Supabase client not properly initialized. Check your credentials.");
    }

    console.log("Starting registration with data:", {
      email: userData.email,
      name: userData.name,
      dateOfBirth: userData.dateOfBirth,
      gender: userData.gender,
      isCoach: userData.isCoach
    });

    // First, create the auth user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          full_name: userData.name,
          gender: userData.gender
        }
      }
    });

    if (authError) {
      console.error("Auth Error:", authError);
      
      // Check for email already registered error
      if (authError.message && (
          authError.message.includes('already registered') || 
          authError.message.includes('User already registered')
        )) {
        throw new Error("Cette adresse e-mail est déjà utilisée. Veuillez vous connecter ou utiliser une autre adresse e-mail.");
      }
      
      throw authError;
    }

    if (!authData || !authData.user || !authData.user.id) {
      throw new Error("Failed to create user account - no user data returned");
    }

    console.log("Auth user created successfully:", authData.user.id);

    // Important: To handle RLS policies, we need to ensure we're using the authenticated user's session
    // First, we'll sign in with the newly created user to get a valid session
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    });

    if (signInError) {
      console.error("Error signing in after registration:", signInError);
      // Continue with the process - we'll try to insert anyway
    } else {
      console.log("Successfully signed in after registration");
    }

    // Create user data in our database table
    const userId = authData.user.id;
    
    // Insert into the user table
    const { error: userError } = await supabase
      .from('user')
      .insert({
        user_id: userId,
        Full_name: userData.name,
        email: userData.email,
        birthdate: userData.dateOfBirth,
        gender: userData.gender,
        creatad_at: new Date().toISOString(),
        last_login: new Date().toISOString()
      });

    if (userError) {
      console.error("User table insert error:", userError);
      
      // Check for duplicate key error
      if (userError.message && (
          userError.message.includes('duplicate key value violates unique constraint') ||
          userError.message.includes('user_pkey') ||
          userError.code === '23505'
        )) {
        throw new Error("Cette adresse e-mail est déjà utilisée. Veuillez vous connecter ou utiliser une autre adresse e-mail.");
      }
      
      // If this fails due to RLS, try using the service role client if available
      if (userError.message.includes('permission denied') || userError.code === '42501') {
        console.warn("Permission denied. Your RLS policies might need adjustment.");
        // You may need to adjust RLS policies in Supabase to allow inserting for new users
      }
      
      throw userError;
    }

    console.log("User record inserted successfully");

    // If user is a coach, also insert into coach table
    if (userData.isCoach) {
      console.log("Creating coach record");
      const coachId = uuidv4();
      const { error: coachError } = await supabase
        .from('coach')
        .insert({
          coach_id: coachId,
          user_id: userId,
          certificate: userData.certificateNumber || '',
          cin: userData.coachId || ''
        });

      if (coachError) {
        console.error("Coach table error:", coachError);
        throw coachError;
      }
      console.log("Coach record inserted successfully");
    } else {
      // If user is a client, insert into client table
      console.log("Creating client record");
      const clientId = uuidv4();
      const { error: clientError } = await supabase
        .from('client')
        .insert({
          client_id: clientId,
          user_id: userId
        });

      if (clientError) {
        console.error("Client table error:", clientError);
        throw clientError;
      }
      console.log("Client record inserted successfully");
    }

    return { success: true, user: authData.user };
  } catch (error) {
    console.error('Registration error:', error);
    return { 
      success: false, 
      error: error.message || "Une erreur s'est produite lors de l'inscription. Veuillez réessayer." 
    };
  }
};

/**
 * Sign in a user with email and password
 */
export const signInUser = async (email, password) => {
  try {
    if (!supabase || !supabase.auth) {
      throw new Error("Supabase client not properly initialized. Check your credentials.");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Sign in error:", error);
      throw error;
    }

    if (!data || !data.user) {
      throw new Error("No user data returned from sign in");
    }

    // Update last login time
    const { error: updateError } = await supabase
      .from('user')
      .update({ last_login: new Date().toISOString() })
      .eq('user_id', data.user.id);

    if (updateError) {
      console.error('Error updating last login:', updateError);
      // Don't throw here, as the login was still successful
    }

    return { success: true, user: data.user };
  } catch (error) {
    console.error('Sign in error:', error);
    return { 
      success: false, 
      error: error.message || "Erreur de connexion. Veuillez vérifier vos identifiants." 
    };
  }
};

/**
 * Sign out the current user
 */
export const signOutUser = async () => {
  try {
    if (!supabase || !supabase.auth) {
      throw new Error("Supabase client not properly initialized. Check your credentials.");
    }

    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Sign out error:", error);
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    return { 
      success: false, 
      error: error.message || "Erreur lors de la déconnexion." 
    };
  }
};

/**
 * Get the current user
 */
export const getCurrentUser = async () => {
  try {
    if (!supabase || !supabase.auth) {
      throw new Error("Supabase client not properly initialized. Check your credentials.");
    }

    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      // If it's just a missing session, don't log it as an error as this is normal for non-logged in users
      if (error.message !== "Auth session missing!") {
        console.error("Get user error:", error);
      }
      throw error;
    }
    
    return data.user;
  } catch (error) {
    // Only log real errors, not missing sessions
    if (error.message !== "Auth session missing!") {
      console.error('Get current user error:', error);
    }
    return null;
  }
};

/**
 * Check if a user is a coach
 */
export const isUserCoach = async (userId) => {
  try {
    if (!userId) return false;

    if (!supabase) {
      throw new Error("Supabase client not properly initialized. Check your credentials.");
    }

    const { data, error } = await supabase
      .from('coach')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 means no rows returned
      console.error("Coach check error:", error);
      throw error;
    }
    
    return !!data; // Returns true if data exists (user is a coach)
  } catch (error) {
    console.error('Check coach status error:', error);
    return false;
  }
};

/**
 * Check if a user's email is verified
 */
export const isEmailVerified = async (email) => {
  try {
    if (!supabase || !supabase.auth) {
      throw new Error("Supabase client not properly initialized. Check your credentials.");
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: false, // Don't create a new user
      }
    });

    if (error) {
      if (error.message.includes("Email not confirmed")) {
        // This error means the email exists but is not confirmed
        return { verified: false, message: "Email not confirmed" };
      }
      
      // For other errors, we can't determine if the email is verified
      console.error("Error checking email verification:", error);
      throw error;
    }

    // If we get here with data and no error, the email is verified
    return { verified: true };
  } catch (error) {
    console.error('Email verification check error:', error);
    return { 
      verified: false, 
      error: error.message || "Erreur lors de la vérification de l'email." 
    };
  }
};

/**
 * Check the verification status of a user by email
 */
export const checkEmailVerificationStatus = async (email) => {
  try {
    if (!supabase || !supabase.auth) {
      throw new Error("Supabase client not properly initialized. Check your credentials.");
    }

    // Try to get the user by email from the auth.users table
    // This is an admin-level operation that requires service_role key
    // If using this in production, make sure to implement this on your backend
    
    // For client-side checking, try logging in - if it works without OTP, the email is verified
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      if (error.message === "Invalid login credentials") {
        return { verified: false, message: "Email not confirmed" };
      }
      console.error("Error checking user:", error);
      throw error;
    }
    
    // Check if we got user data and the email matches
    if (data && data.user && data.user.email === email && data.user.email_confirmed_at) {
      return { verified: true };
    }
    
    return { verified: false, message: "Email not confirmed or user not found" };
  } catch (error) {
    console.error('Verification status check error:', error);
    return { 
      verified: false, 
      error: error.message || "Erreur lors de la vérification du statut de l'email." 
    };
  }
}; 
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Check if the credentials are available
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_url_here' || supabaseAnonKey === 'your_supabase_anon_key_here') {
  console.error('Supabase credentials are missing or not set properly. Please check your .env file.');
}

// Create the Supabase client with optimized configuration
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: localStorage,
    storageKey: 'fitness-app-auth-token',
    debug: process.env.NODE_ENV === 'development',
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
  global: {
    headers: {
      'x-application-name': 'fitness-app',
    },
  },
});

// Log successful client initialization
console.log('Supabase client initialized with URL:', supabaseUrl?.substring(0, 15) + '...');

export default supabase; 
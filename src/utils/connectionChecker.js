import supabase from '../supabaseClient';

/**
 * Comprehensive Supabase connection checker
 * Identifies specific issues with Supabase connectivity
 */
export const checkSupabaseConnection = async () => {
  console.log('---- Supabase Connection Diagnostics ----');
  
  // Step 1: Check if environment variables are set
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('ERROR: Environment variables are missing.');
    console.error('- Make sure you have a .env file in your project root');
    console.error('- Verify it contains REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY');
    console.error('- Restart your development server after creating/updating .env');
    return {
      success: false,
      error: 'Missing Supabase credentials in environment variables',
      fix: 'Create or update .env file with proper credentials and restart your dev server'
    };
  }
  
  console.log('✓ Environment variables found');
  
  // Step 2: Check if values look reasonable
  if (supabaseUrl === 'your_supabase_url_here' || 
      supabaseAnonKey === 'your_supabase_anon_key_here' ||
      !supabaseUrl.includes('supabase.co')) {
    console.error('ERROR: Environment variables have placeholder values');
    console.error('- Your .env file contains placeholder values, not actual credentials');
    return {
      success: false,
      error: 'Placeholder values detected in environment variables',
      fix: 'Replace placeholder values in .env with actual Supabase credentials'
    };
  }
  
  console.log('✓ Environment variables contain valid-looking values');
  console.log(`- URL: ${supabaseUrl.substring(0, 20)}...`);
  console.log(`- Key: ${supabaseAnonKey.substring(0, 5)}...`);
  
  // Step 3: Test a simple network request to check connectivity
  try {
    // Use a simple fetch instead of Supabase client to isolate network issues
    const response = await fetch(`${supabaseUrl}/auth/v1/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey
      }
    });
    
    if (!response.ok) {
      // We got a response, but it's an error
      console.error(`ERROR: Supabase API returned status ${response.status}`);
      if (response.status === 404) {
        return {
          success: false,
          error: 'Supabase URL appears incorrect (404 Not Found)',
          fix: 'Verify your Supabase URL in the .env file'
        };
      } else if (response.status === 401 || response.status === 403) {
        return {
          success: false, 
          error: 'Supabase authentication failed (Unauthorized)',
          fix: 'Verify your Supabase anon key in the .env file'
        };
      } else {
        return {
          success: false,
          error: `Supabase returned HTTP error ${response.status}`,
          fix: 'Check Supabase dashboard for service status'
        };
      }
    }
    
    console.log('✓ Network connectivity test passed');
    
    // Step 4: Test Supabase client directly
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('ERROR: Supabase client error:', error.message);
        return {
          success: false,
          error: `Supabase client error: ${error.message}`,
          fix: 'Check Supabase client configuration and credentials'
        };
      }
      
      console.log('✓ Supabase client test passed');
      
      return {
        success: true,
        message: 'All Supabase connection checks passed successfully'
      };
    } catch (clientError) {
      console.error('ERROR: Supabase client exception:', clientError.message);
      return {
        success: false,
        error: `Exception using Supabase client: ${clientError.message}`,
        fix: 'Check browser console for detailed error information'
      };
    }
    
  } catch (networkError) {
    console.error('ERROR: Network request failed:', networkError.message);
    
    // Identify common network issues
    if (networkError.message === 'Failed to fetch') {
      return {
        success: false,
        error: 'Network request failed. Possible causes:',
        details: [
          '1. Your browser is offline - check your internet connection',
          '2. CORS issue - verify your app URL is in Supabase allowed origins',
          '3. Supabase service might be down - check status.supabase.com',
          '4. A browser extension might be blocking the request'
        ],
        fix: 'Check your internet connection and add your development URL to Supabase CORS settings'
      };
    }
    
    return {
      success: false,
      error: `Network error: ${networkError.message}`,
      fix: 'Check your internet connection and firewall settings'
    };
  }
};

// Add to window for easy browser console access
if (typeof window !== 'undefined') {
  window.checkSupabaseConnection = checkSupabaseConnection;
}

export default checkSupabaseConnection; 
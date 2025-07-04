import supabase from '../supabaseClient';

/**
 * Test the Supabase connection
 */
export const testSupabaseConnection = async () => {
  try {
    // Test if Supabase is initialized properly
    if (!supabase || !supabase.auth) {
      console.error('Supabase client is not properly initialized');
      return { success: false, error: 'Client not initialized' };
    }

    // Test connection by getting session
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error getting session:', error);
      return { success: false, error: error.message };
    }
    
    console.log('Supabase connection successful:', data);
    
    // Test database access
    const { data: userData, error: userError } = await supabase
      .from('user')
      .select('*')
      .limit(1);
    
    if (userError) {
      console.error('Error querying user table:', userError);
      return { success: false, error: userError.message };
    }
    
    console.log('Successfully queried user table:', userData);
    
    return { success: true, message: 'Connection and queries successful' };
  } catch (error) {
    console.error('Error testing Supabase connection:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get Supabase schema for user table
 */
export const getUserTableSchema = async () => {
  try {
    // Get table information
    const { data, error } = await supabase.rpc('get_table_definition', {
      target_table: 'user'
    });
    
    if (error) {
      console.error('Error getting schema:', error);
      return { success: false, error: error.message };
    }
    
    console.log('User table schema:', data);
    return { success: true, schema: data };
  } catch (error) {
    console.error('Error getting schema:', error);
    return { success: false, error: error.message };
  }
};

// Add this to window for easy testing in browser console
if (typeof window !== 'undefined') {
  window.testSupabase = {
    testConnection: testSupabaseConnection,
    getUserSchema: getUserTableSchema
  };
}

export default {
  testConnection: testSupabaseConnection,
  getUserSchema: getUserTableSchema
}; 
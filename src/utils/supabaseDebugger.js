import supabase from '../supabaseClient';
import testSupabase from '../services/testSupabase';

// Simple function to check RLS policies for the user table
const checkRlsPolicies = async () => {
  try {
    // First try to insert without authentication
    const testUser = {
      user_id: '00000000-0000-0000-0000-000000000000', // dummy ID, won't actually be inserted
      Full_name: 'Test User',
      email: 'test@example.com',
      birthdate: new Date().toISOString().split('T')[0],
      gender: 'male',
      creatad_at: new Date().toISOString(),
      last_login: new Date().toISOString()
    };

    const { error } = await supabase
      .from('user')
      .insert(testUser)
      .select();

    if (error) {
      console.log('RLS policy test result: Insert not allowed (expected if RLS is enabled)', error.message);
      return {
        success: false,
        message: 'RLS policies are preventing insert. This is expected if you have RLS enabled.',
        error: error.message
      };
    }

    // If no error, RLS might not be configured properly
    return {
      success: true,
      message: 'Warning: Insert successful without authentication. Your RLS policies might not be properly configured.'
    };
  } catch (e) {
    return {
      success: false,
      message: 'Error testing RLS policies',
      error: e.message
    };
  }
};

// Export all debug functions with a nicer interface
const supabaseDebugger = {
  testConnection: testSupabase.testConnection,
  getUserSchema: testSupabase.getUserSchema,
  checkRlsPolicies,
  
  // Expose raw API for more advanced debugging
  rawApi: {
    getSession: async () => await supabase.auth.getSession(),
    getTables: async () => {
      const { data, error } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public');
      return { data, error };
    },
    getTableColumns: async (tableName) => {
      const { data, error } = await supabase
        .from('information_schema.columns')
        .select('column_name, data_type, is_nullable')
        .eq('table_schema', 'public')
        .eq('table_name', tableName);
      return { data, error };
    }
  }
};

// Add to window when in browser
if (typeof window !== 'undefined') {
  window.supabaseDebugger = supabaseDebugger;
}

export default supabaseDebugger; 
import supabase from '../supabaseClient';

/**
 * Test Supabase connection
 */
export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    const { data, error } = await supabase
      .from('admin')
      .select('count')
      .limit(1);
    
    console.log('Supabase connection test result:', { data, error });
    
    if (error) {
      console.error('Supabase connection test error:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true, message: 'Supabase connection successful' };
  } catch (error) {
    console.error('Supabase connection test exception:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Authenticate admin user
 */
export const authenticateAdmin = async (email, password) => {
  try {
    console.log('Authenticating admin with email:', email);
    
    const { data, error } = await supabase
      .from('admin')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();
    
    console.log('Supabase query result:', { data, error });
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    if (data) {
      console.log('Admin found, updating last login timestamp');
      // Update last login timestamp
      const { error: updateError } = await supabase
        .from('admin')
        .update({ last_login: new Date().toISOString() })
        .eq('admin_id', data.admin_id);
      
      if (updateError) {
        console.error('Error updating last login:', updateError);
      } else {
        console.log('Last login timestamp updated successfully');
      }
        
      return { success: true, data };
    }
    
    console.log('No admin found with these credentials');
    return { success: false, error: 'Invalid credentials' };
  } catch (error) {
    console.error('Admin authentication error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Verify admin password for sensitive operations
 */
export const verifyAdminPassword = async (password) => {
  try {
    console.log('Verifying admin password');
    
    const { data, error } = await supabase
      .from('admin')
      .select('admin_id')
      .eq('password', password)
      .maybeSingle();
    
    if (error) {
      console.error('Error verifying admin password:', error);
      return { success: false, error: error.message };
    }
    
    if (data) {
      console.log('Admin password verified successfully');
      return { success: true };
    }
    
    console.log('Invalid admin password provided');
    return { success: false, error: 'Invalid admin password' };
  } catch (error) {
    console.error('Error in verifyAdminPassword:', error);
    return { success: false, error: error.message };
  }
}; 
import supabase from '../supabaseClient';

/**
 * Get user profile data from the database
 */
export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      throw error;
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Get user profile error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get coach profile data including certificate and id
 */
export const getCoachProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('coach')
      .select(`
        *,
        user:user_id (
          Full_name,
          email,
          birthdate,
          gender
        )
      `)
      .eq('user_id', userId)
      .single();
    
    if (error) {
      throw error;
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Get coach profile error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userId, userData) => {
  try {
    const { error } = await supabase
      .from('user')
      .update({
        Full_name: userData.name,
        birthdate: userData.dateOfBirth,
        gender: userData.gender
      })
      .eq('user_id', userId);
    
    if (error) {
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Update user profile error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update coach profile
 */
export const updateCoachProfile = async (coachId, coachData) => {
  try {
    const { error } = await supabase
      .from('coach')
      .update({
        certificate: coachData.certificateNumber,
        cin: coachData.coachId
      })
      .eq('coach_id', coachId);
    
    if (error) {
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Update coach profile error:', error);
    return { success: false, error: error.message };
  }
}; 
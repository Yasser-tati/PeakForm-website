import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../../../supabaseClient';
import AdminLayout from '../AdminLayout';
import { FaArrowLeft, FaCalendarAlt, FaUser, FaTag, FaLayerGroup, FaBullseye, FaFire, FaCalendarCheck, FaClock, FaEdit, FaTrash, FaSave, FaTimes, FaExclamationCircle, FaClipboardList, FaDumbbell, FaUtensils, FaAppleAlt, FaCalendarDay } from 'react-icons/fa';
import { verifyAdminPassword } from '../../../services/adminService';
import './plan-detail.css';

const PlanDetailPage = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [coach, setCoach] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [deleteError, setDeleteError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  // New states for schedule
  const [fitnessSchedule, setFitnessSchedule] = useState([]);
  const [nutritionSchedule, setNutritionSchedule] = useState([]);
  const [foodItems, setFoodItems] = useState({});
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [scheduleError, setScheduleError] = useState(null);

  useEffect(() => {
    fetchPlanDetails();
  }, [planId]);

  useEffect(() => {
    if (plan) {
      fetchSchedule();
    }
  }, [plan]);

  const fetchPlanDetails = async () => {
    try {
      setLoading(true);
      
      // Fetch plan details
      const { data: planData, error: planError } = await supabase
        .from('plan')
        .select('*')
        .eq('plan_id', planId)
        .single();
      
      if (planError) throw planError;
      
      console.log('Plan details:', planData);
      setPlan(planData);
      
      // Initialize form data with plan data
      setFormData({
        title: planData.title || '',
        description: planData.description || '',
        objective: planData.objective || '',
        type: planData.type || '',
        level: planData.level || '',
        price: planData.price || '',
        plan_duration: planData.plan_duration || '',
        status: planData.status || 'draft'
      });
      
      // If plan has coach_id, fetch coach details
      if (planData?.coach_id) {
        const { data: coachData, error: coachError } = await supabase
          .from('coach')
          .select(`
            coach_id,
            user:user_id (*)
          `)
          .eq('coach_id', planData.coach_id)
          .single();
        
        if (coachError) throw coachError;
        
        console.log('Coach details:', coachData);
        setCoach(coachData);
      }
    } catch (err) {
      console.error('Error fetching plan details:', err);
      setError('Failed to load plan details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSchedule = async () => {
    if (!plan || !plan.plan_id) return;
    
    setScheduleLoading(true);
    setScheduleError(null);
    
    try {
      // Get plan type and fetch appropriate schedule
      const planType = plan.type?.toLowerCase();
      
      if (planType?.includes('fitness') || planType === 'fitness & nutrition') {
        // Fetch fitness schedule
        const { data: fitnessData, error: fitnessError } = await supabase
          .from('fitness_schedule')
          .select('*')
          .eq('plan_id', plan.plan_id)
          .order('day', { ascending: true });
        
        if (fitnessError) throw fitnessError;
        
        console.log('Fitness schedule:', fitnessData);
        setFitnessSchedule(fitnessData || []);
      }
      
      if (planType?.includes('nutrition') || planType === 'fitness & nutrition') {
        // Fetch nutrition schedule
        const { data: nutritionData, error: nutritionError } = await supabase
          .from('nutrition_schedule')
          .select('*')
          .eq('plan_id', plan.plan_id)
          .order('day', { ascending: true });
        
        if (nutritionError) throw nutritionError;
        
        console.log('Nutrition schedule:', nutritionData);
        setNutritionSchedule(nutritionData || []);
        
        // If we have nutrition data, fetch food items
        if (nutritionData && nutritionData.length > 0) {
          // Extract unique food item IDs
          const foodItemIds = [...new Set(nutritionData.map(item => item.food_item_id))];
          
          // Fetch food items details
          const { data: foodItemsData, error: foodItemsError } = await supabase
            .from('food_items')
            .select('*')
            .in('id', foodItemIds);
          
          if (foodItemsError) throw foodItemsError;
          
          // Convert array to object with id as key for easier lookup
          const foodItemsMap = {};
          foodItemsData.forEach(item => {
            foodItemsMap[item.id] = item;
          });
          
          console.log('Food items:', foodItemsMap);
          setFoodItems(foodItemsMap);
        }
      }
    } catch (err) {
      console.error('Error fetching schedule:', err);
      setScheduleError('Failed to load schedule information.');
    } finally {
      setScheduleLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate('/admin/plans');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getCoachName = () => {
    if (!coach) return 'Unknown Coach';
    return coach.user?.Full_name || coach.user?.full_name || 'Unknown Coach';
  };

  const getDayName = (day) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[day - 1] || `Day ${day}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      // Reset form data if canceling edit
      setFormData({
        title: plan.title || '',
        description: plan.description || '',
        objective: plan.objective || '',
        type: plan.type || '',
        level: plan.level || '',
        price: plan.price || '',
        plan_duration: plan.plan_duration || '',
        status: plan.status || 'draft'
      });
    }
    setIsEditMode(!isEditMode);
    setUpdateError(null);
    setUpdateSuccess(false);
  };

  const saveChanges = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateError(null);
    setUpdateSuccess(false);

    try {
      // Update plan data in Supabase
      const { error } = await supabase
        .from('plan')
        .update({
          title: formData.title,
          description: formData.description,
          objective: formData.objective,
          type: formData.type,
          level: formData.level,
          price: formData.price ? parseFloat(formData.price) : null,
          plan_duration: formData.plan_duration,
          status: formData.status
        })
        .eq('plan_id', planId);

      if (error) throw error;

      // Update local plan state
      setPlan(prev => ({
        ...prev,
        title: formData.title,
        description: formData.description,
        objective: formData.objective,
        type: formData.type,
        level: formData.level,
        price: formData.price ? parseFloat(formData.price) : null,
        plan_duration: formData.plan_duration,
        status: formData.status
      }));

      setUpdateSuccess(true);
      // Exit edit mode after successful update
      setTimeout(() => {
        setIsEditMode(false);
        setUpdateSuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Error updating plan:', err);
      setUpdateError('Failed to update plan information. Please try again.');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDeletePlan = async () => {
    if (!adminPassword) {
      setDeleteError('Admin password is required');
      return;
    }

    setDeleteLoading(true);
    setDeleteError(null);

    try {
      // Verify admin password using the service
      const { success, error: verifyError } = await verifyAdminPassword(adminPassword);
      
      if (!success) {
        setDeleteError(verifyError || 'Invalid admin password');
        setDeleteLoading(false);
        return;
      }

      // Delete plan
      const { error: deleteError } = await supabase
        .from('plan')
        .delete()
        .eq('plan_id', planId);

      if (deleteError) throw deleteError;

      // Navigate back to plans list
      navigate('/admin/plans', { 
        state: { 
          notification: {
            type: 'success',
            message: 'Plan deleted successfully'
          }
        }
      });
    } catch (err) {
      console.error('Error deleting plan:', err);
      setDeleteError('Failed to delete plan. ' + (err.message || 'Unknown error'));
      setDeleteLoading(false);
    }
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
    setDeleteError(null);
    setAdminPassword('');
  };

  const renderSkeletonLoader = () => (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading plan data...</p>
    </div>
  );

  const renderFitnessSchedule = () => {
    if (fitnessSchedule.length === 0) {
      return (
        <div className="no-schedule-placeholder">
          <p>No fitness schedule available for this plan.</p>
        </div>
      );
    }

    // Group by day
    const scheduleByDay = fitnessSchedule.reduce((acc, exercise) => {
      if (!acc[exercise.day]) {
        acc[exercise.day] = [];
      }
      acc[exercise.day].push(exercise);
      return acc;
    }, {});

    return (
      <div className="schedule-container">
        {Object.keys(scheduleByDay).map(day => (
          <div key={`fitness-day-${day}`} className="schedule-day-card">
            <div className="day-header">
              <FaCalendarDay className="day-icon" />
              <h4>{getDayName(day)}</h4>
            </div>
            <div className="day-content">
              {scheduleByDay[day].map((exercise, index) => (
                <div key={`exercise-${index}`} className="schedule-item">
                  <div className="exercise-name">
                    <FaDumbbell className="exercise-icon" />
                    <span>{exercise.exercise}</span>
                  </div>
                  <div className="exercise-details">
                    <span>{exercise.number_of_sets} sets</span>
                    <span>×</span>
                    <span>{exercise.number_of_repetition}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderNutritionSchedule = () => {
    if (nutritionSchedule.length === 0) {
      return (
        <div className="no-schedule-placeholder">
          <p>No nutrition schedule available for this plan.</p>
        </div>
      );
    }

    // Group by day and meal type
    const scheduleByDay = nutritionSchedule.reduce((acc, meal) => {
      if (!acc[meal.day]) {
        acc[meal.day] = {};
      }
      if (!acc[meal.day][meal.meal_type]) {
        acc[meal.day][meal.meal_type] = [];
      }
      acc[meal.day][meal.meal_type].push(meal);
      return acc;
    }, {});

    return (
      <div className="schedule-container">
        {Object.keys(scheduleByDay).map(day => (
          <div key={`nutrition-day-${day}`} className="schedule-day-card">
            <div className="day-header">
              <FaCalendarDay className="day-icon" />
              <h4>{getDayName(day)}</h4>
            </div>
            <div className="day-content">
              {Object.keys(scheduleByDay[day]).map(mealType => (
                <div key={`meal-${mealType}`} className="meal-section">
                  <h5 className="meal-type">{mealType}</h5>
                  <div className="meal-items">
                    {scheduleByDay[day][mealType].map((meal, index) => {
                      const foodItem = foodItems[meal.food_item_id] || {};
                      return (
                        <div key={`food-${index}`} className="schedule-item">
                          <div className="food-name">
                            <FaAppleAlt className="food-icon" />
                            <span>{foodItem.name || 'Unknown Food'}</span>
                          </div>
                          <div className="food-details">
                            <span>{meal.quantity} {foodItem.unit}</span>
                            {foodItem.calories_per_unit && (
                              <span className="calories">
                                ({meal.quantity * foodItem.calories_per_unit} cal)
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <AdminLayout activeSection="plans">
        <div className="plan-detail-container">
          {renderSkeletonLoader()}
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout activeSection="plans">
        <div className="plan-detail-container">
          <div className="error-container">
            <div className="error-icon"><FaExclamationCircle /></div>
            <p className="error-message">{error}</p>
            <button onClick={handleGoBack} className="back-button">
              <FaArrowLeft /> Back to Plans
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!plan) {
    return (
      <AdminLayout activeSection="plans">
        <div className="plan-detail-container">
          <div className="not-found">
            <div className="not-found-icon"><FaExclamationCircle /></div>
            <h2>Plan Not Found</h2>
            <p>The plan you're looking for doesn't exist or has been removed.</p>
            <button onClick={handleGoBack} className="back-button">
              <FaArrowLeft /> Back to Plans
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activeSection="plans">
      <div className="plan-detail-container">
        <div className="plan-detail-header">
          <div className="header-left">
            <button onClick={handleGoBack} className="back-button">
              <FaArrowLeft /> Back to Plans
            </button>
            <h1>Plan Details</h1>
          </div>
          <div className="header-actions">
            {!isEditMode ? (
              <button onClick={toggleEditMode} className="edit-button">
                <FaEdit /> Edit Plan
              </button>
            ) : (
              <div className="edit-actions">
                <button onClick={toggleEditMode} className="cancel-button">
                  <FaTimes /> Cancel
                </button>
                <button 
                  onClick={saveChanges} 
                  className="save-button" 
                  disabled={updateLoading}
                >
                  {updateLoading ? 'Saving...' : <><FaSave /> Save Changes</>}
                </button>
              </div>
            )}
          </div>
        </div>

        {updateError && (
          <div className="update-error">
            <FaExclamationCircle /> {updateError}
          </div>
        )}

        {updateSuccess && (
          <div className="update-success">
            Plan information updated successfully!
          </div>
        )}

        <div className="plan-detail-content">
          <div className="plan-profile">
            <div className="plan-basic-info">
              {isEditMode ? (
                <div className="edit-name-container">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="edit-name"
                    placeholder="Plan Title"
                  />
                </div>
              ) : (
                <h2>{plan.title || 'Untitled Plan'}</h2>
              )}

              <div className="plan-badges">
                <span className={`plan-status ${plan.status === 'public' || plan.status === 'active' ? 'active' : 'inactive'}`}>
                  {isEditMode ? (
                    <select 
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="edit-select status-select"
                    >
                      <option value="draft">Draft</option>
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                  ) : (
                    plan.status || 'Draft'
                  )}
                </span>
                
                <span className="plan-badge type">
                  <FaLayerGroup />
                  {plan.type || 'General'}
                </span>
                
                <span className="plan-badge level">
                  <FaFire />
                  {plan.level || 'All Levels'}
                </span>

                <span className="plan-badge price">
                  <FaTag />
                  {plan.price ? `$${plan.price}` : 'Free'}
                </span>
              </div>
            </div>
          </div>

          <div className="plan-details-grid">
            <div className="detail-section basic-section">
              <h3><span className="section-icon"><FaBullseye /></span> Basic Information</h3>
              <div className="detail-items-container">
                <div className="detail-item">
                  <div className="label"><FaUser /> Coach</div>
                  <div className="value">{getCoachName()}</div>
                </div>
                
                <div className="detail-item">
                  <div className="label"><FaBullseye /> Objective</div>
                  <div className="value">
                    {isEditMode ? (
                      <input
                        type="text"
                        name="objective"
                        value={formData.objective}
                        onChange={handleInputChange}
                        className="edit-input"
                        placeholder="Objective"
                      />
                    ) : (
                      plan.objective || 'Not specified'
                    )}
                  </div>
                </div>
                
                <div className="detail-item">
                  <div className="label"><FaLayerGroup /> Type</div>
                  <div className="value">
                    {isEditMode ? (
                      <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="edit-input"
                        placeholder="Plan Type"
                      />
                    ) : (
                      plan.type || 'Not specified'
                    )}
                  </div>
                </div>
                
                <div className="detail-item">
                  <div className="label"><FaFire /> Level</div>
                  <div className="value">
                    {isEditMode ? (
                      <select
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        className="edit-select"
                      >
                        <option value="">Select Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="All Levels">All Levels</option>
                      </select>
                    ) : (
                      plan.level || 'Not specified'
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-section pricing-section">
              <h3><span className="section-icon"><FaTag /></span> Pricing & Duration</h3>
              <div className="detail-items-container">
                <div className="detail-item">
                  <div className="label"><FaTag /> Price</div>
                  <div className="value">
                    {isEditMode ? (
                      <div className="edit-input-with-unit">
                        <span className="input-prefix">$</span>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="edit-number"
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                        />
                      </div>
                    ) : (
                      plan.price ? `$${plan.price}` : 'Free'
                    )}
                  </div>
                </div>
                
                <div className="detail-item">
                  <div className="label"><FaCalendarAlt /> Duration</div>
                  <div className="value">
                    {isEditMode ? (
                      <input
                        type="text"
                        name="plan_duration"
                        value={formData.plan_duration}
                        onChange={handleInputChange}
                        className="edit-input"
                        placeholder="e.g. 8 weeks"
                      />
                    ) : (
                      plan.plan_duration || 'Not specified'
                    )}
                  </div>
                </div>
                
                <div className="detail-item">
                  <div className="label"><FaCalendarCheck /> Created</div>
                  <div className="value">{formatDate(plan.created_at)}</div>
                </div>
                
                <div className="detail-item">
                  <div className="label"><FaClock /> Last Updated</div>
                  <div className="value">{formatDate(plan.updated_at) || 'Never updated'}</div>
                </div>
              </div>
            </div>

            <div className="detail-section description-section">
              <h3><span className="section-icon"><FaClipboardList /></span>Description</h3>
              <div className="detail-items-container">
                <div className="detail-item full-width">
                  <div className="value description-value">
                    {isEditMode ? (
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="edit-textarea"
                        placeholder="Plan description"
                        rows="6"
                      />
                    ) : (
                      plan.description || 'No description available'
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Fitness Schedule Section */}
            {(plan.type?.toLowerCase().includes('fitness') || plan.type === 'fitness & nutrition') && (
              <div className="detail-section schedule-section fitness-schedule-section">
                <h3><span className="section-icon"><FaDumbbell /></span> Fitness Schedule</h3>
                <div className="detail-items-container">
                  {scheduleLoading ? (
                    <div className="schedule-loading">
                      <div className="mini-loader"></div>
                      <p>Loading fitness schedule...</p>
                    </div>
                  ) : scheduleError ? (
                    <div className="schedule-error">
                      <FaExclamationCircle /> {scheduleError}
                    </div>
                  ) : (
                    renderFitnessSchedule()
                  )}
                </div>
              </div>
            )}

            {/* Nutrition Schedule Section */}
            {(plan.type?.toLowerCase().includes('nutrition') || plan.type === 'fitness & nutrition') && (
              <div className="detail-section schedule-section nutrition-schedule-section">
                <h3><span className="section-icon"><FaUtensils /></span> Nutrition Schedule</h3>
                <div className="detail-items-container">
                  {scheduleLoading ? (
                    <div className="schedule-loading">
                      <div className="mini-loader"></div>
                      <p>Loading nutrition schedule...</p>
                    </div>
                  ) : scheduleError ? (
                    <div className="schedule-error">
                      <FaExclamationCircle /> {scheduleError}
                    </div>
                  ) : (
                    renderNutritionSchedule()
                  )}
                </div>
              </div>
            )}

            {!isEditMode && (
              <div className="delete-plan-section">
                <button onClick={toggleDeleteModal} className="delete-plan-button">
                  <FaTrash /> Delete Plan
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="delete-modal-overlay">
            <div className="delete-modal">
              <h3>Delete Plan</h3>
              <p>Are you sure you want to delete this plan? This action cannot be undone.</p>
              
              <div className="delete-warning">
                <FaExclamationCircle /> All data associated with this plan will be permanently removed.
              </div>
              
              <div className="password-verification">
                <label>Enter admin password to confirm:</label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Admin password"
                />
              </div>
              
              {deleteError && <div className="delete-error">{deleteError}</div>}
              
              <div className="delete-modal-actions">
                <button onClick={toggleDeleteModal} className="cancel-delete-button">
                  Cancel
                </button>
                <button
                  onClick={handleDeletePlan}
                  className="confirm-delete-button"
                  disabled={deleteLoading || !adminPassword}
                >
                  {deleteLoading ? 'Deleting...' : 'Delete Plan'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PlanDetailPage;

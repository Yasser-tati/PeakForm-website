import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../AdminLayout';
import supabase from '../../../supabaseClient';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaWeight, FaRulerVertical, 
  FaCalendarAlt, FaUser, FaVenusMars, FaClock, FaArrowLeft, FaEdit, 
  FaExclamationCircle, FaClipboardList, FaSave, FaTimes, FaTrash,
  FaIdCard, FaAddressCard, FaDumbbell, FaInfoCircle, FaCheckCircle,
  FaBirthdayCake, FaUserClock } from 'react-icons/fa';
import { verifyAdminPassword } from '../../../services/adminService';
import './client-detail.css';

const ClientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
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
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        setLoading(true);
        // Fetch client data from Supabase
        const { data, error } = await supabase
          .from('client')
          .select(`
            client_id,
            user:user_id (
              user_id,
              Full_name,
              email,
              birthdate,
              gender,
              phone_number,
              profile_image,
              address,
              weight,
              height,
              creatad_at
            )
          `)
          .eq('client_id', id)
          .single();
        
        if (error) {
          throw error;
        }
        
        setClient(data);
        // Initialize form data with client data
        setFormData({
          Full_name: data.user.Full_name || '',
          email: data.user.email || '',
          phone_number: data.user.phone_number || '',
          address: data.user.address || '',
          gender: data.user.gender || '',
          birthdate: data.user.birthdate || '',
          weight: data.user.weight || '',
          height: data.user.height || '',
        });
      } catch (err) {
        console.error('Error fetching client details:', err);
        setError('Failed to fetch client details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchClientDetails();
  }, [id]);

  const calculateAge = (birthdate) => {
    if (!birthdate) return 'Not available';
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return `${age} years`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
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
        Full_name: client.user.Full_name || '',
        email: client.user.email || '',
        phone_number: client.user.phone_number || '',
        address: client.user.address || '',
        gender: client.user.gender || '',
        birthdate: client.user.birthdate || '',
        weight: client.user.weight || '',
        height: client.user.height || '',
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
      // Update user data in Supabase
      const { error } = await supabase
        .from('user')
        .update({
          Full_name: formData.Full_name,
          email: formData.email,
          phone_number: formData.phone_number,
          address: formData.address,
          gender: formData.gender,
          birthdate: formData.birthdate,
          weight: formData.weight ? parseFloat(formData.weight) : null,
          height: formData.height ? parseFloat(formData.height) : null,
        })
        .eq('user_id', client.user.user_id);

      if (error) throw error;

      // Update local client state
      setClient(prev => ({
        ...prev,
        user: {
          ...prev.user,
          Full_name: formData.Full_name,
          email: formData.email,
          phone_number: formData.phone_number,
          address: formData.address,
          gender: formData.gender,
          birthdate: formData.birthdate,
          weight: formData.weight ? parseFloat(formData.weight) : null,
          height: formData.height ? parseFloat(formData.height) : null,
        }
      }));

      setUpdateSuccess(true);
      // Exit edit mode after successful update
      setTimeout(() => {
        setIsEditMode(false);
        setUpdateSuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Error updating client:', err);
      setUpdateError('Failed to update client information. Please try again.');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDeleteClient = async () => {
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

      // Delete client from client table first (foreign key)
      const { error: clientDeleteError } = await supabase
        .from('client')
        .delete()
        .eq('client_id', id);

      if (clientDeleteError) throw clientDeleteError;

      // Delete user from user table
      const { error: userDeleteError } = await supabase
        .from('user')
        .delete()
        .eq('user_id', client.user.user_id);

      if (userDeleteError) throw userDeleteError;

      // Navigate back to clients list
      navigate('/admin/clients', { 
        state: { 
          notification: {
            type: 'success',
            message: 'Client deleted successfully'
          }
        }
      });
    } catch (err) {
      console.error('Error deleting client:', err);
      setDeleteError('Failed to delete client. ' + (err.message || 'Unknown error'));
      setDeleteLoading(false);
    }
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
    setDeleteError(null);
    setAdminPassword('');
  };

  // Calculate BMI if weight and height are available
  const calculateBMI = (weight, height) => {
    if (!weight || !height) return null;
    const bmi = (weight / Math.pow(height / 100, 2)).toFixed(1);
    let category = '';
    
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi >= 18.5 && bmi < 25) category = 'Normal weight';
    else if (bmi >= 25 && bmi < 30) category = 'Overweight';
    else category = 'Obese';
    
    return { value: bmi, category };
  };

  if (loading) {
    return (
      <AdminLayout activeSection="clients">
        <div className="client-detail-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading client data...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout activeSection="clients">
        <div className="client-detail-container">
          <div className="error-container">
            <div className="error-icon"><FaExclamationCircle /></div>
            <p className="error-message">{error}</p>
            <button onClick={() => navigate('/admin/clients')} className="back-button">
              <FaArrowLeft /> Back to Clients
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!client) {
    return (
      <AdminLayout activeSection="clients">
        <div className="client-detail-container">
          <div className="not-found">
            <div className="not-found-icon"><FaUser /></div>
            <h2>Client not found</h2>
            <p>The client you are looking for doesn't exist or has been removed.</p>
            <button onClick={() => navigate('/admin/clients')} className="back-button">
              <FaArrowLeft /> Back to Clients
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Calculate BMI for the client
  const clientBMI = calculateBMI(
    isEditMode && formData.weight && formData.height
      ? parseFloat(formData.weight)
      : client.user.weight,
    isEditMode && formData.weight && formData.height
      ? parseFloat(formData.height)
      : client.user.height
  );

  return (
    <AdminLayout activeSection="clients">
      <div className="client-detail-container horizontal-layout">
        <div className="client-detail-header">
          <div className="header-left">
            <button onClick={() => navigate('/admin/clients')} className="back-button">
              <FaArrowLeft /> Back to Clients
            </button>
            <h1>Client Profile</h1>
          </div>
          <div className="header-actions">
            {isEditMode ? (
              <>
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
              </>
            ) : (
              <button onClick={toggleEditMode} className="edit-button">
                <FaEdit /> Edit Client
              </button>
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
            <FaCheckCircle /> Client information updated successfully!
          </div>
        )}

        <div className="client-detail-content">
          <div className="client-sidebar">
            <div className="client-profile-card">
            <div className="client-avatar">
              {client.user.profile_image ? (
                <img src={client.user.profile_image} alt={`${client.user.Full_name}'s avatar`} />
              ) : (
                <div className="avatar-placeholder">
                    {client.user.Full_name ? client.user.Full_name.charAt(0).toUpperCase() : <FaUser />}
            </div>
                )}
              </div>
            </div>

            <div className="client-tabs">
              <button 
                className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
                onClick={() => setActiveTab('personal')}
              >
                <FaIdCard /> Personal Information
              </button>
              <button 
                className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => setActiveTab('contact')}
              >
                <FaAddressCard /> Contact Details
              </button>
              <button 
                className={`tab-button ${activeTab === 'physical' ? 'active' : ''}`}
                onClick={() => setActiveTab('physical')}
              >
                <FaWeight /> Physical Metrics
              </button>
              <button 
                className={`tab-button ${activeTab === 'workouts' ? 'active' : ''}`}
                onClick={() => setActiveTab('workouts')}
              >
                <FaDumbbell /> Workout Plans
              </button>
            </div>

            <button onClick={toggleDeleteModal} className="delete-client-button">
              <FaTrash /> Delete Client
            </button>
          </div>

          <div className="client-tab-content">
            {activeTab === 'personal' && (
              <div className="tab-panel personal-info-panel">
                <h3><FaUser className="section-icon" /> Personal Information</h3>
                <div className="info-grid">
                <div className="detail-item">
                    <span className="label"><FaUser className="item-icon" /> Full Name</span>
                  <span className="value">
                    {isEditMode ? (
                      <input
                          type="text"
                          name="Full_name"
                          value={formData.Full_name}
                        onChange={handleInputChange}
                        className="edit-input"
                          placeholder="Client Name"
                      />
                    ) : (
                        client.user.Full_name || 'Unnamed Client'
                    )}
                  </span>
                </div>
                <div className="detail-item">
                    <span className="label"><FaVenusMars className="item-icon" /> Gender</span>
                  <span className="value">
                    {isEditMode ? (
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="edit-input edit-select"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      client.user.gender || 'Not specified'
                    )}
                  </span>
                </div>
                <div className="detail-item">
                    <span className="label"><FaBirthdayCake className="item-icon" /> Birthdate</span>
                  <span className="value">
                    {isEditMode ? (
                      <input
                        type="date"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    ) : (
                        client.user.birthdate ? formatDate(client.user.birthdate) : 'Not specified'
                    )}
                  </span>
                </div>
                <div className="detail-item">
                    <span className="label"><FaCalendarAlt className="item-icon" /> Age</span>
                    <span className="value">
                      {client.user.birthdate ? calculateAge(client.user.birthdate) : 'Not available'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label"><FaInfoCircle className="item-icon" /> Client ID</span>
                    <span className="value">{client.client_id}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label"><FaUserClock className="item-icon" /> Client Since</span>
                    <span className="value">
                      {client.user.creatad_at ? formatDate(client.user.creatad_at) : 'Unknown'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="tab-panel contact-info-panel">
                <h3><FaEnvelope className="section-icon" /> Contact Information</h3>
                <div className="info-grid">
                  <div className="detail-item">
                    <span className="label"><FaEnvelope className="item-icon" /> Email Address</span>
                    <span className="value">
                      {isEditMode ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="edit-input"
                          placeholder="Email"
                        />
                      ) : (
                        client.user.email || 'No email provided'
                      )}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label"><FaPhone className="item-icon" /> Phone Number</span>
                    <span className="value">
                      {isEditMode ? (
                        <input
                          type="tel"
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={handleInputChange}
                          className="edit-input"
                          placeholder="Phone Number"
                        />
                      ) : (
                        client.user.phone_number || 'No phone number provided'
                      )}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label"><FaMapMarkerAlt className="item-icon" /> Address</span>
                    <span className="value">
                      {isEditMode ? (
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="edit-input edit-textarea"
                          placeholder="Address"
                        />
                      ) : (
                        client.user.address || 'No address provided'
                      )}
                    </span>
                </div>
              </div>
            </div>
            )}

            {activeTab === 'physical' && (
              <div className="tab-panel physical-info-panel">
              <h3><FaWeight className="section-icon" /> Physical Information</h3>
                <div className="info-grid">
                <div className="detail-item">
                    <span className="label"><FaWeight className="item-icon" /> Weight</span>
                  <span className="value">
                    {isEditMode ? (
                      <div className="edit-input-with-unit">
                        <input
                          type="number"
                          name="weight"
                          value={formData.weight}
                          onChange={handleInputChange}
                          className="edit-input edit-number"
                          placeholder="Weight"
                          step="0.1"
                        />
                        <span className="input-unit">kg</span>
                      </div>
                    ) : (
                      client.user.weight ? `${client.user.weight} kg` : 'Not specified'
                    )}
                  </span>
                </div>
                <div className="detail-item">
                    <span className="label"><FaRulerVertical className="item-icon" /> Height</span>
                  <span className="value">
                    {isEditMode ? (
                      <div className="edit-input-with-unit">
                        <input
                          type="number"
                          name="height"
                          value={formData.height}
                          onChange={handleInputChange}
                          className="edit-input edit-number"
                          placeholder="Height"
                          step="0.1"
                        />
                        <span className="input-unit">cm</span>
                      </div>
                    ) : (
                      client.user.height ? `${client.user.height} cm` : 'Not specified'
                    )}
                  </span>
                </div>
                  {clientBMI && (
                  <div className="detail-item">
                      <span className="label">BMI (Body Mass Index)</span>
                    <span className="value">
                        {clientBMI.value} - {clientBMI.category}
                    </span>
                  </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'workouts' && (
              <div className="tab-panel workouts-panel">
              <h3><FaClipboardList className="section-icon" /> Workouts & Plans</h3>
              <div className="no-data-placeholder">
                  <p>No workout plans assigned to this client yet.</p>
                  <button className="add-plan-button">
                    <FaDumbbell /> Add Workout Plan
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {showDeleteModal && (
          <div className="delete-modal-overlay">
            <div className="delete-modal">
              <h3>Delete Client</h3>
              <p>Are you sure you want to delete this client? This action cannot be undone.</p>
              <p className="delete-warning">This will permanently remove the client from the system.</p>
              
              <div className="password-verification">
                <label htmlFor="admin-password">Enter your admin password to confirm:</label>
                <input
                  type="password"
                  id="admin-password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Admin password"
                />
              </div>
              
              {deleteError && <p className="delete-error">{deleteError}</p>}
              
              <div className="delete-modal-actions">
                <button onClick={toggleDeleteModal} className="cancel-delete-button">
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteClient} 
                  className="confirm-delete-button"
                  disabled={deleteLoading}
                >
                  {deleteLoading ? 'Deleting...' : 'Delete Client'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ClientDetail;
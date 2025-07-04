import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AdminLayout from '../AdminLayout';
import supabase from '../../../supabaseClient';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaWeight, FaRulerVertical, 
  FaCalendarAlt, FaUser, FaVenusMars, FaClock, FaArrowLeft, FaEdit, 
  FaExclamationCircle, FaSave, FaTimes, FaTrash,
  FaIdCard, FaCertificate, FaStar, FaUserTie, FaEye, FaTimes as FaClose,
  FaAddressCard, FaDumbbell, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';
import { verifyAdminPassword } from '../../../services/adminService';
import './coach-detail.css';

const CoachDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
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
  const [debugInfo, setDebugInfo] = useState('');
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);
  const [currentDocument, setCurrentDocument] = useState({ type: '', url: '', title: '' });
  const [activeTab, setActiveTab] = useState('personal');
  const [showValidateModal, setShowValidateModal] = useState(false);

  // Log for debugging purposes
  console.log('CoachDetail component rendering with id:', id);
  console.log('Current location:', location);

  useEffect(() => {
    const fetchCoachDetails = async () => {
      console.log('Starting to fetch coach details for id:', id);
      try {
        setLoading(true);
        let debug = [];
        
        debug.push(`Fetching coach with ID: ${id}`);
        console.log(`Fetching coach with ID: ${id}`);
        
        // Log the supabase instance 
        console.log('Supabase client:', supabase);
        
        // Fetch coach data from Supabase - removed rating field from query
        const { data, error } = await supabase
          .from('coach')
          .select(`
            coach_id,
            user_id,
            cin,
            certificate,
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
          .eq('coach_id', id)
          .single();
        
        console.log('Supabase response:', { data, error });
        
        if (error) {
          debug.push(`Error fetching coach: ${error.message}`);
          console.error(`Error fetching coach:`, error);
          throw error;
        }
        
        debug.push(`Coach data received: ${JSON.stringify(data, null, 2)}`);
        console.log('Coach data received:', data);
        
        // Add a default rating since it's not in the database
        const coachWithDefaultRating = {
          ...data,
          rating: 0 // Default rating value
        };
        
        setCoach(coachWithDefaultRating);
        // Initialize form data with coach data
        setFormData({
          Full_name: data.user?.Full_name || '',
          email: data.user?.email || '',
          phone_number: data.user?.phone_number || '',
          address: data.user?.address || '',
          gender: data.user?.gender || '',
          birthdate: data.user?.birthdate || '',
          weight: data.user?.weight || '',
          height: data.user?.height || '',
          cin: data.cin || '',
          certificate: data.certificate || '',
          rating: 0 // Default rating
        });
        
        debug.push('Form data initialized successfully');
        setDebugInfo(debug.join('\n'));
      } catch (err) {
        console.error('Error fetching coach details:', err);
        setError(`Failed to fetch coach details: ${err.message}`);
        setDebugInfo(`Error stack: ${err.stack || 'No stack trace'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCoachDetails();
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
        Full_name: coach.user?.Full_name || '',
        email: coach.user?.email || '',
        phone_number: coach.user?.phone_number || '',
        address: coach.user?.address || '',
        gender: coach.user?.gender || '',
        birthdate: coach.user?.birthdate || '',
        weight: coach.user?.weight || '',
        height: coach.user?.height || '',
        cin: coach.cin || '',
        certificate: coach.certificate || '',
        rating: coach.rating || 0
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
      const { error: userError } = await supabase
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
        .eq('user_id', coach.user.user_id);

      if (userError) throw userError;

      // Update coach specific data - removed rating field
      const { error: coachError } = await supabase
        .from('coach')
        .update({
          cin: formData.cin,
          certificate: formData.certificate
        })
        .eq('coach_id', coach.coach_id);

      if (coachError) throw coachError;

      // Update local coach state
      setCoach(prev => ({
        ...prev,
        cin: formData.cin,
        certificate: formData.certificate,
        rating: formData.rating || 0, // Keep local rating state
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
      console.error('Error updating coach:', err);
      setUpdateError('Failed to update coach information. Please try again.');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDeleteCoach = async () => {
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

      // Delete coach from coach table first (foreign key)
      const { error: coachDeleteError } = await supabase
        .from('coach')
        .delete()
        .eq('coach_id', id);

      if (coachDeleteError) throw coachDeleteError;

      // Delete user from user table
      const { error: userDeleteError } = await supabase
        .from('user')
        .delete()
        .eq('user_id', coach.user.user_id);

      if (userDeleteError) throw userDeleteError;

      // Navigate back to coaches list
      navigate('/admin/coaches', { 
        state: { 
          notification: {
            type: 'success',
            message: 'Coach deleted successfully'
          }
        }
      });
    } catch (err) {
      console.error('Error deleting coach:', err);
      setDeleteError('Failed to delete coach. ' + (err.message || 'Unknown error'));
      setDeleteLoading(false);
    }
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
    setDeleteError(null);
    setAdminPassword('');
  };

  // Helper function to render star rating
  const renderStarRating = (rating) => {
    // Default to 0 if rating is not available
    const ratingValue = parseFloat(rating || 0);
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= ratingValue) {
        stars.push(<FaStar key={i} className="full-star" />);
      } else {
        stars.push(<FaStar key={i} className="empty-star" />);
      }
    }
    
    return (
      <div className="star-rating">
        {stars} <span className="rating-value">({ratingValue.toFixed(1)})</span>
      </div>
    );
  };

  const handleViewDocument = (type, url, title) => {
    setCurrentDocument({ type, url, title });
    setShowDocumentViewer(true);
  };

  const closeDocumentViewer = () => {
    setShowDocumentViewer(false);
    setCurrentDocument({ type: '', url: '', title: '' });
  };

  const truncateUrl = (url, maxLength = 30) => {
    if (!url) return 'Not specified';
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
  };

  const openValidateModal = () => setShowValidateModal(true);
  const closeValidateModal = () => setShowValidateModal(false);

  if (loading) {
    return (
      <AdminLayout activeSection="coaches">
        <div className="coach-detail-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading coach data...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout activeSection="coaches">
        <div className="coach-detail-container">
          <div className="error-container">
            <div className="error-icon"><FaExclamationCircle /></div>
            <p className="error-message">{error}</p>
            <button onClick={() => navigate('/admin/coaches')} className="back-button">
              <FaArrowLeft /> Back to Coaches
            </button>
            {debugInfo && (
              <div style={{ marginTop: '20px', textAlign: 'left', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', maxHeight: '300px', overflow: 'auto', fontSize: '12px', fontFamily: 'monospace' }}>
                <h4>Debug Information:</h4>
                <pre>{debugInfo}</pre>
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!coach) {
    return (
      <AdminLayout activeSection="coaches">
        <div className="coach-detail-container">
          <div className="not-found">
            <div className="not-found-icon"><FaUserTie /></div>
            <h2>Coach not found</h2>
            <p>The coach you are looking for doesn't exist or has been removed. Coach ID: {id}</p>
            <button onClick={() => navigate('/admin/coaches')} className="back-button">
              <FaArrowLeft /> Back to Coaches
            </button>
            {debugInfo && (
              <div style={{ marginTop: '20px', textAlign: 'left', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', maxHeight: '300px', overflow: 'auto', fontSize: '12px', fontFamily: 'monospace' }}>
                <h4>Debug Information:</h4>
                <pre>{debugInfo}</pre>
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activeSection="coaches">
      <div className="coach-detail-container horizontal-layout">
        <div className="coach-detail-header">
          <div className="header-left">
            <button onClick={() => navigate('/admin/coaches')} className="back-button">
              <FaArrowLeft /> Back to Coaches
            </button>
            <h1>Coach Profile</h1>
          </div>
          <div className="header-actions">
            {isEditMode ? (
              <>
                <button onClick={toggleEditMode} className="cancel-button">
                  <FaTimes /> Cancel
                </button>
                <button onClick={saveChanges} className="save-button" disabled={updateLoading}>
                  {updateLoading ? 'Saving...' : <><FaSave /> Save Changes</>}
                </button>
              </>
            ) : (
              <button onClick={toggleEditMode} className="edit-button">
                <FaEdit /> Edit Coach
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
            <FaCheckCircle /> Coach information updated successfully!
          </div>
        )}

        <div className="client-detail-content">
          <div className="client-sidebar">
            <div className="client-profile-card">
              <div className="client-avatar">
                {coach.user.profile_image ? (
                  <img src={coach.user.profile_image} alt={`${coach.user.Full_name}'s avatar`} />
                ) : (
                  <div className="avatar-placeholder">
                    {coach.user.Full_name ? coach.user.Full_name.charAt(0).toUpperCase() : <FaUserTie />}
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
                className={`tab-button ${activeTab === 'certification' ? 'active' : ''}`}
                onClick={() => setActiveTab('certification')}
              >
                <FaCertificate /> Certification Details
              </button>
            </div>
            <button onClick={openValidateModal} className="validate-client-button">
              <FaCheckCircle /> Valide Coach
            </button>
            <button onClick={toggleDeleteModal} className="delete-client-button">
              <FaTrash /> Delete Coach
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
                          placeholder="Coach Name"
                        />
                      ) : (
                        coach.user.Full_name || 'Unnamed Coach'
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
                        coach.user.gender || 'Not specified'
                      )}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label"><FaCalendarAlt className="item-icon" /> Birthdate</span>
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
                        coach.user.birthdate ? new Date(coach.user.birthdate).toLocaleDateString() : 'Not specified'
                      )}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label"><FaCalendarAlt className="item-icon" /> Age</span>
                    <span className="value">
                      {coach.user.birthdate ? calculateAge(coach.user.birthdate) : 'Not available'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label"><FaInfoCircle className="item-icon" /> Coach ID</span>
                    <span className="value">{coach.coach_id}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label"><FaClock className="item-icon" /> Coach Since</span>
                    <span className="value">
                      {coach.user.creatad_at ? new Date(coach.user.creatad_at).toLocaleDateString() : 'Unknown'}
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
                        coach.user.email || 'No email provided'
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
                        coach.user.phone_number || 'No phone number provided'
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
                        coach.user.address || 'No address provided'
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
                        coach.user.weight ? `${coach.user.weight} kg` : 'Not specified'
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
                        coach.user.height ? `${coach.user.height} cm` : 'Not specified'
                      )}
                    </span>
                  </div>
                  {(coach.user.weight && coach.user.height) || (isEditMode && formData.weight && formData.height) ? (
                    <div className="detail-item">
                      <span className="label">BMI (Body Mass Index)</span>
                      <span className="value">
                        {isEditMode && formData.weight && formData.height
                          ? (parseFloat(formData.weight) / Math.pow(parseFloat(formData.height) / 100, 2)).toFixed(1)
                          : (coach.user.weight / Math.pow(coach.user.height / 100, 2)).toFixed(1)}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            )}

            {activeTab === 'certification' && (
              <div className="tab-panel certification-panel">
                <h3><FaCertificate className="section-icon" /> Certification Information</h3>
                <div className="info-grid">
                  <div className="detail-item">
                    <span className="label"><FaIdCard className="item-icon" /> CIN</span>
                    <span className="value">
                      {isEditMode ? (
                        <input
                          type="text"
                          name="cin"
                          value={formData.cin}
                          onChange={handleInputChange}
                          className="edit-input"
                          placeholder="CIN Number"
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span className="blurred-id" title={coach.cin}>{truncateUrl(coach.cin)}</span>
                          {coach.cin && (
                            <button 
                              className="view-button"
                              onClick={() => handleViewDocument('cin', coach.cin, 'CIN Document')}
                            >
                              <FaEye /> View
                            </button>
                          )}
                        </div>
                      )}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label"><FaCertificate className="item-icon" /> Certificate</span>
                    <span className="value">
                      {isEditMode ? (
                        <input
                          type="text"
                          name="certificate"
                          value={formData.certificate}
                          onChange={handleInputChange}
                          className="edit-input"
                          placeholder="Certificate"
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span className="blurred-id" title={coach.certificate}>{truncateUrl(coach.certificate)}</span>
                          {coach.certificate && (
                            <button 
                              className="view-button"
                              onClick={() => handleViewDocument('certificate', coach.certificate, 'Certificate Document')}
                            >
                              <FaEye /> View
                            </button>
                          )}
                        </div>
                      )}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label"><FaStar className="item-icon" /> Rating</span>
                    <span className="value">
                      {isEditMode ? (
                        <div className="edit-input-with-unit">
                          <input
                            type="number"
                            name="rating"
                            value={formData.rating}
                            onChange={handleInputChange}
                            className="edit-input edit-number"
                            placeholder="Rating"
                            step="0.1"
                            min="0"
                            max="5"
                          />
                          <span className="input-unit">/ 5</span>
                        </div>
                      ) : (
                        renderStarRating(coach.rating)
                      )}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {showDeleteModal && (
          <div className="delete-modal-overlay">
            <div className="delete-modal">
              <h3>Delete Coach</h3>
              <p>Are you sure you want to delete this coach? This action cannot be undone.</p>
              <p className="delete-warning">This will permanently remove the coach from the system.</p>
              
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
                  onClick={handleDeleteCoach} 
                  className="confirm-delete-button"
                  disabled={deleteLoading}
                >
                  {deleteLoading ? 'Deleting...' : 'Delete Coach'}
                </button>
              </div>
            </div>
          </div>
        )}

        {showDocumentViewer && (
          <div className="document-viewer-overlay">
            <div className="document-viewer">
              <div className="document-viewer-header">
                <h3>{currentDocument.title}</h3>
                <button onClick={closeDocumentViewer} className="close-viewer-button">
                  <FaClose />
                </button>
              </div>
              <div className="document-viewer-content">
                {currentDocument.url && (
                  currentDocument.url.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                    <img src={currentDocument.url} alt={currentDocument.title} />
                  ) : (
                    <iframe src={currentDocument.url} title={currentDocument.title} />
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {showValidateModal && (
          <div className="delete-modal-overlay">
            <div className="delete-modal">
              <h3 className="validate-modal-title">Coach Validé</h3>
              <p className="validate-success-message">Le coach a été validé avec succès !</p>
              <div className="delete-modal-actions">
                <button onClick={closeValidateModal} className="cancel-delete-button">
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default CoachDetail; 
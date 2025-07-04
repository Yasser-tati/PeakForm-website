import React, { useState, useEffect } from 'react';
import supabase from '../../../supabaseClient';
import AdminLayout from '../AdminLayout';
import { FaClipboardList, FaSearch, FaDumbbell, FaFire, FaTag, FaCalendarAlt, FaExclamationCircle, FaBullseye, FaLayerGroup, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './plan.css';

const PlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [coaches, setCoaches] = useState({});

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    if (plans.length > 0) {
      fetchCoaches();
    }
  }, [plans]);

  const fetchCoaches = async () => {
    try {
      console.log('Fetching coaches...');
      
      // First get all coach_ids from the plans
      const coachIds = plans.map(plan => plan.coach_id).filter(Boolean);
      console.log('Coach IDs from plans:', coachIds);
      
      if (coachIds.length === 0) {
        console.log('No coach IDs found in plans');
        return;
      }
      
      // Now fetch only the coaches that are referenced in plans
      const { data, error } = await supabase
        .from('coach')
        .select(`
          coach_id,
          user:user_id (*)
        `)
        .in('coach_id', coachIds);
      
      if (error) throw error;
      
      console.log('Coach data received:', data);
      
      const coachMap = {};
      data.forEach(coach => {
        // Handle both Full_name and full_name variations
        const coachName = coach.user?.Full_name || coach.user?.full_name || 'Unknown Coach';
        coachMap[coach.coach_id] = coachName;
        console.log(`Coach ${coach.coach_id}:`, coach.user, 'Mapped name:', coachName);
      });
      
      console.log('Final coach map:', coachMap);
      setCoaches(coachMap);
    } catch (err) {
      console.error('Error fetching coaches:', err);
    }
  };

  const fetchPlans = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('plan')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      console.log('Plans data received:', data);
      setPlans(data);
    } catch (err) {
      console.error('Error fetching plans:', err);
      setError('Failed to load plans. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = 
      plan.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.objective?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    return matchesSearch;
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getCoachName = (coachId) => {
    console.log('Getting coach name for ID:', coachId, 'Available coaches:', coaches);
    return coaches[coachId] || 'Unknown Coach';
  };

  // Calculate stats for dashboard
  const planStats = {
    total: plans.length,
    active: plans.filter(plan => plan.status === 'public').length,
  };

  const renderSkeletonLoaders = () => {
    return Array(4).fill(0).map((_, index) => (
      <div key={index} className="plan-card skeleton-card">
        <div className="plan-image skeleton" style={{ borderRadius: '0' }}></div>
        <div className="plan-info">
          <div className="skeleton skeleton-title"></div>
          <div className="plan-details">
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
          </div>
          <div className="plan-actions">
            <div className="skeleton skeleton-button"></div>
          </div>
        </div>
      </div>
    ));
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
  };

  if (loading) {
    return (
      <AdminLayout activeSection="plans">
        <div className="plans-container">
          <div className="plans-header">
            <h1>Plans</h1>
            <div className="search-container skeleton"></div>
          </div>
          <div className="plans-stats">
            <div className="stat-card skeleton-card">
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-stat"></div>
            </div>
            <div className="stat-card skeleton-card">
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-stat"></div>
            </div>
          </div>
          <div className="plans-grid">
            {renderSkeletonLoaders()}
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout activeSection="plans">
        <div className="error-message">
          <FaExclamationCircle /> {error}
          <button onClick={fetchPlans} className="retry-btn">Try Again</button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activeSection="plans">
      <div className="plans-container">
        <div className="plans-header">
          <h1>Plans</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search plans by title, description or objective..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
        </div>
        
        <div className="plans-stats">
          <div className="stat-card">
            <h3>Total Plans</h3>
            <p>{planStats.total}</p>
            <div className="stat-icon">
              <FaClipboardList />
            </div>
          </div>
          <div className="stat-card">
            <h3>Public Plans</h3>
            <p>{planStats.active}</p>
            <div className="stat-icon">
              <FaDumbbell />
            </div>
          </div>
        </div>
        
        <div className="plans-grid">
          {filteredPlans.length > 0 ? (
            filteredPlans.map(plan => (
              <div key={plan.plan_id} className="plan-card">
                <div className="plan-image" style={{ borderRadius: '0', overflow: 'hidden' }}>
                  {plan.image_url ? (
                    <img 
                      src={plan.image_url} 
                      alt={plan.title || 'Plan'} 
                      onError={handleImageError}
                      style={{ borderRadius: '0', width: '100%', height: '100%' }}
                    />
                  ) : (
                    <div className="image-placeholder" style={{ borderRadius: '0' }}>
                      <FaClipboardList style={{ borderRadius: '0', color: '#6a1b9a' }} />
                    </div>
                  )}
                </div>
                <div className="plan-info">
                  <h3>{plan.title || 'Untitled Plan'}</h3>
                  <div className="plan-details">
                    <p className="plan-description">{plan.description || 'No description available'}</p>
                    
                    <p><FaUser /> Coach: {getCoachName(plan.coach_id)} 
                      <span style={{ fontSize: '0.8em', color: 'gray' }}>
                        (ID: {plan.coach_id})
                      </span>
                    </p>
                    <p><FaBullseye /> Objective: {plan.objective || 'Not specified'}</p>
                    <p><FaLayerGroup /> Type: {plan.type || 'Not specified'}</p>
                    <p><FaTag /> Price: {plan.price ? `$${plan.price}` : 'Free'}</p>
                    <p><FaFire /> Level: {plan.level || 'Not specified'}</p>
                    <p><FaCalendarAlt /> Duration: {plan.plan_duration || 'Not specified'}</p>
                    <p>Status: <span className={`plan-status ${plan.status === 'public' || plan.status === 'active' ? 'active' : 'inactive'}`}>
                      {plan.status || 'Not specified'}
                    </span></p>
                    <p>Created: {formatDate(plan.created_at)}</p>
                  </div>
                  <div className="plan-actions">
                    <Link to={`/admin/plans/${plan.plan_id}`} className="view-details-btn" style={{ backgroundColor: '#6a1b9a' }}>View Details</Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-plans">
              <FaSearch size={32} />
              <p>No plans found matching your search criteria.</p>
              <button onClick={() => setSearchTerm('')} className="clear-search-btn">Clear Search</button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default PlansPage;

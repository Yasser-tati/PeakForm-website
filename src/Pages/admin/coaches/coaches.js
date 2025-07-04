import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../../supabaseClient';
import AdminLayout from '../AdminLayout';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaCertificate, FaCalendarAlt, FaSearch, FaUserTie, FaStar, FaExclamationCircle, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import './coaches.css';

const CoachesPage = () => {
  const navigate = useNavigate();
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter] = useState('all');
  const [debugInfo, setDebugInfo] = useState('');
  const [sortField, setSortField] = useState('Full_name');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    fetchCoaches();
  }, []);

  const fetchCoaches = async () => {
    try {
      setLoading(true);
      setError(null);
      setDebugInfo('');
      
      let debugMessages = [];
      debugMessages.push('Starting coach fetch...');
      
      // Step 1: Get all coaches first - using a simpler query
      const { data: coachData, error: coachError } = await supabase
        .from('coach')
        .select('*');
      
      if (coachError) {
        debugMessages.push(`Coach query error: ${coachError.message}`);
        throw new Error(`Failed to query coaches: ${coachError.message}`);
      }
      
      debugMessages.push(`Found ${coachData?.length || 0} coaches in database`);
      
      if (!coachData || coachData.length === 0) {
        debugMessages.push('No coaches found in the database');
        setCoaches([]);
        setDebugInfo(debugMessages.join('\n'));
        return;
      }
      
      // Debug coach data
      if (coachData && coachData.length > 0) {
        coachData.forEach((coach, index) => {
          debugMessages.push(`Coach #${index + 1}: ID=${coach.coach_id}`);
          // Explicitly log the full coach object to see all fields
          debugMessages.push(`Full coach data #${index + 1}: ${JSON.stringify(coach)}`);
        });
      }
      
      // Step 2: Get user data for all coaches
      const userIds = coachData.map(coach => coach.user_id);
      debugMessages.push(`Found ${userIds.length} user IDs: ${userIds.join(', ')}`);
      
      const { data: userData, error: userError } = await supabase
        .from('user')
        .select('*')
        .in('user_id', userIds);
      
      if (userError) {
        debugMessages.push(`User query error: ${userError.message}`);
        throw new Error(`Failed to query users: ${userError.message}`);
      }
      
      debugMessages.push(`Found ${userData?.length || 0} users in database`);
      
      // Step 3: Map user data to coaches
      const formattedCoaches = coachData.map(coach => {
        const user = userData.find(user => user.user_id === coach.user_id) || {};
        
        // Add a default rating since it doesn't exist in the database
        return {
          ...coach,
          user,
          rating: 0 // Default rating
        };
      });
      
      debugMessages.push(`Final formatted coaches: ${formattedCoaches.length}`);
      if (formattedCoaches.length > 0) {
        debugMessages.push(`Sample coach data: ${JSON.stringify(formattedCoaches[0], null, 2)}`);
      }
      
      setCoaches(formattedCoaches);
      setDebugInfo(debugMessages.join('\n'));
    } catch (err) {
      console.error('Error fetching coaches:', err);
      setError(err.message || 'Failed to load coaches. Please try again later.');
      setDebugInfo(err.stack || 'No stack trace available');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredCoaches = coaches.filter(coach => {
    const matchesSearch = 
      coach.user?.Full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coach.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    return matchesSearch;
  }).sort((a, b) => {
    let valueA, valueB;
    
    if (sortField === 'age') {
      valueA = calculateAge(a.user?.birthdate) || 0;
      valueB = calculateAge(b.user?.birthdate) || 0;
    } else {
      valueA = a.user?.[sortField] || '';
      valueB = b.user?.[sortField] || '';
    }
    
    if (typeof valueA === 'string') {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  const calculateAge = (birthdate) => {
    if (!birthdate) return 'N/A';
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Calculate stats for dashboard (removing rating-related stats)
  const coachStats = {
    total: coaches.length,
    active: coaches.length,
    male: coaches.filter(coach => coach.user?.gender?.toLowerCase() === 'male').length,
    female: coaches.filter(coach => coach.user?.gender?.toLowerCase() === 'female').length
  };

  const renderSkeletonLoader = () => {
    return (
      <div className="coaches-table-container skeleton-table">
        <table className="coaches-table">
          <thead>
            <tr>
              <th className="skeleton skeleton-header"></th>
              <th className="skeleton skeleton-header"></th>
              <th className="skeleton skeleton-header"></th>
              <th className="skeleton skeleton-header"></th>
              <th className="skeleton skeleton-header"></th>
              <th className="skeleton skeleton-header"></th>
              <th className="skeleton skeleton-header"></th>
            </tr>
          </thead>
          <tbody>
            {Array(5).fill(0).map((_, index) => (
              <tr key={index}>
                <td className="skeleton skeleton-cell"></td>
                <td className="skeleton skeleton-cell"></td>
                <td className="skeleton skeleton-cell"></td>
                <td className="skeleton skeleton-cell"></td>
                <td className="skeleton skeleton-cell"></td>
                <td className="skeleton skeleton-cell"></td>
                <td className="skeleton skeleton-cell"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/40x40?text=NA';
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <FaSortAmountUp size={12} /> : <FaSortAmountDown size={12} />;
  };

  if (loading) {
    return (
      <AdminLayout activeSection="coaches">
        <div className="coaches-container">
          <div className="coaches-header">
            <h1>Coaches</h1>
            <div className="search-container skeleton"></div>
          </div>
          <div className="coaches-stats">
            <div className="stat-card skeleton-card">
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-stat"></div>
            </div>
            <div className="stat-card skeleton-card">
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-stat"></div>
            </div>
          </div>
          {renderSkeletonLoader()}
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout activeSection="coaches">
        <div className="error-message">
          <FaExclamationCircle /> {error}
          <button onClick={fetchCoaches} className="retry-btn">Try Again</button>
          {debugInfo && (
            <div style={{ marginTop: '20px', textAlign: 'left', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', maxHeight: '300px', overflow: 'auto', fontSize: '12px', fontFamily: 'monospace' }}>
              <h4>Debug Information:</h4>
              <pre>{debugInfo}</pre>
            </div>
          )}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activeSection="coaches">
      <div className="coaches-container">
        <div className="coaches-header">
          <h1>Coaches</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search coaches by name or email..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
        </div>
        
        <div className="coaches-stats">
          <div className="stat-card">
            <h3>Total Coaches</h3>
            <p>{coachStats.total}</p>
            <div className="stat-icon">
              <FaUserTie />
            </div>
          </div>
          <div className="stat-card">
            <h3>Active Coaches</h3>
            <p>{coachStats.active}</p>
            <div className="stat-icon">
              <FaUserTie />
            </div>
          </div>
        </div>
        
        <div className="coaches-table-container">
          {filteredCoaches.length > 0 ? (
            <table className="coaches-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('profile_image')}>Photo</th>
                  <th onClick={() => handleSort('Full_name')}>
                    Name {renderSortIcon('Full_name')}
                  </th>
                  <th onClick={() => handleSort('email')}>
                    Email {renderSortIcon('email')}
                  </th>
                  <th onClick={() => handleSort('phone_number')}>
                    Phone {renderSortIcon('phone_number')}
                  </th>
                  <th onClick={() => handleSort('age')}>
                    Age {renderSortIcon('age')}
                  </th>
                  <th onClick={() => handleSort('gender')}>
                    Gender {renderSortIcon('gender')}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoaches.map(coach => (
                  <tr key={coach.coach_id}>
                    <td className="coach-photo">
                      {coach.user?.profile_image ? (
                        <img 
                          src={coach.user.profile_image} 
                          alt={coach.user.Full_name || 'Coach'} 
                          onError={handleImageError}
                          className="coach-avatar-small"
                        />
                      ) : (
                        <div className="avatar-placeholder-small">
                          <FaUser />
                        </div>
                      )}
                    </td>
                    <td><span className="coach-name">{coach.user?.Full_name || 'Unnamed Coach'}</span></td>
                    <td><span className="coach-email">{coach.user?.email || 'No email'}</span></td>
                    <td><span className="coach-phone">{coach.user?.phone_number || 'No phone'}</span></td>
                    <td>
                      <span className="coach-age">
                        {calculateAge(coach.user?.birthdate)}
                        <span className="coach-birthdate-text">
                          {coach.user?.birthdate ? ` (${formatDate(coach.user?.birthdate)})` : ''}
                        </span>
                      </span>
                    </td>
                    <td>
                      {coach.user?.gender && (
                        <span className={`coach-gender-badge gender-${coach.user?.gender.toLowerCase()}`}>
                          {coach.user?.gender}
                        </span>
                      )}
                    </td>
                    <td>
                      <Link to={`/admin/coach-detail/${coach.coach_id}`} className="view-details-btn">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-coaches">
              <FaSearch size={32} />
              <p>No coaches found matching your search criteria.</p>
              <button onClick={() => setSearchTerm('')} className="clear-search-btn">Clear Search</button>
            </div>
          )}
        </div>
        
        {coaches.length === 0 && !loading && !error ? (
          <div className="no-coaches" style={{ gridColumn: '1 / -1' }}>
            <FaExclamationCircle size={32} />
            <p>No coaches found in the database.</p>
            <div style={{ marginTop: '20px', textAlign: 'left', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', maxHeight: '300px', overflow: 'auto', fontSize: '12px', fontFamily: 'monospace' }}>
              <h4>Debug Information:</h4>
              <pre>{debugInfo}</pre>
            </div>
          </div>
        ) : null}
      </div>
    </AdminLayout>
  );
};

export default CoachesPage;

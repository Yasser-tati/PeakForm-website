import React, { useState, useEffect } from 'react';
import supabase from '../../../supabaseClient';
import AdminLayout from '../AdminLayout';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaWeight, FaRulerVertical, FaCalendarAlt, FaSearch, FaUserFriends, FaUserCheck, FaExclamationCircle, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import './clients.css';

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortField, setSortField] = useState('Full_name');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      
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
        `);
      
      if (error) {
        throw error;
      }
      
      const formattedClients = data.map(client => ({
        ...client,
        user: client.user || {}
      }));
      
      setClients(formattedClients);
    } catch (err) {
      console.error('Error fetching clients:', err);
      setError('Failed to load clients. Please try again later.');
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

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.user.Full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    // Add more filters if needed
    return matchesSearch;
  }).sort((a, b) => {
    let valueA, valueB;
    
    if (sortField === 'age') {
      valueA = calculateAge(a.user.birthdate) || 0;
      valueB = calculateAge(b.user.birthdate) || 0;
    } else {
      valueA = a.user[sortField] || '';
      valueB = b.user[sortField] || '';
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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

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

  // Calculate stats for dashboard
  const clientStats = {
    total: clients.length,
    active: clients.length, // Assuming all clients are active for now
    male: clients.filter(client => client.user.gender === 'Male').length,
    female: clients.filter(client => client.user.gender === 'Female').length,
  };

  const renderSkeletonLoader = () => {
    return (
      <div className="clients-table-container skeleton-table">
        <table className="clients-table">
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
      <AdminLayout activeSection="clients">
        <div className="clients-container">
          <div className="clients-header">
            <h1>Clients</h1>
            <div className="search-container skeleton"></div>
          </div>
          <div className="clients-stats">
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
      <AdminLayout activeSection="clients">
        <div className="error-message">
          <FaExclamationCircle /> {error}
          <button onClick={fetchClients} className="retry-btn">Try Again</button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activeSection="clients">
      <div className="clients-container">
        <div className="clients-header">
          <h1>Clients</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search clients by name or email..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
        </div>
        
        <div className="clients-stats">
          <div className="stat-card">
            <h3>Total Clients</h3>
            <p>{clientStats.total}</p>
            <div className="stat-icon">
              <FaUserFriends />
            </div>
          </div>
          <div className="stat-card">
            <h3>Active Clients</h3>
            <p>{clientStats.active}</p>
            <div className="stat-icon">
              <FaUserCheck />
            </div>
          </div>
        </div>
        
        <div className="clients-table-container">
          {filteredClients.length > 0 ? (
            <table className="clients-table">
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
                {filteredClients.map(client => (
                  <tr key={client.client_id}>
                    <td className="client-photo">
                      {client.user.profile_image ? (
                        <img 
                          src={client.user.profile_image} 
                          alt={client.user.Full_name || 'Client'} 
                          onError={handleImageError}
                          className="client-avatar-small"
                        />
                      ) : (
                        <div className="avatar-placeholder-small">
                          <FaUser />
                        </div>
                      )}
                    </td>
                    <td><span className="client-name">{client.user.Full_name || 'Unnamed Client'}</span></td>
                    <td><span className="client-email">{client.user.email || 'No email'}</span></td>
                    <td><span className="client-phone">{client.user.phone_number || 'No phone'}</span></td>
                    <td>
                      <span className="client-age">
                        {calculateAge(client.user.birthdate)}
                        <span className="client-birthdate-text">
                          {client.user.birthdate ? ` (${formatDate(client.user.birthdate)})` : ''}
                        </span>
                      </span>
                    </td>
                    <td>
                      {client.user.gender && (
                        <span className={`client-gender-badge gender-${client.user.gender.toLowerCase()}`}>
                          {client.user.gender}
                        </span>
                      )}
                    </td>
                    <td>
                      <a href={`/admin/client-details/${client.client_id}`} className="view-details-btn">View Details</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-clients">
              <FaSearch size={32} />
              <p>No clients found matching your search criteria.</p>
              <button onClick={() => setSearchTerm('')} className="clear-search-btn">Clear Search</button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ClientsPage;

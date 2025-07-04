import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateAdmin, testSupabaseConnection } from '../../services/adminService';
import './admin.css';
import logoImage from './logo-Photoroom.png';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Test Supabase connection on component mount
    const testConnection = async () => {
      try {
        const result = await testSupabaseConnection();
        console.log('Connection test result:', result);
        setConnectionStatus(result);
      } catch (err) {
        console.error('Connection test error:', err);
        setConnectionStatus({ success: false, error: err.message });
      }
    };

    testConnection();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('Attempting to authenticate with:', credentials.email);
      const { success, data, error } = await authenticateAdmin(credentials.email, credentials.password);
      console.log('Authentication result:', { success, data, error });
      
      if (success) {
        // Store admin data in localStorage
        localStorage.setItem('adminData', JSON.stringify(data));
        console.log('Admin data stored in localStorage, redirecting to dashboard');
        navigate('/admin/dashboard');
      } else {
        console.log('Authentication failed:', error);
        setError(error || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="no-style-container">
      <div className="no-style-box">
        <div className="no-style-header">
          <img src={logoImage} alt="Logo" className="admin-logo" />
          <h1>Admin Portal</h1>
          <p className="no-style-subtitle">Please enter your credentials to continue</p>
        </div>
        
        {connectionStatus && !connectionStatus.success && (
          <div className="no-style-error">
            <span className="no-style-error-icon">⚠️</span>
            Database connection error: {connectionStatus.error}
          </div>
        )}
        
        {error && (
          <div className="no-style-error">
            <span className="no-style-error-icon">⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="no-style-form">
          <div className="no-style-form-group">
            <label htmlFor="email">Email Address</label>
            <div className="no-style-input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="no-style-form-group">
            <label htmlFor="password">Password</label>
            <div className="no-style-input-wrapper">
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="no-style-button" 
            disabled={isLoading || (connectionStatus && !connectionStatus.success)}
          >
            {isLoading ? (
              <span className="no-style-button-content">
                <span className="no-style-spinner"></span>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

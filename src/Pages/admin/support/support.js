import React, { useState } from 'react';
import AdminLayout from '../AdminLayout';
import { FaHeadset, FaSearch, FaExclamationCircle, FaCheckCircle, FaClock, FaEnvelope, FaUser, FaCalendarAlt } from 'react-icons/fa';
import './support.css';

// Mock data for demonstration
const mockTickets = [
  {
    id: 1,
    subject: "Can't access my workout plan",
    description: "I've been trying to access my workout plan for the past 2 days but keep getting an error message. The app says 'Access Denied'.",
    status: "open",
    user_email: "user1@example.com",
    created_at: "2024-03-15T10:30:00"
  },
  {
    id: 2,
    subject: "Payment issue with subscription",
    description: "My subscription payment was declined but I'm still being charged. Need help resolving this issue.",
    status: "in_progress",
    user_email: "user2@example.com",
    created_at: "2024-03-14T15:45:00"
  },
  {
    id: 3,
    subject: "Coach not responding to messages",
    description: "My assigned coach hasn't responded to my messages in over a week. Need assistance in contacting them.",
    status: "open",
    user_email: "user3@example.com",
    created_at: "2024-03-13T09:15:00"
  },
  {
    id: 4,
    subject: "App crashing on startup",
    description: "The app keeps crashing immediately after opening. I've tried reinstalling but the issue persists.",
    status: "in_progress",
    user_email: "user4@example.com",
    created_at: "2024-03-12T14:20:00"
  },
  {
    id: 5,
    subject: "Need help with meal plan",
    description: "I'm having trouble understanding the meal plan section. The portions seem unclear.",
    status: "closed",
    user_email: "user5@example.com",
    created_at: "2024-03-11T11:30:00"
  },
  {
    id: 6,
    subject: "Account deletion request",
    description: "I would like to delete my account and all associated data. Please guide me through the process.",
    status: "open",
    user_email: "user6@example.com",
    created_at: "2024-03-10T16:45:00"
  }
];

const SupportPage = () => {
  const [tickets] = useState(mockTickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    closed: tickets.filter(t => t.status === 'closed').length,
    inProgress: tickets.filter(t => t.status === 'in_progress').length
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return <FaExclamationCircle className="status-icon open" />;
      case 'in_progress':
        return <FaClock className="status-icon in-progress" />;
      case 'closed':
        return <FaCheckCircle className="status-icon closed" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'open':
        return 'status-open';
      case 'in_progress':
        return 'status-in-progress';
      case 'closed':
        return 'status-closed';
      default:
        return '';
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user_email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || ticket.status === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <AdminLayout activeSection="support">
      <div className="support-container">
        <div className="support-header">
          <h1>Support Tickets</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search tickets by subject, description or email..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
        </div>
        
        <div className="support-stats">
          <div className="stat-card">
            <h3>Total Tickets</h3>
            <p>{stats.total}</p>
            <div className="stat-icon">
              <FaHeadset />
            </div>
          </div>
          <div className="stat-card">
            <h3>Open Tickets</h3>
            <p>{stats.open}</p>
            <div className="stat-icon">
              <FaExclamationCircle />
            </div>
          </div>
          <div className="stat-card">
            <h3>In Progress</h3>
            <p>{stats.inProgress}</p>
            <div className="stat-icon">
              <FaClock />
            </div>
          </div>
          <div className="stat-card">
            <h3>Closed Tickets</h3>
            <p>{stats.closed}</p>
            <div className="stat-icon">
              <FaCheckCircle />
            </div>
          </div>
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${activeFilter === 'open' ? 'active' : ''}`}
            onClick={() => handleFilterChange('open')}
          >
            Open
          </button>
          <button
            className={`filter-btn ${activeFilter === 'in_progress' ? 'active' : ''}`}
            onClick={() => handleFilterChange('in_progress')}
          >
            In Progress
          </button>
          <button
            className={`filter-btn ${activeFilter === 'closed' ? 'active' : ''}`}
            onClick={() => handleFilterChange('closed')}
          >
            Closed
          </button>
        </div>
        
        <div className="tickets-grid">
          {filteredTickets.map((ticket) => (
            <div key={ticket.id} className={`ticket-card ${getStatusClass(ticket.status)}`}>
              <div className="ticket-header">
                <h3>{ticket.subject}</h3>
                {getStatusIcon(ticket.status)}
              </div>
              <p className="ticket-description">{ticket.description}</p>
              <div className="ticket-footer">
                <div className="ticket-info">
                  <span><FaUser /> {ticket.user_email}</span>
                  <span><FaCalendarAlt /> {new Date(ticket.created_at).toLocaleDateString()}</span>
                </div>
                <button className="view-ticket-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default SupportPage;

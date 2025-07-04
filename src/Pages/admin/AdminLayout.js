import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaUserTie, FaClipboardList, FaShoppingCart, FaHeadset, FaHome, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import './AdminLayout.css';

const AdminLayout = ({ children, activeSection }) => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = React.useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  React.useEffect(() => {
    const storedAdminData = localStorage.getItem('adminData');
    if (!storedAdminData) {
      navigate('/peakform-admin');
      return;
    }
    setAdminData(JSON.parse(storedAdminData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminData');
    navigate('/peakform-admin');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaHome />, path: '/admin/dashboard' },
    { id: 'clients', label: 'Clients', icon: <FaUsers />, path: '/admin/clients' },
    { id: 'coaches', label: 'Coaches', icon: <FaUserTie />, path: '/admin/coaches' },
    { id: 'plans', label: 'Plans', icon: <FaClipboardList />, path: '/admin/plans' },
    { id: 'shop', label: 'Shop', icon: <FaShoppingCart />, path: '/admin/shop' },
    { id: 'support', label: 'Support', icon: <FaHeadset />, path: '/admin/support' },
  ];

  if (!adminData) return null;

  return (
    <div className="admin-layout">
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar} />

      <div className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.path)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
          <button className="nav-item logout-btn" onClick={handleLogout}>
            <span className="nav-icon"><FaSignOutAlt /></span>
            <span className="nav-label">Logout</span>
          </button>
        </nav>
      </div>

      <div className="admin-main">
        <header className="admin-header">
          <h1>{menuItems.find(item => item.id === activeSection)?.label || 'Admin Dashboard'}</h1>
          <div className="admin-info">
            <span>Welcome, {adminData.full_name}</span>
          </div>
        </header>
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 
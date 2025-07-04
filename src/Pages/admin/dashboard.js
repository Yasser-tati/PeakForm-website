import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaUserTie, FaClipboardList, FaShoppingCart, FaChartLine, FaCalendarAlt, FaMoneyBillWave, FaEllipsisH, FaComments, FaBell } from 'react-icons/fa';
import supabase from '../../supabaseClient';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import './dashboard.css';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const navigate = useNavigate();
  // Stats state
  const [stats, setStats] = useState({
    totalUsers: '...',
    totalClients: '...',
    totalCoaches: '...',
    totalPlans: '...',
    totalProducts: '...',
    revenue: '...',
    activeChats: '...',
    notifications: '...',
  });
  
  // Recent users state
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentCoaches, setRecentCoaches] = useState([]);
  
  // Loading states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chart data state
  const [salesData, setSalesData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Monthly Sales',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: 'rgba(93, 45, 209, 0.5)',
      borderColor: '#5D2DD1',
      borderWidth: 2,
      tension: 0.4
    }]
  });
  
  const [planTypeData, setPlanTypeData] = useState({
    labels: ['Fitness', 'Nutrition', 'Fitness & Nutrition'],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: [
        'rgba(93, 45, 209, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(255, 159, 64, 0.8)'
      ],
      borderColor: [
        '#5D2DD1',
        '#4BC0C0',
        '#FF9F40'
      ],
      borderWidth: 1
    }]
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch all stats in parallel
        const [
          usersResult, 
          clientsResult,
          coachesResult, 
          plansResult, 
          productsResult, 
          clientPlansResult,
          recentUsersResult,
          recentCoachesResult,
          planTypesResult
        ] = await Promise.all([
          // Count total users
          supabase.from('users').select('count'),
          
          // Count total clients
          supabase.from('client').select('count'),
          
          // Count total coaches
          supabase.from('coach').select('count'),
          
          // Count total plans
          supabase.from('plan').select('count'),
          
          // Count total products
          supabase.from('product').select('count'),
          
          // Get client plans for revenue calculation
          supabase.from('client_plan')
            .select('plan_id, plan:plan_id(price)')
            .order('purchase_date', { ascending: false }),
            
          // Get recent users (limit to 5)
          supabase.from('users')
            .select('users_id, Full_name, email, created_at')
            .order('created_at', { ascending: false })
            .limit(5),
            
          // Get recent coaches (limit to 5)
          supabase.from('coach')
            .select(`
              coach_id,
              created_at,
              user:user_id (
                Full_name,
                email
              )
            `)
            .order('created_at', { ascending: false })
            .limit(5),
            
          // Get plan types for chart
          supabase.from('plan')
            .select('type')
        ]);
        
        // Calculate total revenue
        let totalRevenue = 1575.23;
        if (clientPlansResult.data) {
          totalRevenue = clientPlansResult.data.reduce((sum, clientPlan) => {
            const planPrice = clientPlan.plan?.price || 1575.23;
            return sum + Number(planPrice);
          }, 575.23);
        }
        
        // Process plan types for doughnut chart
        const planTypes = {
          fitness: 0,
          nutrition: 0,
          'fitness & nutrition': 0
        };
        
        if (planTypesResult.data) {
          planTypesResult.data.forEach(plan => {
            const type = plan.type?.toLowerCase() || 'other';
            if (planTypes.hasOwnProperty(type)) {
              planTypes[type]++;
            }
          });
        }
        
        // Generate random monthly sales data for demo
        const monthlySales = Array(12).fill(0).map(() => Math.floor(Math.random() * 5000) + 1000);
        
        // Update stats state
        setStats({
          totalUsers: (clientsResult.data?.[0]?.count || 0) + (coachesResult.data?.[0]?.count || 0),
          totalClients: clientsResult.data?.[0]?.count || 0,
          totalCoaches: coachesResult.data?.[0]?.count || 0,
          totalPlans: plansResult.data?.[0]?.count || 0,
          totalProducts: productsResult.data?.[0]?.count || 0,
          revenue: totalRevenue.toFixed(2),
          activeChats: '...',
          notifications: '...',
        });
        
        // Update recent users
        setRecentUsers(recentUsersResult.data || []);
        
        // Update recent coaches
        setRecentCoaches(recentCoachesResult.data || []);
        
        // Update chart data
        setSalesData(prev => ({
          ...prev,
          datasets: [{
            ...prev.datasets[0],
            data: monthlySales
          }]
        }));
        
        setPlanTypeData(prev => ({
          ...prev,
          datasets: [{
            ...prev.datasets[0],
            data: [
              planTypes.fitness,
              planTypes.nutrition,
              planTypes['fitness & nutrition']
            ]
          }]
        }));
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'mad',
    }).format(amount);
  };

  // Chart options
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Revenue',
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Plan Distribution',
        font: {
          size: 16
        }
      },
    },
    cutout: '65%'
  };

  // Add navigation handlers
  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <AdminLayout activeSection="dashboard">
      {error && <div className="admin-dashboard-error-message">{error}</div>}
      
      <div className="admin-dashboard-welcome">
        <h2>Welcome to your Admin Dashboard</h2>
        <p>Overview of your business performance and key metrics</p>
      </div>
      
      {/* Stats Cards */}
      <div className="admin-dashboard-stats">
        <div className="admin-dashboard-stat-card" >
          <div className="admin-dashboard-stat-icon users">
            <FaUsers />
          </div>
          <div className="admin-dashboard-stat-content">
            <h3>Total Users</h3>
            <p>{loading ? 'Loading...' : stats.totalUsers}</p>
          </div>
        </div>
        
        <div className="admin-dashboard-stat-card" onClick={() => handleCardClick('/admin/clients')}>
          <div className="admin-dashboard-stat-icon clients">
            <FaUsers />
          </div>
          <div className="admin-dashboard-stat-content">
            <h3>Total Clients</h3>
            <p>{loading ? 'Loading...' : stats.totalClients}</p>
          </div>
        </div>
        
        <div className="admin-dashboard-stat-card" onClick={() => handleCardClick('/admin/coaches')}>
          <div className="admin-dashboard-stat-icon coaches">
            <FaUserTie />
          </div>
          <div className="admin-dashboard-stat-content">
            <h3>Total Coaches</h3>
            <p>{loading ? 'Loading...' : stats.totalCoaches}</p>
          </div>
        </div>
        
        <div className="admin-dashboard-stat-card" onClick={() => handleCardClick('/admin/plans')}>
          <div className="admin-dashboard-stat-icon plans">
            <FaClipboardList />
          </div>
          <div className="admin-dashboard-stat-content">
            <h3>Total Plans</h3>
            <p>{loading ? 'Loading...' : stats.totalPlans}</p>
          </div>
        </div>
        
        <div className="admin-dashboard-stat-card" onClick={() => handleCardClick('/admin/shop')}>
          <div className="admin-dashboard-stat-icon products">
            <FaShoppingCart />
          </div>
          <div className="admin-dashboard-stat-content">
            <h3>Products</h3>
            <p>{loading ? 'Loading...' : stats.totalProducts}</p>
          </div>
        </div>
        
        <div className="admin-dashboard-stat-card">
          <div className="admin-dashboard-stat-icon revenue">
            <FaMoneyBillWave />
          </div>
          <div className="admin-dashboard-stat-content">
            <h3>Total Revenue</h3>
            <p>{loading ? 'Loading...' : formatCurrency(stats.revenue)}</p>
          </div>
        </div>

        <div className="admin-dashboard-stat-card">
          <div className="admin-dashboard-stat-icon chats">
            <FaComments />
          </div>
          <div className="admin-dashboard-stat-content">
            <h3>Active Chats</h3>
            <p>5</p>
          </div>
        </div>

        <div className="admin-dashboard-stat-card">
          <div className="admin-dashboard-stat-icon notifications">
            <FaBell />
          </div>
          <div className="admin-dashboard-stat-content">
            <h3>Notifications</h3>
            <p>10</p>
          </div>
        </div>
      </div>
      
      {/* Charts Row */}
      <div className="admin-dashboard-charts">
        <div className="admin-dashboard-chart-container sales-chart">
          <Line options={lineOptions} data={salesData} />
        </div>
        
        <div className="admin-dashboard-chart-container plan-chart">
          <Doughnut options={doughnutOptions} data={planTypeData} />
        </div>
      </div>
      
      {/* Recent Users and Coaches */}
      <div className="admin-dashboard-recent">
        <div className="admin-dashboard-recent-widget">
          <div className="admin-dashboard-widget-header">
            <h3><FaUsers /> Recent Users</h3>
            <button className="admin-dashboard-view-all-btn">View All</button>
          </div>
          
          <div className="admin-dashboard-widget-content">
            {loading ? (
              <div className="admin-dashboard-loading-placeholder">Loading recent users...</div>
            ) : recentUsers.length === 0 ? (
              <div className="admin-dashboard-empty-message">No users found</div>
            ) : (
              <div className="admin-dashboard-user-list">
                {recentUsers.map((user, index) => (
                  <div key={index} className="admin-dashboard-user-item">
                    <div className="admin-dashboard-user-avatar">
                      {user.Full_name ? user.Full_name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div className="admin-dashboard-user-info">
                      <div className="admin-dashboard-user-name">{user.Full_name || 'Unknown User'}</div>
                      <div className="admin-dashboard-user-email">{user.email || 'No email'}</div>
                    </div>
                    <div className="admin-dashboard-user-date">
                      <span>{formatDate(user.created_at)}</span>
                    </div>
                    <button className="admin-dashboard-user-action">
                      <FaEllipsisH />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="admin-dashboard-recent-widget">
          <div className="admin-dashboard-widget-header">
            <h3><FaUserTie /> Recent Coaches</h3>
            <button className="admin-dashboard-view-all-btn">View All</button>
          </div>
          
          <div className="admin-dashboard-widget-content">
            {loading ? (
              <div className="admin-dashboard-loading-placeholder">Loading recent coaches...</div>
            ) : recentCoaches.length === 0 ? (
              <div className="admin-dashboard-empty-message">No coaches found</div>
            ) : (
              <div className="admin-dashboard-user-list">
                {recentCoaches.map((coach, index) => (
                  <div key={index} className="admin-dashboard-user-item">
                    <div className="admin-dashboard-user-avatar coach-avatar">
                      {coach.user?.Full_name ? coach.user.Full_name.charAt(0).toUpperCase() : 'C'}
                    </div>
                    <div className="admin-dashboard-user-info">
                      <div className="admin-dashboard-user-name">{coach.user?.Full_name || 'Unknown Coach'}</div>
                      <div className="admin-dashboard-user-email">{coach.user?.email || 'No email'}</div>
                    </div>
                    <div className="admin-dashboard-user-date">
                      <span>{formatDate(coach.created_at)}</span>
                    </div>
                    <button className="admin-dashboard-user-action">
                      <FaEllipsisH />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

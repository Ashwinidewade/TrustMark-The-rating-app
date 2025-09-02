import React, { useState, useEffect } from 'react';
import UserList from '../../users/UserList/UserList';
import StoreList from '../../stores/StoreList/StoreList';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    // Example: Fetch stats from API
    const fetchStats = async () => {
      try {
        // Simulate API call
        const data = {
          totalUsers: 100,
          totalStores: 50,
          totalRatings: 200,
        };
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="tabs">
        <button onClick={() => setActiveTab('dashboard')}>Dashboard</button>
        <button onClick={() => setActiveTab('users')}>Users</button>
        <button onClick={() => setActiveTab('stores')}>Stores</button>
      </div>

      {activeTab === 'dashboard' && (
        <div className="dashboard-stats">
          <p>Total Users: {stats.totalUsers}</p>
          <p>Total Stores: {stats.totalStores}</p>
          <p>Total Ratings: {stats.totalRatings}</p>
        </div>
      )}

      {activeTab === 'users' && <UserList />}
      {activeTab === 'stores' && <StoreList />}
    </div>
  );
};

export default AdminDashboard;

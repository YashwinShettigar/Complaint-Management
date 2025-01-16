import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../HomePage.css';
import loginImage from '../../images/dashboard1.jpg';

const HomePage = () => {
  const [stats, setStats] = useState({
    totalComplaints: 0,
    pendingComplaints: 0,
    resolvedComplaints: 0,
    rejectedComplaints: 0,
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await axios.get('http://localhost:3001/complaint-stats');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div
      className="home-page"
      style={{
        backgroundImage: `url(${loginImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">Admin</div>
        <div className="sidebar-nav">
          <ul>
            <li>
              <Link to="/home1" className="sidebar-link">Dashboard</Link>
            </li>
            <li>
              <Link to="/complaints" className="sidebar-link">Manage</Link>
            </li>
          </ul>
        </div>
        <Link to="/login" className="logout-button">Logout</Link>
      </div>

      {/* Header */}
      <div className="header">Dashboard</div>

      {/* Main Content */}
      <div className="main-content">
        <div className="dashboard-grid" style={{gap:'60px'}}>
          <div className="dashboard-box" style={{padding:'30px'}}>
            <h3>Total Complaints</h3>
            <p className="dashboard-stat">{stats.totalComplaints}</p>
          </div>
          <div className="dashboard-box" style={{padding:'30px'}}>
            <h3>Pending Complaints</h3>
            <p className="dashboard-stat">{stats.pendingComplaints}</p>
          </div>
          <div className="dashboard-box" style={{padding:'30px'}}>
            <h3>Resolved Complaints</h3>
            <p className="dashboard-stat">{stats.resolvedComplaints}</p>
          </div>
          <div className="dashboard-box" style={{padding:'30px'}}>
            <h3>Rejected Complaints</h3>
            <p className="dashboard-stat">{stats.rejectedComplaints}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

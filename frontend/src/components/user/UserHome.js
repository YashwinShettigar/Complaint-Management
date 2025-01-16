import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import loginImage from '../../images/dashboard1.jpg';

const UserHome = () => {
  const [stats, setStats] = useState({
    totalComplaints: 0,
    pendingComplaints: 0,
    resolvedComplaints: 0,
    rejectedComplaints: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:3001/complaint-stats');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching complaint stats:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="user-home"
    style={{
      backgroundImage: `url(${loginImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          User
        </div>
        <div className="sidebar-nav">
          <ul>
            <li>
              <Link to="/home" className="sidebar-link">Dashboard</Link>
            </li>
            <li>
              <Link to="/file-complaint" className="sidebar-link">File a Complaint</Link>
            </li>
            <li>
              <Link to="/complaint" className="sidebar-link">View Complaints</Link>
            </li>
          </ul>
        </div>
        <Link to='/login' className="logout-button">Logout</Link>
      </div>

      {/* Header */}
      <div className="header">Municipality Management System</div>

      {/* Main Content */}
      <div className="main-contents" style={{marginTop:'100px'}}>
        <div className="dashboard-grid">
          <div className="dashboard-box" style={{padding:'30px'}}>
            <h3>Complaints Filed</h3>
            <div className="dashboard-stat">{stats.totalComplaints}</div>
          </div>
          <div className="dashboard-box" style={{padding:'30px'}}>
            <h3>Pending Complaints</h3>
            <div className="dashboard-stat">{stats.pendingComplaints}</div>
          </div>
          <div className="dashboard-box" style={{padding:'30px'}}>
            <h3>Resolved Complaints</h3>
            <div className="dashboard-stat">{stats.resolvedComplaints}</div>
          </div>
          <div className="dashboard-box" style={{padding:'30px'}}>
            <h3>Rejected Complaints</h3>
            <div className="dashboard-stat">{stats.rejectedComplaints}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;

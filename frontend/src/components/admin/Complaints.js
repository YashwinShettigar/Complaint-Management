import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../HomePage.css';
import axios from 'axios';
import { io } from 'socket.io-client';
import loginImage from '../../images/dashboard1.jpg';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Fetch complaints from the server
    const fetchComplaints = async () => {
      try {
        const res = await axios.get('http://localhost:3001/complaints');
        setComplaints(res.data);
      } catch (err) {
        console.error('Error fetching complaints:', err);
      }
    };

    fetchComplaints();

    // Set up WebSocket connection
    const socket = io('http://localhost:3001'); // Connect to the server

    // Listen for updates to complaints
    socket.on('complaint-updated', (updatedComplaint) => {
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === updatedComplaint._id
            ? updatedComplaint
            : complaint
        )
      );
    });

    // Clean up the socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.patch(`http://localhost:3001/complaints/${id}`, { status: newStatus });
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === id ? { ...complaint, status: res.data.status } : complaint
        )
      );
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update complaint status');
    }
  };

  return (
    <div className="home-page"
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
      <div className="header">Complaints</div>

      {/* Main Content */}
      <div className="complaints-list">
        <h2>Submitted Complaints</h2>
        {complaints.length === 0 ? (
          <p>No complaints to show</p>
        ) : (
          <table className="complaints-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Complaint</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td>{complaint._id}</td>
                  <td>{complaint.name}</td>
                  <td>{complaint.category}</td>
                  <td>{complaint.complaint}</td>
                  <td>
                    <select
                      value={complaint.status}
                      onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Complaints;

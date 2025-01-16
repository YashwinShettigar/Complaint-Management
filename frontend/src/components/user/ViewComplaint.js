import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../HomePage.css';
import axios from 'axios';
import { io } from 'socket.io-client';
import loginImage from '../../images/dashboard1.jpg';

const ViewComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const socket = io('http://localhost:3001'); // Connect to WebSocket server

  useEffect(() => {
    const fetchComplaints = () => {
      axios
        .get('http://localhost:3001/complaints')
        .then((res) => {
          const sortedComplaints = res.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setComplaints(sortedComplaints);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    fetchComplaints();

    // Listen for updates
    socket.on('complaint-updated', (updatedComplaint) => {
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === updatedComplaint._id
            ? updatedComplaint
            : complaint
        )
      );
    });

    return () => {
      socket.disconnect(); // Cleanup the socket connection
    };
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
        <div className="sidebar-header">User</div>
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
        <Link to="/login" className="logout-button">Logout</Link>
      </div>

      {/* Header */}
      <div className="header">Complaint Status</div>

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
                <th>Status</th> {/* Status column */}
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td>{complaint._id}</td>
                  <td>{complaint.name}</td>
                  <td>{complaint.category}</td>
                  <td>{complaint.complaint}</td>
                  <td>{complaint.status || 'Pending'}</td> {/* Display status */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewComplaint;

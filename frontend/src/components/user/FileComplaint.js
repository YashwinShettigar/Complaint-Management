import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../HomePage.css";
import axios from "axios";
import loginImage from '../../images/dashboard1.jpg';

const FileComplaint = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    category: '',
    complaint: '',
    location: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmits = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/complaints', formData)
      .then((res) => {
        alert('Complaint submitted successfully');
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert('Error submitting complaint');
      });
  };


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
      <div className="header">File Complaint Form</div>

      {/* Main Content */}
      <div className="main-contents">
        <form className="complaint-form" onSubmit={handleSubmits}>
          <h3>Complaint Form</h3>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Street Light Issue">Street Light Issue</option>
              <option value="Water Supply Issue">Water Supply Issue</option>
              <option value="Garbage Collection Delay">Garbage Collection Delay</option>
              <option value="Road Damage">Road Damage</option>
            </select>
          </div>
          <div className="form-group">
            <label>Complaint:</label>
            <textarea
              name="complaint"
              value={formData.complaint}
              onChange={handleChange}
              required
              placeholder="Describe your complaint"
            ></textarea>
          </div>
          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter the complaint location"
            />
          </div>
          <button type="submit" className="submit-button">
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default FileComplaint;

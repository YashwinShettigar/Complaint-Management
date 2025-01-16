const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const UserModel = require('./models/User');
const UserModels = require('./models/ComplaintsSchema');

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, { cors: { origin: '*' } }); // Set up WebSocket server

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Register', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Registration route
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  UserModel.create({ username, email, password })
    .then(() => res.json({ success: true }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, error: 'Failed to register' });
    });
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === 'admin@gmail.com' && password === 'admin123') {
      return res.json({
        message: 'Success',
        role: 'admin',
        user: { email },
      });
    }

    UserModel.findOne({ email })
      .then((user) => {
        if (user) {
          if (password === user.password) {
            res.json({
              message: 'Success',
              role: 'user',
              user: { id: user._id, username: user.username, email: user.email },
            });
          } else {
            res.status(400).json({ message: 'The password is incorrect' });
          }
        } else {
          res.status(400).json({ message: 'User not found' });
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
      });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Save Complaint
app.post('/complaints', async (req, res) => {
  const { name, email, phone, category, complaint, location } = req.body;

  if (!name || !email || !phone || !category || !complaint || !location) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newComplaint = new UserModels({
      name,
      email,
      phone,
      category,
      complaint,
      location,
      status: 'Pending', // Default status
    });

    const savedComplaint = await newComplaint.save();
    res.status(201).json(savedComplaint);
  } catch (err) {
    console.error('Error saving complaint:', err);
    res.status(500).json({ error: 'Failed to save complaint' });
  }
});

// Get All Complaints
app.get('/complaints', async (req, res) => {
  try {
    const complaints = await UserModels.find().sort({ createdAt: -1 }); // Latest complaints first
    res.status(200).json(complaints);
  } catch (err) {
    console.error('Error fetching complaints:', err);
    res.status(500).json({ error: 'Failed to retrieve complaints' });
  }
});

// Get Complaint Statistics
app.get('/complaint-stats', async (req, res) => {
  try {
    const totalComplaints = await UserModels.countDocuments();
    const pendingComplaints = await UserModels.countDocuments({ status: 'Pending' });
    const resolvedComplaints = await UserModels.countDocuments({ status: 'Resolved' });
    const rejectedComplaints = await UserModels.countDocuments({ status: 'Rejected' });

    res.status(200).json({
      totalComplaints,
      pendingComplaints,
      resolvedComplaints,
      rejectedComplaints,
    });
  } catch (err) {
    console.error('Error fetching complaint stats:', err);
    res.status(500).json({ error: 'Failed to retrieve complaint statistics' });
  }
});

// Update Complaint Status and Broadcast Changes
app.patch('/complaints/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['Pending', 'Resolved', 'Rejected'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const updatedComplaint = await UserModels.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    // Broadcast the update via WebSocket
    io.emit('complaint-updated', updatedComplaint);

    res.status(200).json(updatedComplaint);
  } catch (err) {
    console.error('Error updating complaint status:', err);
    res.status(500).json({ error: 'Failed to update complaint status' });
  }
});

// Start Server
server.listen(3001, () => {
  console.log('Server is running with WebSocket support on port 3001');
});
const mongoose = require('mongoose');

// Complaint Schema
const ComplaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  category: { type: String, required: true },
  complaint: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
},
{ timestamps: true } 
);

const UserModels = mongoose.models.complaint || mongoose.model('Complaint', ComplaintSchema);
module.exports = UserModels;

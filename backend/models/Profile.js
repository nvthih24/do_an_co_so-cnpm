// models/Profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: String,
  email: String,
  phone: String,
  location: String,
  title: String,
  summary: String,
  skills: [String],
  degree: String,
  school: String,
  gradYear: String,
  resumeUrl: String, 
});

module.exports = mongoose.model('Profile', profileSchema);

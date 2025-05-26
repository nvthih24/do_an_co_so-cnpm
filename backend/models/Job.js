const e = require('express');
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  company: String,
  location: String,
  type: String,
  salary: String,
  experience: String,
  description: String,
  requirements: String,
  benefits: String,
  featured: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Job', jobSchema);

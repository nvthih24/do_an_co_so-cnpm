const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: String,
  industry: String,
  description: String,
  location: String
});

module.exports = mongoose.model('Company', companySchema);

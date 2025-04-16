const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  position: String,
  companyName: String,
  salary: String,
  address: String,
  email: String,
  recruitmentTime: Date,
  deadline: Date,
  description: String, // Description for the job
  isApproved: { type: Boolean, default: false },
});

module.exports = mongoose.model("Job", jobSchema);

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
  companyDescription: String, // Description for the company
  isApproved: { type: Boolean, default: false },
  // Logo công ty
  logo: String,

  // Giấy phép kinh doanh (URL từ Cloudinary)
  businessLicense: String,
});

module.exports = mongoose.model("Job", jobSchema);

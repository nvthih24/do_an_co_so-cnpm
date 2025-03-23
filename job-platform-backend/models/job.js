const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number, required: true },
    employmentType: { type: String, enum: ["full-time", "part-time", "contract"], required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Nhà tuyển dụng đăng bài
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", JobSchema);

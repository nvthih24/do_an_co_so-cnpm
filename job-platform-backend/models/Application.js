const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ứng viên apply
    resumeUrl: { type: String, required: true }, // Link CV của ứng viên
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" }, // Trạng thái ứng tuyển
    appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Application", ApplicationSchema);

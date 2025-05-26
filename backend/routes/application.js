const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Job = require('../models/Job');
const User = require('../models/User');
const Application = require('../models/Application');
const multer = require('multer');
const path = require('path');


// GET /api/applications/employer/:employerId
router.get('/employer/:employerId', async (req, res) => {
  try {
    const { employerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(employerId)) {
      return res.status(400).json({ message: 'Invalid employer ID' });
    }

    // Lấy tất cả application mà jobId.userId === employerId
    const applications = await Application.find()
      .populate({
        path: 'jobId',
        match: { userId: employerId }, // chỉ job do employer đó đăng
        select: 'title company userId'
      })
      .exec();

    // Lọc bỏ application không khớp (do jobId bị null vì không match userId)
    const filtered = applications.filter(app => app.jobId !== null);

    res.status(200).json(filtered);
  } catch (error) {
    console.error('Error fetching applications for employer:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// routes/applicationRoutes.js hoặc tương đương
router.get("/job/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await Application.find({ jobId }).populate("jobId");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
});


module.exports = router;

const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// POST /api/jobs - Tạo bài đăng tuyển dụng
router.post('/', async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json({ message: 'Job posted successfully', job: newJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error posting job' });
  }
});

// GET /api/jobs - Lấy danh sách bài đăng tuyển dụng
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

// GET /api/jobs/:id - Lấy thông tin chi tiết bài đăng tuyển dụng
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching job' });
  }
});

module.exports = router;


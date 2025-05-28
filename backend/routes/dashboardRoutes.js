// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Job = require('../models/Job');
const User = require('../models/User');
const Application = require('../models/Application');

// GET /api/dashboard/stats
router.get('/stats', async (req, res) => {
  try {
    // Lấy số lượng ứng viên
    const candidates = {
      total: await User.countDocuments({ role: 'candidate' }),
      active: await User.countDocuments({ role: 'candidate', status: 'active' }),
      new: await User.countDocuments({
        role: 'candidate',
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // 7 ngày trước
      }),
    };

    // Lấy số lượng nhà tuyển dụng
    const employers = {
      total: await User.countDocuments({ role: 'employer' }),
      active: await User.countDocuments({ role: 'employer', status: 'active' }),
      pending: await User.countDocuments({ role: 'employer', status: 'pending' }),
    };

    // Lấy số lượng bài đăng công việc
    const posts = {
      total: await Job.countDocuments(),
      approved: await Job.countDocuments({ isApproved: true }),
      pending: await Job.countDocuments({ isApproved: false }),
    };

    // Lấy số lượng đơn ứng tuyển
    const applications = {
      total: await Application.countDocuments(),
      thisWeek: await Application.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      }),
    };

    res.status(200).json({
      candidates,
      employers,
      posts,
      applications,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
});

// GET /api/dashboard/candidates/monthly
router.get('/candidates/monthly', async (req, res) => {
  try {
    const candidatesByMonth = await User.aggregate([
      { $match: { role: 'candidate' } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: {
            $concat: [
              { $toString: '$_id.year' },
              '-',
              { $cond: [{ $lte: ['$_id.month', 9] }, { $concat: ['0', { $toString: '$_id.month' }] }, { $toString: '$_id.month' }] },
            ],
          },
          count: 1,
          _id: 0,
        },
      },
      { $sort: { month: 1 } },
    ]);

    res.status(200).json(candidatesByMonth);
  } catch (error) {
    console.error('Error fetching candidates monthly:', error);
    res.status(500).json({ message: 'Error fetching candidates monthly', error: error.message });
  }
});

// GET /api/dashboard/jobs/monthly
router.get('/jobs/monthly', async (req, res) => {
  try {
    const jobsByMonth = await Job.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            isApproved: '$isApproved',
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: {
            year: '$_id.year',
            month: '$_id.month',
          },
          pending: {
            $sum: { $cond: [{ $eq: ['$_id.isApproved', false] }, '$count', 0] },
          },
          approved: {
            $sum: { $cond: [{ $eq: ['$_id.isApproved', true] }, '$count', 0] },
          },
        },
      },
      {
        $project: {
          month: {
            $concat: [
              { $toString: '$_id.year' },
              '-',
              { $cond: [{ $lte: ['$_id.month', 9] }, { $concat: ['0', { $toString: '$_id.month' }] }, { $toString: '$_id.month' }] },
            ],
          },
          pending: 1,
          approved: 1,
          _id: 0,
        },
      },
      { $sort: { month: 1 } },
    ]);

    res.status(200).json(jobsByMonth);
  } catch (error) {
    console.error('Error fetching jobs monthly:', error);
    res.status(500).json({ message: 'Error fetching jobs monthly', error: error.message });
  }
});

// GET /api/dashboard/activities/recent
router.get('/activities/recent', async (req, res) => {
  try {
    const recentActivity = [];

    // Lấy các hoạt động gần đây từ User (ứng viên và nhà tuyển dụng)
    const recentUsers = await User.find()
      .select('name role createdAt')
      .sort({ createdAt: -1 })
      .limit(10);
    recentUsers.forEach(user => {
      recentActivity.push({
        id: user._id,
        type: user.role === 'candidate' ? 'new_candidate' : 'new_employer',
        entityName: user.name,
        timestamp: user.createdAt,
      });
    });

    // Lấy các bài đăng công việc gần đây
    const recentJobs = await Job.find()
      .select('title company isApproved createdAt')
      .sort({ createdAt: -1 })
      .limit(10);
    recentJobs.forEach(job => {
      recentActivity.push({
        id: job._id,
        type: job.isApproved ? 'post_approved' : 'new_post',
        entityName: `${job.title} at ${job.company}`,
        timestamp: job.createdAt,
      });
    });

    // Sắp xếp theo thời gian và giới hạn 10 hoạt động
    recentActivity.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    recentActivity.splice(10);

    res.status(200).json(recentActivity);
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    res.status(500).json({ message: 'Error fetching recent activities', error: error.message });
  }
});

module.exports = router;
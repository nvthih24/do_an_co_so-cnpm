const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Job = require('../models/Job');
const User = require('../models/User');
const Application = require('../models/Application');
const multer = require('multer');
const path = require('path');

// Cấu hình multer để lưu file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Thư mục lưu file
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF or DOCX files are allowed'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
  fileFilter,
});

// POST /api/jobs - Tạo bài đăng tuyển dụng
router.post('/', async (req, res) => {
  try {
    const { userId } = req.body;

    // Kiểm tra userId có hợp lệ không
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid or missing userId' });
    }

    // Kiểm tra user có tồn tại và là employer không
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role !== 'employer') {
      return res.status(403).json({ message: 'Only employers can post jobs' });
    }

    const newJob = new Job({
      ...req.body,
      userId, // Đảm bảo userId được lưu
    });
    await newJob.save();
    res.status(201).json({ message: 'Job posted successfully', job: newJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error posting job', error: error.message });
  }
});

// GET /api/jobs - Lấy tất cả bài đăng tuyển dụng
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

// GET /api/jobs/user/:userId - Lấy các bài đăng của một người dùng
router.get('/employer/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Kiểm tra userId hợp lệ
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid or missing userId' });
    }

    // Kiểm tra user tồn tại và là employer
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role !== 'employer') {
      return res.status(403).json({ message: 'User is not an employer' });
    }

    // Lấy tất cả bài đăng của nhà tuyển dụng
    const jobs = await Job.find({ userId }).populate('userId', 'name email role');
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs by employer:', error);
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
});


// GET /api/jobs/approved - Lấy các công việc đã được duyệt
router.get('/approved', async (req, res) => {
  try {
    const { keyword, location, limit } = req.query;
    const query = { isApproved: true };

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { company: { $regex: keyword, $options: 'i' } },
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const jobsQuery = Job.find(query).populate('userId', 'name email role');
    if (limit) {
      jobsQuery.limit(Number(limit));
    }

    const jobs = await jobsQuery;
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching approved jobs:', error);
    res.status(500).json({ message: 'Error fetching approved jobs', error: error.message });
  }
});

// GET /api/jobs/:id - Lấy thông tin bài đăng theo ID
router.get('/:id', async (req, res) => {
  try {
    const jobId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: 'Invalid job ID' });
    }
    const job = await Job.findById(jobId).populate('userId');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/jobs/:id/approve - Phê duyệt bài đăng
router.put('/:id/approve', async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job approved successfully', job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error approving job' });
  }
});

// PUT /api/jobs/:id/reject - Từ chối bài đăng
router.put('/:id/reject', async (req, res) => {
  try {
    const { reason, comments } = req.body;
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { isApproved: false, rejectionReason: reason, rejectionComments: comments },
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job rejected successfully', job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error rejecting job' });
  }
});

// PUT /api/jobs/:id/toggle-featured - Chuyển đổi trạng thái Featured
router.put('/:id/toggle-featured', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    job.featured = !job.featured;
    await job.save();
    res.status(200).json({ message: 'Featured status toggled successfully', job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error toggling featured status' });
  }
});

// DELETE /api/jobs/:id - Xóa bài đăng
router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting job' });
  }
});

// POST /api/applications
router.post('/applications', upload.single('resume'), async (req, res) => {
  try {
    const { jobId, userId, fullName, email, phone, coverLetter } = req.body;
    const resume = req.file ? req.file.path : null;

    // Kiểm tra dữ liệu đầu vào
    if (!jobId || !userId || !fullName || !email || !phone || !resume) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    if (!mongoose.Types.ObjectId.isValid(jobId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid jobId or userId' });
    }

    // Kiểm tra job và user tồn tại
    const job = await Job.findById(jobId);
    const user = await User.findById(userId);
    if (!job || !user) {
      return res.status(404).json({ message: 'Job or user not found' });
    }

    // Lưu đơn ứng tuyển
    const application = new Application({
      jobId,
      userId,
      fullName,
      email,
      phone,
      resume,
      coverLetter,
    });
    await application.save();

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
});

// POST /api/jobs/save - Lưu công việc
router.post('/save', async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid or missing userId' });
    }
    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: 'Invalid or missing jobId' });
    }

    const user = await User.findById(userId);
    const job = await Job.findById(jobId);
    if (!user || !job) {
      return res.status(404).json({ message: 'User or job not found' });
    }
    if (user.role !== 'candidate') {
      return res.status(403).json({ message: 'Only candidates can save jobs' });
    }

    const savedJob = new SavedJob({ userId, jobId });
    await savedJob.save();

    res.status(201).json({ message: 'Job saved successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Job already saved' });
    }
    console.error('Error saving job:', error);
    res.status(500).json({ message: 'Error saving job', error: error.message });
  }
});

// GET /api/jobs/saved - Lấy danh sách công việc đã lưu
router.get('/saved', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid or missing userId' });
    }

    const savedJobs = await SavedJob.find({ userId }).populate({
      path: 'jobId',
      populate: { path: 'userId', select: 'name email role' },
    });

    res.status(200).json(savedJobs.map((savedJob) => savedJob.jobId));
  } catch (error) {
    console.error('Error fetching saved jobs:', error);
    res.status(500).json({ message: 'Error fetching saved jobs', error: error.message });
  }
});

router.get('/applications/employer/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Kiểm tra userId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Kiểm tra user tồn tại và là employer
    const user = await User.findById(userId);
    if (!user || user.role !== 'employer') {
      return res.status(403).json({ message: 'User is not an employer' });
    }

    // Lấy tất cả bài đăng của nhà tuyển dụng
    const jobs = await Job.find({ userId });
    const jobIds = jobs.map(job => job._id);

    // Lấy tất cả đơn ứng tuyển cho các bài đăng này
    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate('jobId', 'title company') // Lấy tiêu đề và công ty của bài đăng
      .lean(); // Chuyển sang plain JavaScript object

    // Thêm thông tin ứng viên (fullName, email từ Application thay vì populate userId)
    const applicationsWithDetails = applications.map(app => ({
      ...app,
      fullName: app.fullName,
      email: app.email,
      phone: app.phone,
    }));

    res.status(200).json(applicationsWithDetails);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
});

module.exports = router;
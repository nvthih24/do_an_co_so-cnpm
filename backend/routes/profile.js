const express = require('express');
const multer = require('multer');
const path = require('path');
const Profile = require('../models/Profile'); 
const authenticate = require('../middleware/auth'); // Đảm bảo đã có middleware auth.js


const router = express.Router();

// Cấu hình lưu file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Thư mục uploads
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

// POST tạo profile, kèm file CV
router.post('/',authenticate ,upload.single('resume'), async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      location,
      title,
      summary,
      skills,
      degree,
      school,
      gradYear,
    } = req.body;

    // Nếu skills là JSON string (vì gửi bằng multipart/form-data), parse lại
    const skillsArray = typeof skills === 'string' ? JSON.parse(skills) : skills;
    console.log('req.user:', req.user);

    const profile = new Profile({
      userId: req.user.userId, // Lấy userId từ token
      fullName,
      email,
      phone,
      location,
      title,
      summary,
      skills: skillsArray,
      degree,
      school,
      gradYear,
      resumeUrl: req.file ? `/uploads/${req.file.filename}` : '', // lưu đường dẫn tới file
    });

    await profile.save();
    res.status(201).json({ message: 'Profile created successfully' });
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ message: 'Error creating profile' });
  }
});

// GET lấy thông tin profile của user
router.get('/', authenticate, async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// PUT cập nhật thông tin profile
router.put('/', authenticate, upload.single('resume'), async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      location,
      title,
      summary,
      skills,
      degree,
      school,
      gradYear,
    } = req.body;

    // Nếu skills là JSON string (vì gửi bằng multipart/form-data), parse lại
    const skillsArray = typeof skills === 'string' ? JSON.parse(skills) : skills;

    const updateData = {
      fullName,
      email,
      phone,
      location,
      title,
      summary,
      skills: skillsArray,
      degree,
      school,
      gradYear,
    };

    if (req.file) {
      updateData.resumeUrl = `/uploads/${req.file.filename}`; // cập nhật đường dẫn tới file
    }

    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.userId },
      updateData,
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// GET tất cả profile (chỉ admin dùng)
router.get('/all',  async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    console.error('Error fetching all profiles:', error);
    res.status(500).json({ message: 'Error fetching profiles' });
  }
});

// GET profile theo id (chỉ admin dùng)-
router.get('/:id', authenticate, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile by ID:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});


// DELETE xóa profile
router.delete('/', authenticate, async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({ userId: req.user.userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ message: 'Error deleting profile' });
  }
});

module.exports = router;

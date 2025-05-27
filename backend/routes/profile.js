const express = require('express');
const multer = require('multer');
const path = require('path');
const Profile = require('../models/Profile'); 
const authenticate = require('../middleware/auth'); // Đảm bảo đã có middleware auth.js
const mongoose = require('mongoose');
const Application = require('../models/Application'); // Import model Application
const User = require('../models/User'); // Import model User


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

    await User.updateOne(
      { _id: req.user.userId },
      { $set: { profile: profile._id } }
    );

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

// GET /api/profile/employer/:employerId
router.get('/employer/:employerId', async (req, res) => {
  try {
    const { employerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(employerId)) {
      return res.status(400).json({ message: 'Invalid employer ID' });
    }

    console.log('Fetching applications for employer:', employerId);

    // Lấy tất cả application, populate jobId và profile
    const applications = await Application.find()
      .populate({
        path: 'jobId',
        match: { userId: employerId },
        select: 'title company',
      })
      .populate({
        path: 'userId',
        select: 'profile',
        populate: {
          path: 'profile',
          model: 'Profile',
          select: 'fullName email phone location skills title summary degree school gradYear resumeUrl',
        },
      })
      .exec();

    console.log('Applications found:', applications.length);
    console.log('Applications with jobId:', applications.filter(app => app.jobId !== null).length);

    // Lọc bỏ application không khớp
    const formattedProfiles = applications
      .filter(app => {
        const keep = app.jobId !== null && app.userId && app.userId.profile;
        console.log(`App ${app._id}: jobId=${!!app.jobId}, userId=${!!app.userId}, profile=${app.userId ? !!app.userId.profile : false}, keep=${keep}`);
        return keep;
      })
      .map(app => {
        console.log(`Mapping app ${app._id}: profile=`, app.userId.profile); // Debug
        return {
          name: app.userId.profile.fullName || app.fullName || 'N/A',
          email: app.userId.profile.email || app.email || 'N/A',
          phone: app.userId.profile.phone || app.phone || 'N/A',
          location: app.userId.profile.location || 'N/A',
          skills: app.userId.profile.skills || [],
          experience: app.userId.profile.gradYear
            ? `${new Date().getFullYear() - parseInt(app.userId.profile.gradYear)} yrs`
            : 'N/A',
          profilePicture: 'https://via.placeholder.com/150',
          rating: 4.5,
          jobTitle: app.jobId.title || 'N/A',
          jobCompany: app.jobId.company || 'N/A',
          summary: app.userId.profile.summary || 'N/A',
        degree: app.userId.profile.degree || 'N/A',
        school: app.userId.profile.school || 'N/A',
        gradYear: app.userId.profile.gradYear || 'N/A',
        resumeUrl: app.userId.profile.resumeUrl || 'N/A',
        };
      });

    console.log('Formatted profiles:', formattedProfiles);

    res.status(200).json(formattedProfiles);
  } catch (error) {
    console.error('Error fetching profiles for employer:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
module.exports = router;

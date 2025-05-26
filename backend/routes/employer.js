// routes/employer.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Company = require('../models/Company');
const Job = require('../models/Job');

router.get('/', async (req, res) => {
  try {
    const employers = await User.aggregate([
  { $match: { role: 'employer' } },
  {
    $lookup: {
      from: 'companies',
      let: { userId: { $toString: '$_id' } },  // Convert _id (ObjectId) sang string
      pipeline: [
        { 
          $match: {
            $expr: { $eq: ['$userId', '$$userId'] }
          }
        }
      ],
      as: 'companyInfo'
    }
  },
  {
    $unwind: {
      path: '$companyInfo',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $project: {
      id: { $toString: '$_id' },
      name: 1,
      email: 1,
      companyName: '$companyInfo.name',
      industry: '$companyInfo.industry',
      location: '$companyInfo.location',    
      description: '$companyInfo.description',
      createdAt: 1
    }
  }
]);

    res.status(200).json(employers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//lay theo id 
router.get('/:id', async (req, res) => {
  try {
    const employerId = req.params.id;
    const mongoose = require('mongoose');

    if (!mongoose.Types.ObjectId.isValid(employerId)) {
      return res.status(400).json({ message: 'Invalid employer ID' });
    }

    const employer = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(employerId),
          role: 'employer'
        }
      },
      {
        $lookup: {
          from: 'companies',
          let: { userId: { $toString: '$_id' } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$userId', '$$userId'] }
              }
            }
          ],
          as: 'companyInfo'
        }
      },
      {
        $unwind: {
          path: '$companyInfo',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'jobs',
          let: { userId: { $toString: '$_id' } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$userId', '$$userId'] }
              }
            },
            {
              $project: {
                title: 1,
                company: 1,
                location: 1,
                type: 1,
                salary: 1,
                experience: 1,
                description: 1,
                createdAt: 1
              }
            }
          ],
          as: 'jobs'
        }
      },
      {
        $project: {
          id: { $toString: '$_id' },
          name: 1,
          email: 1,
          companyName: '$companyInfo.name',
          industry: '$companyInfo.industry',
          location: '$companyInfo.location',
          description: '$companyInfo.description',
          createdAt: 1,
          jobs: 1
        }
      }
    ]);

    if (!employer || employer.length === 0) {
      return res.status(404).json({ message: 'Employer not found' });
    }

    res.status(200).json(employer[0]);
  } catch (error) {
    console.error('Error in /api/employers/:id:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});




module.exports = router;

const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// POST: Create or Update Company Profile
router.post('/save-profile', async (req, res) => {
    
  try {
    const { userId, name, industry, description, location } = req.body;

    let company = await Company.findOne({ userId });
    if (company) {
      company.name = name;
      company.industry = industry;
      company.description = description;
      company.location = location;
    } else {
      company = new Company({ userId, name, industry, description, location });
    }

    await company.save();
    res.status(200).json({ message: 'Company profile saved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET: Get Company Profile
router.get('/:userId', async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.params.userId });
    if (!company) return res.status(404).json({});
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;

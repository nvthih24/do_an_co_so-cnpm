const express = require('express');
const router = express.Router();
const CV = require('../models/CV');
const auth = require('../middleware/auth'); // middleware xác thực JWT

// Lấy CV
router.get('/:templateId', auth, async (req, res) => {
  const cv = await CV.findOne({ userId: req.user.id, templateId: req.params.templateId });
  res.json(cv || {});
});

// Lưu CV
router.post('/:templateId', auth, async (req, res) => {
  const { fields } = req.body;
  const cv = await CV.findOneAndUpdate(
    { userId: req.user.id, templateId: req.params.templateId },
    { fields },
    { upsert: true, new: true }
  );
  res.json(cv);
});

module.exports = router;
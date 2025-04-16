const express = require("express");
const Job = require("../models/job"); // model Job
const router = express.Router();


// Lấy job chưa duyệt
router.get("/pending", async (req, res) => {
  try {
    const jobs = await Job.find({ isApproved: false });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy job chưa duyệt" });
  }
});

// Duyệt job
router.put("/:id/approve", async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi duyệt job" });
  }
});



module.exports = router;

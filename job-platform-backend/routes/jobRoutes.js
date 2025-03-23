const express = require("express");
const Job = require("../models/job");
const router = express.Router();

// Lấy danh sách công việc
router.get("/", async (req, res) => {
    const jobs = await Job.find();
    res.json(jobs);
});

// Thêm công việc mới
router.post("/", async (req, res) => {
    const newJob = new Job(req.body);
    await newJob.save();
    res.json({ message: "Job added", job: newJob });
});

module.exports = router;

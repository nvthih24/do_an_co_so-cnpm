const express = require("express");
const Job = require("../models/job"); // model Job
const router = express.Router();


// Thêm công việc mới
router.post("/", async (req, res) => {
  try {
    const newJob = new Job({
      position: req.body.position,
      companyName: req.body.companyName,
      salary: req.body.salary,
      address: req.body.address,
      email: req.body.email,
      recruitmentTime: req.body.recruitmentTime,
      deadline: req.body.deadline,
      description: req.body.description,
      companyDescription: req.body.companyDescription,
      isApproved: false, // Mặc định là chưa duyệt
      //logo: req.file?.path || "", 
    });

    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi đăng tuyển công việc" });
  }
});


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

// Lấy các job đã được duyệt
router.get("/approved", async (req, res) => {
  try {
    const approvedJobs = await Job.find({ isApproved: true });
    res.json(approvedJobs);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách job đã duyệt" });
  }
});

// Lấy chi tiết job theo ID
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Không tìm thấy công ty." });
    }
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy id công ty" });
  }
});


module.exports = router;

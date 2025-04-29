const express = require("express");
const Job = require("../models/job"); // model Job
const router = express.Router();
const upload = require("./uploader"); 
const cloudinary = require("../utils/cloudinary");


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

// Xoá job theo ID
router.delete("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Không tìm thấy công việc." });
    }
    await job.deleteOne(); // hoặc job.remove() cũng được
    res.json({ message: "Xoá công việc thành công!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi khi xoá công việc." });
  }
});

// Route upload giấy phép kinh doanh
router.post("/upload-license/:jobId", upload.single("businessLicense"), async (req, res) => {
  try {
    const { jobId } = req.params;
    
    // File đã tự động upload lên Cloudinary rồi
    // Link ảnh trong req.file.path
    const imageUrl = req.file.path || req.file.url;

    await Job.findByIdAndUpdate(jobId, { businessLicense: imageUrl }, { new: true });

    res.json({ message: "Upload thành công!", url: imageUrl });
    console.log("Đã upload giấy phép kinh doanh:", imageUrl);
  } catch (error) {
    console.error("Lỗi upload:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Route upload logo công ty
router.post("/upload-logo/:id", upload.single("logo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Logo không được bỏ trống" });
    }

    // URL của logo được lưu trữ trong req.file.path (được lưu trữ tự động khi sử dụng multer-storage-cloudinary)
    const logoUrl = req.file.path || req.file.url;

    // Cập nhật logo vào job trong DB
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Không tìm thấy công việc" });
    }
    job.logo = logoUrl;
    await job.save();

    res.status(200).json({ message: "Logo uploaded successfully", logoUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload logo thất bại", error: err.message });
  }
});




module.exports = router;

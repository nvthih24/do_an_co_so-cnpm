const express = require("express");
const Job = require("../models/job"); // model Job
const router = express.Router();

// POST endpoint to create a job post
router.post("/", async (req, res) => {
  try {
    const {
      position, companyName, salary, address,
      email, recruitmentTime, deadline, description
    } = req.body;

    // Create a new Job document
    const job = new Job({
      position, companyName, salary, address,
      email, recruitmentTime, deadline, description
    });

    await job.save();
    res.status(201).json({ message: "Job posted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to post job" });
  }
});

module.exports = router;

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
connectDB();

// Route mẫu
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

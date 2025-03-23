require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Kết nối MongoDB (chỉ gọi 1 lần)
connectDB();

// Middleware (CẦN ĐƯỢC KHAI BÁO TRƯỚC ROUTES)
app.use(cors());
app.use(express.json());

// Import routes
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");

// Sử dụng routes
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);

// Route test
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

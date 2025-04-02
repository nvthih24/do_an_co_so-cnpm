const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");



const router = express.Router();

// Đăng ký User
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Kiểm tra email đã tồn tại chưa
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Email đã tồn tại" });

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user mới
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: "Đăng ký thành công" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

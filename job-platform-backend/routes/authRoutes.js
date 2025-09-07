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


// Đăng nhập bằng email & mật khẩu
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Kiểm tra email có tồn tại không
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Email không tồn tại!" });
  
      // Kiểm tra mật khẩu
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Mật khẩu không đúng!" });
  
      // Tạo JWT Token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  
      res.status(200).json({
        token,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
        message: "Đăng nhập thành công!",
      });
      
    } catch (err) {
      res.status(500).json({ message: "Lỗi server!" });
    }
  });

  const { OAuth2Client } = require("google-auth-library");
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  
// Đăng nhập bằng Google
router.post("/google-login", async (req, res) => {
    try {
      const { email, name, googleId } = req.body;
  
      let user = await User.findOne({ email });
  
      // Nếu user chưa tồn tại, tạo user mớid
      if (!user) {
        user = new User({ name, email, googleId });
        await user.save();
      }
  
      // Tạo JWT Token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  
      res.status(200).json({ token, message: "Đăng nhập thành công!" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi đăng nhập với Google!" });
    }
  });

module.exports = router;

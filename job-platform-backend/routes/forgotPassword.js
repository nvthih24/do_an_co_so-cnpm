const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

let otpStore = {}; // Tạm lưu mã OTP

// Gửi OTP qua email
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "Email không tồn tại!" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: "Mã xác nhận đặt lại mật khẩu",
      html: `<p>Mã OTP của bạn là: <strong>${otp}</strong></p>`,
    });
    res.json({ message: "Mã xác nhận đã được gửi!" });
  } catch (err) {
    res.status(500).json({ message: "Gửi email thất bại!", error: err.message });
  }
});

// Xác minh OTP
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] === otp) {
    return res.json({ verified: true });
  }
  return res.status(400).json({ message: "Mã xác nhận không đúng!" });
});

// Đặt lại mật khẩu
router.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.updateOne({ email }, { password: hashedPassword });

  delete otpStore[email];
  res.json({ message: "Đặt lại mật khẩu thành công!" });
});

module.exports = router;

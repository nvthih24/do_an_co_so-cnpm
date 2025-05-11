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
      html: `<p>Xin chào ${user.name},</p>
              <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.</p>
              <p>Mã OTP của bạn là:</p>
              <p><strong>${otp}</strong></p>
              <p>Vui lòng không chia sẻ mã này với bất kỳ ai.</p>
              <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
              <p>Trân trọng,<br>Đội ngũ hỗ trợ 3TML</p>
              <p>-----------------------------</p>
              <p>Đây là email tự động, vui lòng không trả lời.</p>
              <p>-----------------------------</p>
              <p>Để biết thêm thông tin, vui lòng truy cập trang web của chúng tôi.</p>
              <p>-----------------------------</p>
              <p>Đây là đồ án của nhóm 3TML chúng tôi, vui lòng không sao chép.</p>
              <p>-----------------------------</p>
              <p>3TML!</p>
              <p>-----------------------------</p>  
              </p>`,
    });
    res.json({ message: "Mã xác nhận đã được gửi!" });
  } catch (err) {
    res.status(500).json({ message: "Gửi email thất bại!", error: err.message });
    console.error("Lỗi gửi email:", err);

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

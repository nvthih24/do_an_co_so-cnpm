// seedAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User"); // 👉 import đúng model User của bạn

mongoose.connect("mongodb+srv://admin:3TML@cluster0.v0ehm.mongodb.net/cv-platform", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createAdmin() {
    const name = "Admin";
  const email = "admin3TML@gmail.com";
  const password = "3TML@123"; // Mật khẩu admin
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin đã tồn tại");
    return mongoose.disconnect();
  }

  const admin = new User({
    name,
    email,
    password: hashedPassword,
    role: "admin",
  });

  await admin.save();
  console.log("Admin đã được tạo thành công!");
  mongoose.disconnect();
}

createAdmin();

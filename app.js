const mongoose = require("mongoose");
const { connect } = require("./config/database");
const User = require("./models/user");

async function start() {
  try {
    await connect();
    console.log("✅ Kết nối MongoDB thành công");
  } catch (err) {
    console.error("❌ Kết nối MongoDB thất bại:", err);
  }
}

start();

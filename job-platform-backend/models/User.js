const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    googleId: { type: String, unique: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);

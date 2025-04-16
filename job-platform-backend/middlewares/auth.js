const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: "Không có token!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token không hợp lệ!" });
  }
};

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (user?.role !== "admin")
    return res.status(403).json({ message: "Bạn không có quyền admin." });
  next();
};

module.exports = { verifyToken, isAdmin };

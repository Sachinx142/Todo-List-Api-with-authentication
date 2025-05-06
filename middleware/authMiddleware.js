const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  console.log("🔐 protect middleware triggered");

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      console.log("🔑 Token:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      console.log("👤 Authenticated user:", req.user.email);
      next();
    } catch (err) {
      console.error("❌ Token error:", err.message);
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    console.log("⚠️ No token provided");
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = protect;

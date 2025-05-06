const jwt=require('jsonwebtoken');
require('dotenv').config();

module.exports.isAdmin = async (req, res, next) => {
 
  if (!req.user) {
      console.error("🚨 Error: req.user is undefined");
      return res.status(403).json({ success: false, message: "Admin privileges required" });
  }

  if (!req.user.role) {
      return res.status(403).json({ success: false, message: "User role missing" });
  }

  if (req.user.role.toLowerCase() !== "admin") {  
      return res.status(403).json({ success: false, message: "Access denied: Admin rights required" });
  }

  console.log("✅ User is Admin, proceeding...");
  next();
};
  /////

  module.exports.verifyToken = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    // Ensure Authorization header is present and properly formatted
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.error("🚨 Token missing or incorrectly formatted!");
        return res.status(401).json({ success: false, message: "Malformed or missing token" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // Expiry check (optional, JWT.verify should handle this)
        if (decoded.exp * 1000 < Date.now()) {
            return res.status(401).json({ success: false, message: "Token expired" });
        }

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};
module.exports.isAdmin = async (req, res, next) => {
  if (!req.user || req.user.role !== "Admin") {
    return res.status(403).json({ success: false, message: "Admin privileges required" });
  }
  next();
};

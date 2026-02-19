const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.models");

module.exports = async (req, res, next) => {
  try {
    const { token, id } = req.body;

    if (!token || !id) {
      return res.status(401).json({
        success: false,
        message: "Token and ID required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id !== id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token or ID mismatch",
      });
    }

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (admin.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Admin account is not active",
      });
    }

    req.user = admin;
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

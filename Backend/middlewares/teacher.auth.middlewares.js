const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacher.models");

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

    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    if (teacher.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Teacher account is not active",
      });
    }

    req.user = teacher;
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

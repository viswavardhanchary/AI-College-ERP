const jwt = require("jsonwebtoken");
const Student = require("../models/student.models");

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

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    if (student.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Student account is not active",
      });
    }

    req.user = student;
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

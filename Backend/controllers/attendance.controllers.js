const Attendance = require("../models/attendance.models");

  
exports.createAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);

    res.status(201).json({
      success: true,
      message: "Attendance created",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("student_id")
      .populate("subject_id");

    res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



exports.getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id)
      .populate("student_id")
      .populate("subject_id");

    if (!attendance)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.markAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);

    if (!attendance)
      return res.status(404).json({ success: false, message: "Not found" });

    attendance.day_by_day.push(req.body);
    await attendance.save();

    res.status(200).json({
      success: true,
      message: "Attendance marked",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.deleteAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Attendance deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

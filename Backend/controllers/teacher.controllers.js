const Teacher = require("../models/teacher.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.teacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ college_email: email });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: teacher._id,
        name: teacher.first_name + " " + teacher.last_name,
        roll_no: teacher.roll_no,
        role: "teacher",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      token,
      id: teacher._id,
      name: teacher.first_name + " " + teacher.last_name,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);

    res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.bulkCreateTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.insertMany(req.body);

    res.status(201).json({
      success: true,
      message: "Teachers inserted successfully",
      data: teachers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



exports.getAllTeachers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, dept, status } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { first_name: { $regex: search, $options: "i" } },
        { last_name: { $regex: search, $options: "i" } },
        { roll_no: { $regex: search, $options: "i" } },
      ];
    }

    if (dept) query.dept = dept;
    if (status) query.status = status;

    const teachers = await Teacher.find(query)
      .populate("subjects_handle.subject.subject_id")
      .populate("mentor_to.students")
      .populate("uploads")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Teacher.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      data: teachers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate("subjects_handle.subject.subject_id")
      .populate("mentor_to.students")
      .populate("uploads");

    if (!teacher)
      return res.status(404).json({ success: false, message: "Teacher not found" });

    res.status(200).json({ success: true, data: teacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!teacher)
      return res.status(404).json({ success: false, message: "Teacher not found" });

    res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.patchTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher)
      return res.status(404).json({ success: false, message: "Teacher not found" });

    Object.keys(req.body).forEach((key) => {
      teacher[key] = req.body[key];
    });

    await teacher.save();

    res.status(200).json({
      success: true,
      message: "Teacher partially updated",
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.toggleTeacherStatus = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher)
      return res.status(404).json({ success: false, message: "Teacher not found" });

    teacher.status = teacher.status === "active" ? "not active" : "active";

    await teacher.save();

    res.status(200).json({
      success: true,
      message: `Status changed to ${teacher.status}`,
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



exports.addSubjectHandle = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher)
      return res.status(404).json({ success: false, message: "Teacher not found" });

    teacher.subjects_handle.push(req.body);

    await teacher.save();

    res.status(200).json({
      success: true,
      message: "Subject assigned to teacher",
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.markTeacherAttendance = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher)
      return res.status(404).json({ success: false, message: "Teacher not found" });

    teacher.attendance.push(req.body);

    await teacher.save();

    res.status(200).json({
      success: true,
      message: "Attendance marked",
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.addMentorStudents = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher)
      return res.status(404).json({ success: false, message: "Teacher not found" });

    teacher.mentor_to.push(req.body);

    await teacher.save();

    res.status(200).json({
      success: true,
      message: "Mentor students assigned",
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.addSalaryPayment = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher)
      return res.status(404).json({ success: false, message: "Teacher not found" });

    teacher.paying.push(req.body);

    await teacher.save();

    res.status(200).json({
      success: true,
      message: "Salary record added",
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.softDeleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { status: "not active" },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Teacher deactivated",
      data: teacher,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.deleteTeacher = async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Teacher permanently deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

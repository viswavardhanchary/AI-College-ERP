const Academic = require("../models/academic.models");


exports.createAcademic = async (req, res) => {
  try {
    const academic = await Academic.create(req.body);

    res.status(201).json({
      success: true,
      message: "Academic record created",
      data: academic,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getAllAcademics = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const academics = await Academic.find()
      .populate("student_id")
      .populate("years.mentor")
      .populate("years.semesters.registerd_subjects.subject_id")
      .populate("years.semesters.registerd_subjects.attendance")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Academic.countDocuments();

    res.status(200).json({
      success: true,
      total,
      data: academics,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getAcademicById = async (req, res) => {
  try {
    const academic = await Academic.findById(req.params.id)
      .populate("student_id")
      .populate("years.mentor")
      .populate("years.semesters.registerd_subjects.subject_id");

    if (!academic)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, data: academic });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



exports.updateAcademic = async (req, res) => {
  try {
    const academic = await Academic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!academic)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({
      success: true,
      message: "Academic updated",
      data: academic,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.addYear = async (req, res) => {
  try {
    const academic = await Academic.findById(req.params.id);

    if (!academic)
      return res.status(404).json({ success: false, message: "Not found" });

    academic.years.push(req.body);
    await academic.save();

    res.status(200).json({
      success: true,
      message: "Year added",
      data: academic,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



exports.deleteAcademic = async (req, res) => {
  try {
    const academic = await Academic.findByIdAndDelete(req.params.id);

    if (!academic)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({
      success: true,
      message: "Academic deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

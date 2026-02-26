const Attendance = require('../models/attendance.models');

exports.createAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.create(req.body);
        res.status(201).json(attendance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllAttendances = async (req, res) => {
    try {
        const attendances = await Attendance.find()
            .populate('subject_id student_id college');
        res.status(200).json(attendances);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAttendanceById = async (req, res) => {
    try {
        const attendance = await Attendance.findById(req.params.id)
            .populate('subject_id student_id college');
        if (!attendance) return res.status(404).json({ message: "Not found" });
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStudentAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find({ student_id: req.params.studentId })
            .populate('subject_id');
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAttendanceMetadata = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndUpdate(
            req.params.id,
            { 
                subject_id: req.body.subject_id,
                student_id: req.body.student_id,
                college: req.body.college
            },
            { new: true }
        );
        res.status(200).json(attendance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addDayEntry = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndUpdate(
            req.params.id,
            { $push: { day_by_day: req.body } },
            { new: true, runValidators: true }
        );
        res.status(200).json(attendance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateDayEntry = async (req, res) => {
    try {
        const attendance = await Attendance.findOneAndUpdate(
            { _id: req.params.id, "day_by_day._id": req.params.dayId },
            { $set: { "day_by_day.$.status": req.body.status, "day_by_day.$.date": req.body.date } },
            { new: true }
        );
        res.status(200).json(attendance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.removeDayEntry = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndUpdate(
            req.params.id,
            { $pull: { day_by_day: { _id: req.params.dayId } } },
            { new: true }
        );
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAttendanceRecord = async (req, res) => {
    try {
        await Attendance.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Record deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
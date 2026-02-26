const Teacher = require('../models/teacher.models');
const bcrypt = require('bcrypt');

exports.createTeacher = async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const teacher = await Teacher.create(req.body);
        res.status(201).json(teacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find()
            .populate('profile college uploads ai_chat subjects_handle.subject.subject_id mentor_to.students');
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id)
            .populate('profile college uploads ai_chat subjects_handle.subject.subject_id mentor_to.students');
        if (!teacher) return res.status(404).json({ message: "Teacher not found" });
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTeacherProfile = async (req, res) => {
    try {
        if (req.body.password) delete req.body.password;
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(teacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTeacher = async (req, res) => {
    try {
        await Teacher.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Teacher deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addSubjectHandle = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            { $push: { subjects_handle: req.body } },
            { new: true }
        );
        res.status(200).json(teacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateSubjectDates = async (req, res) => {
    try {
        const teacher = await Teacher.findOneAndUpdate(
            { _id: req.params.id, "subjects_handle._id": req.params.handleId },
            { $set: { "subjects_handle.$.subject.dates": req.body.dates } },
            { new: true }
        );
        res.status(200).json(teacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addAttendanceRecord = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            { $push: { attendance: req.body } },
            { new: true }
        );
        res.status(200).json(teacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addMentorGroup = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            { $push: { mentor_to: req.body } },
            { new: true }
        );
        res.status(200).json(teacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addStudentToMentorGroup = async (req, res) => {
    try {
        const teacher = await Teacher.findOneAndUpdate(
            { _id: req.params.id, "mentor_to._id": req.params.mentorId },
            { $addToSet: { "mentor_to.$.students": req.body.student_id } },
            { new: true }
        );
        res.status(200).json(teacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addPayrollEntry = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            { $push: { paying: req.body } },
            { new: true }
        );
        res.status(200).json(teacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updatePayrollStatus = async (req, res) => {
    try {
        const teacher = await Teacher.findOneAndUpdate(
            { _id: req.params.id, "paying._id": req.params.payId },
            { $set: { "paying.$.status": req.body.status } },
            { new: true }
        );
        res.status(200).json(teacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
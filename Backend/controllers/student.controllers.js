const Student = require('../models/student.models');
const bcrypt = require('bcrypt');

exports.createStudent = async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find()
            .populate('profile college academic results uploads events_registered ai_chat');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
            .populate('profile college academic results uploads events_registered ai_chat');
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateStudentProfile = async (req, res) => {
    try {
        if (req.body.password) delete req.body.password;
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Student deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.registerForEvent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { events_registered: req.body.event_id } },
            { new: true }
        );
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.unregisterFromEvent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { $pull: { events_registered: req.params.eventId } },
            { new: true }
        );
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addAiChatSession = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { $push: { ai_chat: req.body.chat_id } },
            { new: true }
        );
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateAcademicReference = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { academic: req.body.academic_id },
            { new: true }
        );
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const Subject = require('../models/subject.models');

exports.createSubject = async (req, res) => {
    try {
        const subject = await Subject.create(req.body);
        res.status(201).json(subject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().populate('college');
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id).populate('college');
        if (!subject) return res.status(404).json({ message: "Subject not found" });
        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSubjectsByDept = async (req, res) => {
    try {
        const subjects = await Subject.find({ dept: req.params.dept });
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSubjectsByCollege = async (req, res) => {
    try {
        const subjects = await Subject.find({ college: req.params.collegeId });
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!subject) return res.status(404).json({ message: "Subject not found" });
        res.status(200).json(subject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndDelete(req.params.id);
        if (!subject) return res.status(404).json({ message: "Subject not found" });
        res.status(200).json({ message: "Subject deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const Academic = require('../models/academic.models');

exports.createAcademic = async (req, res) => {
    try {
        const newRecord = await Academic.create(req.body);
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getAllAcademics = async (req, res) => {
    try {
        const records = await Academic.find()
            .populate('student_id college')
            .populate('years.mentor')
            .populate('years.semesters.registerd_subjects.subject_id');
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAcademicByStudent = async (req, res) => {
    try {
        const record = await Academic.findOne({ student_id: req.params.studentId })
            .populate('student_id college years.mentor');
        if (!record) return res.status(404).json({ message: "Record not found" });
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.addYear = async (req, res) => {
    try {
        const record = await Academic.findByIdAndUpdate(
            req.params.id,
            { $push: { years: req.body } },
            { new: true }
        );
        res.status(200).json(record);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.registerSubject = async (req, res) => {
    const { id, yearId } = req.params;
    try {
        const record = await Academic.findOneAndUpdate(
            { _id: id, "years._id": yearId },
            { 
                $push: { "years.$.semesters.registerd_subjects": req.body } 
            },
            { new: true }
        );
        res.status(200).json(record);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.updateAttendance = async (req, res) => {
    const { id, yearId, subjectObjId } = req.params;
    try {
        const record = await Academic.findOneAndUpdate(
            { 
                _id: id, 
                "years._id": yearId,
                "years.semesters.registerd_subjects._id": subjectObjId 
            },
            { 
                $set: { "years.$[year].semesters.registerd_subjects.$[sub].attendance": req.body.attendance } 
            },
            { 
                arrayFilters: [{ "year._id": yearId }, { "sub._id": subjectObjId }],
                new: true 
            }
        );
        res.status(200).json(record);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.deleteAcademic = async (req, res) => {
    try {
        await Academic.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const Result = require('../models/result.models');

exports.createResult = async (req, res) => {
    try {
        const result = await Result.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllResults = async (req, res) => {
    try {
        const results = await Result.find()
            .populate('student_id subject_id college years.semesters.registerd_subjects.subject_id');
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getResultById = async (req, res) => {
    try {
        const result = await Result.findById(req.params.id)
            .populate('student_id subject_id college years.semesters.registerd_subjects.subject_id');
        if (!result) return res.status(404).json({ message: "Result record not found" });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getResultsByStudent = async (req, res) => {
    try {
        const results = await Result.find({ student_id: req.params.studentId })
            .populate('college');
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateResultMetadata = async (req, res) => {
    try {
        const result = await Result.findByIdAndUpdate(
            req.params.id,
            { 
                student_id: req.body.student_id, 
                subject_id: req.body.subject_id, 
                college: req.body.college 
            },
            { new: true }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addYearResult = async (req, res) => {
    try {
        const result = await Result.findByIdAndUpdate(
            req.params.id,
            { $push: { years: req.body } },
            { new: true, runValidators: true }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateSemesterInfo = async (req, res) => {
    try {
        const result = await Result.findOneAndUpdate(
            { _id: req.params.id, "years._id": req.params.yearId },
            { $set: { "years.$.semesters": req.body } },
            { new: true }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addRegisteredSubjectToResult = async (req, res) => {
    try {
        const result = await Result.findOneAndUpdate(
            { _id: req.params.id, "years._id": req.params.yearId },
            { $push: { "years.$.semesters.registerd_subjects": req.body } },
            { new: true }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateSubjectGrade = async (req, res) => {
    try {
        const result = await Result.findOneAndUpdate(
            { 
                _id: req.params.id, 
                "years._id": req.params.yearId,
                "years.semesters.registerd_subjects._id": req.params.subjectObjId 
            },
            { 
                $set: { 
                    "years.$[year].semesters.registerd_subjects.$[sub].grade": req.body.grade,
                    "years.$[year].semesters.registerd_subjects.$[sub].marks": req.body.marks,
                    "years.$[year].semesters.registerd_subjects.$[sub].status": req.body.status
                } 
            },
            { 
                arrayFilters: [{ "year._id": req.params.yearId }, { "sub._id": req.params.subjectObjId }],
                new: true 
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.removeYearResult = async (req, res) => {
    try {
        const result = await Result.findByIdAndUpdate(
            req.params.id,
            { $pull: { years: { _id: req.params.yearId } } },
            { new: true }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteResultRecord = async (req, res) => {
    try {
        await Result.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Result record deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
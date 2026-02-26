const Upload = require('../models/upload.models');

exports.createUpload = async (req, res) => {
    try {
        const upload = await Upload.create(req.body);
        res.status(201).json(upload);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllUploads = async (req, res) => {
    try {
        const uploads = await Upload.find()
            .populate('college user_id');
        res.status(200).json(uploads);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUploadById = async (req, res) => {
    try {
        const upload = await Upload.findById(req.params.id)
            .populate('college user_id');
        if (!upload) return res.status(404).json({ message: "File record not found" });
        res.status(200).json(upload);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUploadsByUser = async (req, res) => {
    try {
        const uploads = await Upload.find({ 
            user_id: req.params.userId,
            user_type: req.params.userType 
        });
        res.status(200).json(uploads);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUploadsByCollege = async (req, res) => {
    try {
        const uploads = await Upload.find({ college: req.params.collegeId });
        res.status(200).json(uploads);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUploadDetails = async (req, res) => {
    try {
        const upload = await Upload.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!upload) return res.status(404).json({ message: "File record not found" });
        res.status(200).json(upload);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUpload = async (req, res) => {
    try {
        const upload = await Upload.findByIdAndDelete(req.params.id);
        if (!upload) return res.status(404).json({ message: "File record not found" });
        res.status(200).json({ message: "File record deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
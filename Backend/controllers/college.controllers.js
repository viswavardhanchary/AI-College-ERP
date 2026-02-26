const College = require('../models/college.models');

exports.createCollege = async (req, res) => {
    try {
        const college = await College.create(req.body);
        res.status(201).json(college);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllColleges = async (req, res) => {
    try {
        const colleges = await College.find().populate('contact_persons.image college');
        res.status(200).json(colleges);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCollegeById = async (req, res) => {
    try {
        const college = await College.findById(req.params.id).populate('contact_persons.image college');
        if (!college) return res.status(404).json({ message: "College not found" });
        res.status(200).json(college);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCollege = async (req, res) => {
    try {
        const college = await College.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json(college);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteCollege = async (req, res) => {
    try {
        await College.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "College deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addAddress = async (req, res) => {
    try {
        const college = await College.findByIdAndUpdate(
            req.params.id,
            { $push: { address: req.body } },
            { new: true }
        );
        res.status(200).json(college);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateAddress = async (req, res) => {
    try {
        const college = await College.findOneAndUpdate(
            { _id: req.params.id, "address._id": req.params.addressId },
            { $set: { "address.$": req.body } },
            { new: true }
        );
        res.status(200).json(college);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.removeAddress = async (req, res) => {
    try {
        const college = await College.findByIdAndUpdate(
            req.params.id,
            { $pull: { address: { _id: req.params.addressId } } },
            { new: true }
        );
        res.status(200).json(college);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addContactPerson = async (req, res) => {
    try {
        const college = await College.findByIdAndUpdate(
            req.params.id,
            { $push: { contact_persons: req.body } },
            { new: true }
        );
        res.status(200).json(college);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateContactPerson = async (req, res) => {
    try {
        const college = await College.findOneAndUpdate(
            { _id: req.params.id, "contact_persons._id": req.params.contactId },
            { $set: { "contact_persons.$": req.body } },
            { new: true }
        );
        res.status(200).json(college);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.removeContactPerson = async (req, res) => {
    try {
        const college = await College.findByIdAndUpdate(
            req.params.id,
            { $pull: { contact_persons: { _id: req.params.contactId } } },
            { new: true }
        );
        res.status(200).json(college);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
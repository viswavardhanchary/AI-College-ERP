const Admin = require('../models/admin.models');
const bcrypt = require('bcrypt');


exports.createAdmin = async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const admin = await Admin.create(req.body);
        res.status(201).json(admin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find()
            .populate('profile uploads college ai_chat');
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id)
            .populate('profile uploads college ai_chat');
        if (!admin) return res.status(404).json({ message: "Admin not found" });
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        delete req.body.password; 
        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(admin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.deleteAdmin = async (req, res) => {
    try {
        await Admin.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Admin record deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addAttendance = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndUpdate(
            req.params.id,
            { $push: { attendance: req.body } },
            { new: true, runValidators: true }
        );
        res.status(200).json(admin.attendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.addPayrollRecord = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndUpdate(
            req.params.id,
            { $push: { paying: req.body } },
            { new: true, runValidators: true }
        );
        res.status(200).json(admin.paying);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updatePayrollStatus = async (req, res) => {
    const { id, payId } = req.params;
    try {
        const admin = await Admin.findOneAndUpdate(
            { _id: id, "paying._id": payId },
            { $set: { "paying.$.status": req.body.status } },
            { new: true }
        );
        res.status(200).json(admin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
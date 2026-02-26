const Event = require('../models/events.models');

exports.createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate('created_by image uploads registered_memebers.student_id college');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('created_by image uploads registered_memebers.student_id college');
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Event deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addContact = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { $push: { contacts: req.body } },
            { new: true }
        );
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.removeContact = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { $pull: { contacts: { _id: req.params.contactId } } },
            { new: true }
        );
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.registerMember = async (req, res) => {
    try {
        const registration = {
            student_id: req.body.student_id,
            date_time: new Date()
        };
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { $push: { registered_memebers: registration } },
            { new: true }
        );
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.unregisterMember = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { $pull: { registered_memebers: { _id: req.params.memberId } } },
            { new: true }
        );
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addUpload = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { $push: { uploads: req.body.upload_id } },
            { new: true }
        );
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
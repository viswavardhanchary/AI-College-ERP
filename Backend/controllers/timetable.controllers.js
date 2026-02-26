const Timetable = require('../models/timetable.models');

exports.createTimetable = async (req, res) => {
    try {
        const timetable = await Timetable.create(req.body);
        res.status(201).json(timetable);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllTimetables = async (req, res) => {
    try {
        const timetables = await Timetable.find().populate('college');
        res.status(200).json(timetables);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTimetableById = async (req, res) => {
    try {
        const timetable = await Timetable.findById(req.params.id).populate('college');
        if (!timetable) return res.status(404).json({ message: "Timetable not found" });
        res.status(200).json(timetable);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTimetableByClass = async (req, res) => {
    try {
        const { dept, section, batch, sem_number } = req.query;
        const timetable = await Timetable.findOne({ dept, section, batch, sem_number });
        if (!timetable) return res.status(404).json({ message: "No timetable found for this class" });
        res.status(200).json(timetable);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTimetableMetadata = async (req, res) => {
    try {
        const timetable = await Timetable.findByIdAndUpdate(
            req.params.id,
            { 
                from: req.body.from,
                to: req.body.to,
                dept: req.body.dept,
                section: req.body.section,
                batch: req.body.batch,
                sem_number: req.body.sem_number,
                start_from: req.body.start_from,
                college: req.body.college
            },
            { new: true }
        );
        res.status(200).json(timetable);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addDaySchedule = async (req, res) => {
    try {
        const timetable = await Timetable.findByIdAndUpdate(
            req.params.id,
            { $push: { day_by_day: req.body } },
            { new: true, runValidators: true }
        );
        res.status(200).json(timetable);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateDaySchedule = async (req, res) => {
    try {
        const timetable = await Timetable.findOneAndUpdate(
            { _id: req.params.id, "day_by_day._id": req.params.dayId },
            { $set: { "day_by_day.$": req.body } },
            { new: true }
        );
        res.status(200).json(timetable);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addSlotToDay = async (req, res) => {
    try {
        const timetable = await Timetable.findOneAndUpdate(
            { _id: req.params.id, "day_by_day._id": req.params.dayId },
            { $push: { "day_by_day.$.times": req.body } },
            { new: true }
        );
        res.status(200).json(timetable);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateTimeSlot = async (req, res) => {
    try {
        const timetable = await Timetable.findOneAndUpdate(
            { 
                _id: req.params.id, 
                "day_by_day._id": req.params.dayId,
                "day_by_day.times._id": req.params.slotId 
            },
            { 
                $set: { "day_by_day.$[day].times.$[slot]": req.body } 
            },
            { 
                arrayFilters: [{ "day._id": req.params.dayId }, { "slot._id": req.params.slotId }],
                new: true 
            }
        );
        res.status(200).json(timetable);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.removeDaySchedule = async (req, res) => {
    try {
        const timetable = await Timetable.findByIdAndUpdate(
            req.params.id,
            { $pull: { day_by_day: { _id: req.params.dayId } } },
            { new: true }
        );
        res.status(200).json(timetable);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removeTimeSlot = async (req, res) => {
    try {
        const timetable = await Timetable.findOneAndUpdate(
            { _id: req.params.id, "day_by_day._id": req.params.dayId },
            { $pull: { "day_by_day.$.times": { _id: req.params.slotId } } },
            { new: true }
        );
        res.status(200).json(timetable);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTimetable = async (req, res) => {
    try {
        await Timetable.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Timetable deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
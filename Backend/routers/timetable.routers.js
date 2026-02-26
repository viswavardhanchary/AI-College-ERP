const express = require('express');
const router = express.Router();
const timetablesControllers = require('../controllers/timetable.controllers');

router.post('/', timetablesControllers.createTimetable);
router.get('/', timetablesControllers.getAllTimetables);
router.get('/search', timetablesControllers.getTimetableByClass);
router.get('/:id', timetablesControllers.getTimetableById);
router.put('/:id', timetablesControllers.updateTimetableMetadata);
router.delete('/:id', timetablesControllers.deleteTimetable);

router.post('/:id/days', timetablesControllers.addDaySchedule);
router.put('/:id/days/:dayId', timetablesControllers.updateDaySchedule);
router.delete('/:id/days/:dayId', timetablesControllers.removeDaySchedule);

router.post('/:id/days/:dayId/slots', timetablesControllers.addSlotToDay);
router.patch('/:id/days/:dayId/slots/:slotId', timetablesControllers.updateTimeSlot);
router.delete('/:id/days/:dayId/slots/:slotId', timetablesControllers.removeTimeSlot);

module.exports = router;
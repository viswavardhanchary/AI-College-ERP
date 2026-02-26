const express = require('express');
const router = express.Router();
const attendanceControllers = require('../controllers/attendance.controllers');

router.post('/', attendanceControllers.createAttendance);
router.get('/', attendanceControllers.getAllAttendances);
router.get('/:id', attendanceControllers.getAttendanceById);
router.get('/student/:studentId', attendanceControllers.getStudentAttendance);
router.put('/:id', attendanceControllers.updateAttendanceMetadata);
router.delete('/:id', attendanceControllers.deleteAttendanceRecord);

router.post('/:id/day', attendanceControllers.addDayEntry);
router.patch('/:id/day/:dayId', attendanceControllers.updateDayEntry);
router.delete('/:id/day/:dayId', attendanceControllers.removeDayEntry);

module.exports = router;
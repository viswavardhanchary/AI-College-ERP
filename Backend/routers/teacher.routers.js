const express = require('express');
const router = express.Router();
const teachersControllers = require('../controllers/teacher.controllers');
const { protectTeacher } = require('../middlewares/teacher.auth.middlewares');

router.post('/', teachersControllers.createTeacher);
router.get('/', teachersControllers.getAllTeachers);
router.get('/:id', teachersControllers.getTeacherById);

router.put('/:id', protectTeacher, teachersControllers.updateTeacherProfile);
router.delete('/:id', protectTeacher, teachersControllers.deleteTeacher);

router.post('/:id/subjects', protectTeacher, teachersControllers.addSubjectHandle);
router.patch('/:id/subjects/:handleId/dates', protectTeacher, teachersControllers.updateSubjectDates);

router.post('/:id/attendance', protectTeacher, teachersControllers.addAttendanceRecord);

router.post('/:id/mentor', protectTeacher, teachersControllers.addMentorGroup);
router.post('/:id/mentor/:mentorId/students', protectTeacher, teachersControllers.addStudentToMentorGroup);

router.post('/:id/payroll', protectTeacher, teachersControllers.addPayrollEntry);
router.patch('/:id/payroll/:payId', protectTeacher, teachersControllers.updatePayrollStatus);

module.exports = router;
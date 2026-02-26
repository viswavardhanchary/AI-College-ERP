const express = require('express');
const router = express.Router();
const studentsControllers = require('../controllers/student.controllers');
const { protectStudent } = require('../middlewares/student.auth.middlewares');

router.post('/', studentsControllers.createStudent);
router.get('/', studentsControllers.getAllStudents);
router.get('/:id', studentsControllers.getStudentById);

router.put('/:id', protectStudent, studentsControllers.updateStudentProfile);
router.delete('/:id', protectStudent, studentsControllers.deleteStudent);

router.post('/:id/events', protectStudent, studentsControllers.registerForEvent);
router.delete('/:id/events/:eventId', protectStudent, studentsControllers.unregisterFromEvent);

router.post('/:id/ai-chat', protectStudent, studentsControllers.addAiChatSession);
router.patch('/:id/academic', protectStudent, studentsControllers.updateAcademicReference);

module.exports = router;
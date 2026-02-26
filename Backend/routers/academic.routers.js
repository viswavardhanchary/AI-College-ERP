const express = require('express');
const router = express.Router();
const academicController = require('../controllers/academic.controllers');

router.post('/', academicController.createAcademic);
router.get('/', academicController.getAllAcademics);
router.get('/student/:studentId', academicController.getAcademicByStudent);
router.delete('/:id', academicController.deleteAcademic);


router.post('/:id/years', academicController.addYear);


router.post('/:id/years/:yearId/subjects', academicController.registerSubject);


router.patch('/:id/years/:yearId/subjects/:subjectObjId', academicController.updateAttendance);

module.exports = router;
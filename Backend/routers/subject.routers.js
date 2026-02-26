const express = require('express');
const router = express.Router();
const subjectsControllers = require('../controllers/subject.controllers');

router.post('/', subjectsControllers.createSubject);
router.get('/', subjectsControllers.getAllSubjects);
router.get('/:id', subjectsControllers.getSubjectById);
router.get('/dept/:dept', subjectsControllers.getSubjectsByDept);
router.get('/college/:collegeId', subjectsControllers.getSubjectsByCollege);
router.put('/:id', subjectsControllers.updateSubject);
router.delete('/:id', subjectsControllers.deleteSubject);

module.exports = router;
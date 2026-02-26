const express = require('express');
const router = express.Router();
const resultsControllers = require('../controllers/result.controllers');

router.post('/', resultsControllers.createResult);
router.get('/', resultsControllers.getAllResults);
router.get('/:id', resultsControllers.getResultById);
router.get('/student/:studentId', resultsControllers.getResultsByStudent);
router.put('/:id', resultsControllers.updateResultMetadata);
router.delete('/:id', resultsControllers.deleteResultRecord);

router.post('/:id/years', resultsControllers.addYearResult);
router.put('/:id/years/:yearId', resultsControllers.updateSemesterInfo);
router.delete('/:id/years/:yearId', resultsControllers.removeYearResult);

router.post('/:id/years/:yearId/subjects', resultsControllers.addRegisteredSubjectToResult);
router.patch('/:id/years/:yearId/subjects/:subjectObjId', resultsControllers.updateSubjectGrade);

module.exports = router;
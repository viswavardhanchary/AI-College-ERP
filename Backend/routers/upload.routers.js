const express = require('express');
const router = express.Router();
const uploadsControllers = require('../controllers/upload.controllers');

router.post('/', uploadsControllers.createUpload);
router.get('/', uploadsControllers.getAllUploads);
router.get('/:id', uploadsControllers.getUploadById);
router.get('/user/:userType/:userId', uploadsControllers.getUploadsByUser);
router.get('/college/:collegeId', uploadsControllers.getUploadsByCollege);
router.put('/:id', uploadsControllers.updateUploadDetails);
router.delete('/:id', uploadsControllers.deleteUpload);

module.exports = router;
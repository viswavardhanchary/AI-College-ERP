const express = require('express');
const router = express.Router();
const collegeControllers = require('../controllers/college.controllers');

router.post('/', collegeControllers.createCollege);
router.get('/', collegeControllers.getAllColleges);
router.get('/:id', collegeControllers.getCollegeById);
router.put('/:id', collegeControllers.updateCollege);
router.delete('/:id', collegeControllers.deleteCollege);

router.post('/:id/address', collegeControllers.addAddress);
router.put('/:id/address/:addressId', collegeControllers.updateAddress);
router.delete('/:id/address/:addressId', collegeControllers.removeAddress);

router.post('/:id/contact', collegeControllers.addContactPerson);
router.put('/:id/contact/:contactId', collegeControllers.updateContactPerson);
router.delete('/:id/contact/:contactId', collegeControllers.removeContactPerson);

module.exports = router;
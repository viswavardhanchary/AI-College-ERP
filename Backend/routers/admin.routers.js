const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controllers');
const { protectAdmin } = require('../middlewares/admin.auth.middlewares');


router.post('/', adminController.createAdmin);

router.get('/', protectAdmin, adminController.getAllAdmins);
router.get('/:id', protectAdmin, adminController.getAdminById);
router.put('/:id', protectAdmin, adminController.updateAdmin);
router.delete('/:id', protectAdmin, adminController.deleteAdmin);


router.post('/:id/attendance', protectAdmin, adminController.addAttendance);


router.post('/:id/payroll', protectAdmin, adminController.addPayrollRecord);
router.patch('/:id/payroll/:payId', protectAdmin, adminController.updatePayrollStatus);

module.exports = router;
const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controllers");
const verify = require('../middlewares/student.auth.middlewares');

router.post('/login' , studentController.studentLogin);

router.post("/add", verify , studentController.createStudent);
router.post("/bulk/add", verify , studentController.bulkCreateStudents);

router.get("/", verify , studentController.getAllStudents);
router.get("/:id", verify , studentController.getStudentById);

router.put("/:id", verify , studentController.updateStudent);
router.patch("/:id", verify , studentController.patchStudent);
router.patch("/toggle-status/:id", verify , studentController.toggleStudentStatus);

router.patch("/soft-delete/:id", verify , studentController.softDeleteStudent);
router.delete("/:id", verify , studentController.deleteStudent);

module.exports = router;

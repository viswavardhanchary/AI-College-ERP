const express = require("express");
const router = express.Router();
const controller = require("../controllers/teacher.controllers");
const verify = require('../middlewares/teacher.auth.middlewares');

router.post('/login' , controller.teacherLogin);

router.post("/", verify , controller.createTeacher);
router.post("/bulk", verify , controller.bulkCreateTeachers);

router.get("/", verify , controller.getAllTeachers);
router.get("/:id", verify , controller.getTeacherById);

router.put("/:id", verify , controller.updateTeacher);
router.patch("/:id", verify , controller.patchTeacher);
router.patch("/toggle-status/:id", verify , controller.toggleTeacherStatus);

router.patch("/add-subject/:id", verify , controller.addSubjectHandle);
router.patch("/mark-attendance/:id", verify , controller.markTeacherAttendance);
router.patch("/add-mentor/:id", verify , controller.addMentorStudents);
router.patch("/add-salary/:id", verify , controller.addSalaryPayment);

router.patch("/soft-delete/:id", verify , controller.softDeleteTeacher);
router.delete("/:id", verify , controller.deleteTeacher);

module.exports = router;

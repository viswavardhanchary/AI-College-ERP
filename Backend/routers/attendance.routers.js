const express = require("express");
const router = express.Router();
const controller = require("../controllers/attendance.controllers");

router.post("/", controller.createAttendance);
router.get("/", controller.getAllAttendance);
router.get("/:id", controller.getAttendanceById);
router.patch("/mark/:id", controller.markAttendance);
router.delete("/:id", controller.deleteAttendance);

module.exports = router;

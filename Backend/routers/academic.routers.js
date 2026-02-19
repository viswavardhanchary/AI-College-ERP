const express = require("express");
const router = express.Router();
const controller = require("../controllers/academic.controllers");

router.post("/", controller.createAcademic);
router.get("/", controller.getAllAcademics);
router.get("/:id", controller.getAcademicById);
router.put("/:id", controller.updateAcademic);
router.patch("/add-year/:id", controller.addYear);
router.delete("/:id", controller.deleteAcademic);

module.exports = router;
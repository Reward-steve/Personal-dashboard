const express = require("express");
const {
  getAllDoctors,
  creatnewDoctor,
} = require("../controllers/doctorsController");
const router = express.Router();

router.route("/").post(creatnewDoctor).get(getAllDoctors);

router.route("/:id").get().put();

module.exports = router;

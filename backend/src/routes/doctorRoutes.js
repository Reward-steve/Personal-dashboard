const express = require("express");
const {
  getAllDoctors,
  creatnewDoctor,
} = require("../controllers/doctorsController");
const router = express.Router();

router.route("/").post(creatnewDoctor).get(getAllDoctors);

module.exports = router;

const express = require("express");
const {
  getAllPatients,
  createnewPatient,
} = require("../controllers/patientsController");

const router = express.Router();

router.route("/").post(createnewPatient).get(getAllPatients);

module.exports = router;

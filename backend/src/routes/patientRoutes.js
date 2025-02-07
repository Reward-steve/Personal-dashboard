const express = require("express");
const {
  getAllPatients,
  createnewPatient,
} = require("../controllers/patientsController");

const router = express.Router();

router.route("/").post(createnewPatient).get(getAllPatients);

router.route("/:id").get().put().delete();
module.exports = router;

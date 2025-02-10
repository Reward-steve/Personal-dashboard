const express = require("express");

const {
  getAllPatients,
  createPatient,
  getPatientById,
  updatePatientById,
  deletePatientById,
} = require("../controllers/patientsController");

const router = express.Router();

router.route("/").post(createPatient).get(getAllPatients);

router
  .route("/:id")
  .get(getPatientById)
  .put(updatePatientById)
  .delete(deletePatientById);

module.exports = router;

const express = require("express");

const { restrict } = require("../middleware/restrict");

const {
  getAllPatients,
  createPatient,
  getPatientById,
  updatePatientById,
  deletePatientById,
} = require("../controllers/patientsController");
const { Protect } = require("../controllers/authController");

const router = express.Router();

router.route("/").get(Protect, getAllPatients).post(createPatient);

router
  .route("/:id")
  .get(getPatientById)
  .patch(updatePatientById)
  .delete(Protect, restrict("admin"), deletePatientById);

module.exports = router;

const express = require("express");
const router = express.Router();

const { restrict } = require("../middleware/restrict");

const {
  getAllDoctors,
  getDoctorById,
  getAllDoctorsBySpecialization,
  createDoctor,
  updateDoctorById,
  deleteDoctorById,
  getDoctorsPatient,
  assignPatientToDoctor,
  unassignPatientFromDoctor,
} = require("../controllers/doctorsController");
const { Protect } = require("../controllers/authController");
const { getAllPatients } = require("../controllers/patientsController");

// Fetch doctors and their details
router.route("/").get(getAllDoctors);

router.route("/patients").get(getAllPatients);

router
  .route("/:id")
  .get(getDoctorById)
  .patch(updateDoctorById)
  .delete(deleteDoctorById);

// Fetch doctors by specialization
router
  .route("/specialization/:specialization")
  .get(getAllDoctorsBySpecialization);

router.route("/assign-patient").post(assignPatientToDoctor);
router.route("/doctor-patients").post(getDoctorsPatient);
router.route("/unassign-patient").post(unassignPatientFromDoctor);

module.exports = router;

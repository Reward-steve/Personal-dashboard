const express = require("express");
const router = express.Router();

const {
  getAllDoctors,
  getDoctorById,
  getAllDoctorsBySpecialization,
  createDoctor,
  updateDoctorById,
  getDoctorsPatient,
  assignPatientToDoctor,
  unassignPatientFromDoctor,
} = require("../controllers/doctorsController");

// Fetch doctors and their details
router.route("/").get(getAllDoctors).post(createDoctor);
router.route("/:id").get(getDoctorById).put(updateDoctorById);

// Fetch doctors by specialization
router
  .route("/specialization/:specialization")
  .get(getAllDoctorsBySpecialization);

router.route("/assign-patient").post(assignPatientToDoctor);
router.route("/doctor-patients").post(getDoctorsPatient);
router.route("/unassign-patient").post(unassignPatientFromDoctor);

module.exports = router;

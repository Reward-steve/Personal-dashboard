const express = require("express");
const router = express.Router();

const {
  getAllDoctors,
  getDoctorById,
  getAllDoctorsBySpecialization,
  createDoctor,
  updateDoctorById,
} = require("../controllers/doctorsController");

// Fetch doctors and their details
router.route("/").get(getAllDoctors).post(createDoctor);
router.route("/:id").get(getDoctorById).put(updateDoctorById);

// Fetch doctors by specialization
router
  .route("/specialization/:specialization")
  .get(getAllDoctorsBySpecialization);

module.exports = router;

const express = require("express");
const { getAllUsers, createAdmin } = require("../controllers/adminController");
const { restrict } = require("../middleware/restrict");

const {
  getAllAppointments,
  deleteAppointment,
  updateAppointment,
} = require("../controllers/appointmentController");
const {
  deleteDoctorById,
  updateDoctorById,
  createDoctor,
} = require("../controllers/doctorsController");
const {
  deletePatientById,
  updatePatientById,
  createPatient,
} = require("../controllers/patientsController");
const { deleteUserById } = require("../controllers/userController");
const { Protect, Register } = require("../controllers/authController");

const router = express.Router();

router.route("/users").get(getAllUsers);

router.route("/appointments").get(getAllAppointments);

router.route("/register/user").post(Register);

router
  .route("/appointment/:id")
  .delete(Protect, restrict("admin"), deleteAppointment)
  .patch(updateAppointment);

module.exports = router;

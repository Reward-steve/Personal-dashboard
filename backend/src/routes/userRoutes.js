const express = require("express");

const { restrict } = require("../middleware/restrict");

const {
  Register,
  Login,
  Protect,
  forgottenPassword,
} = require("../controllers/authController");

const {
  getAllDoctorsBySpecialization,
} = require("../controllers/doctorsController");
const {
  getPatientById,
  createPatient,
  updatePatientById,
  deletePatientById,
  getAllPatients,
} = require("../controllers/patientsController");

const {
  bookAppointment,
  getPatientAppointments,
} = require("../controllers/appointmentController");

const router = express.Router();

router.route("/register").post(Register);

router.route("/login").post(Protect, Login);

router.route("/forgotpassword").post(forgottenPassword);

router
  .route("/:id")
  .get(getPatientById)
  .patch(updatePatientById)
  .delete(Protect, restrict("admin"), deletePatientById);

router.route("/bookappointment").post(bookAppointment);

router.route("/:patientsappointment").get(getPatientAppointments);

router
  .route("/:doctorsappointment/specialization")
  .get(getAllDoctorsBySpecialization);

router
  .route("/")
  .get(Protect, restrict("admin"), getAllPatients)
  .post(createPatient);

module.exports = router;

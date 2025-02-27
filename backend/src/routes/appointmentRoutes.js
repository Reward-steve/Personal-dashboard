const express = require("express");

const { restrict } = require("../middleware/restrict");

const {
  bookAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  getDoctorAppointmentsByFilter,
  getPatientAppointmentsByFilter,
} = require("../controllers/appointmentController");
const { Protect } = require("../controllers/authController");

const router = express.Router();

router.route("/").get(Protect, restrict("admin"), getAllAppointments);

router.route("/book").post(bookAppointment);

router
  .route("/:id")
  .get(getAppointmentById)
  .put(updateAppointment)
  .delete(Protect, restrict("admin", "doctor"), deleteAppointment);

router.route("/patient/:patientId").get(getPatientAppointments);

router.route("/doctor/:doctorId").get(getDoctorAppointments);

router.route("/doctor/filter").get(getDoctorAppointmentsByFilter);

router.route("/patient/filter").get(getPatientAppointmentsByFilter);

module.exports = router;

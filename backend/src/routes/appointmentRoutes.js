const express = require("express");
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

const router = express.Router();

router.route("/").get(getAllAppointments);

router.route("/book").post(bookAppointment);

router
  .route("/:id")
  .get(getAppointmentById)
  .put(updateAppointment)
  .delete(deleteAppointment);

router.route("/patient/:patientId").get(getPatientAppointments);

router.route("/doctor/:doctorId").get(getDoctorAppointments);

router.route("/doctor/filter").get(getDoctorAppointmentsByFilter);

router.route("/patient/filter").get(getPatientAppointmentsByFilter);

module.exports = router;

const express = require("express");
const {
  getDoctersAndPatients,
  deleteDoctorsAndPatientsById,
  updateDoctorAndPatientById,
} = require("../controllers/adminController");

const { getAllAppointments } = require("../controllers/appointmentController");

const router = express.Router();

router.route("/users").get(getDoctersAndPatients);

router.route("/appointments").get(getAllAppointments);

router
  .route("/users/:id")
  .delete(deleteDoctorsAndPatientsById)
  .post(updateDoctorAndPatientById);

module.exports = router;

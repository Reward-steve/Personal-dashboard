const express = require("express");

const {
  bookAppointment,
  getAllAppointments,
  queryBySort,
  scheduleAppointment,
  completeAppointment,
  cancleAppointment,
} = require("../controllers/Appointment");

const { Protect } = require("../middleware/protect");
const { restrict } = require("../middleware/restrict");

const router = express.Router();

router.route("/").get(Protect, restrict("admin"), getAllAppointments);

router.route("/filter").get(queryBySort);

router.route("/book-appointment").post(Protect, bookAppointment);

router
  .route("/schedule-appointment")
  .post(Protect, restrict("admin"), scheduleAppointment);

router
  .route("/complete-appointment")
  .post(Protect, restrict("admin"), completeAppointment);

router
  .route("/cancel-appointment")
  .post(Protect, restrict("admin"), cancleAppointment);

module.exports = router;

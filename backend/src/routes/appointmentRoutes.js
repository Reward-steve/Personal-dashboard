const express = require("express");

const { restrict } = require("../middleware/restrict");

const {
  bookAppointment,
  getAllAppointments,
  queryBySort,
} = require("../controllers/appointmentController");
const { Protect } = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(Protect, restrict("admin"), queryBySort, getAllAppointments);

router.route("/book-appointment").post(Protect, bookAppointment);

module.exports = router;

const express = require("express");

const {
  bookAppointment,
  getAllAppointments,
  queryBySort,
} = require("../controllers/appointmentController");

const { Protect } = require("../middleware/protect");
const { restrict } = require("../middleware/restrict");

const router = express.Router();

router.route("/").get(Protect, restrict("admin"), getAllAppointments);

router.route("/filter").get(queryBySort);

router.route("/book-appointment").post(Protect, bookAppointment);

module.exports = router;

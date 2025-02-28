const express = require("express");
const { getAllUsers } = require("../controllers/adminController");
const { restrict } = require("../middleware/restrict");

const {
  sheduleAppointment,
  cancleAppointment,
} = require("../controllers/appointmentController");

const { Protect, Register } = require("../controllers/authController");

const router = express.Router();

router.route("/users").get(getAllUsers);

router.route("/register/user").post(Register);

router.route("/accept-appointment").post(sheduleAppointment);

router.route("/cancle-appointment").post(cancleAppointment);

module.exports = router;

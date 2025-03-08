const express = require("express");
const { getAllUsers } = require("../controllers/adminController");

const {
  sheduleAppointment,
  cancleAppointment,
} = require("../controllers/appointmentController");

const { deleteAllUsers } = require("../controllers/adminController");

const { Register } = require("../auth/authentications");

const router = express.Router();

router.route("/users").get(getAllUsers);

router.route("/register/user").post(Register);

router.route("/accept-appointment").post(sheduleAppointment);

router.route("/cancle-appointment").post(cancleAppointment);

router.route("/delete").delete(deleteAllUsers);

module.exports = router;

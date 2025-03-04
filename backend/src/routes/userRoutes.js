const express = require("express");

const { restrict } = require("../middleware/restrict");

const {
  Register,
  Login,
  Protect,
  forgottenPassword,
} = require("../controllers/authController");

const {
  getPatientById,
  updatePatientById,
  deletePatientById,
} = require("../controllers/patientsController");

const { bookAppointment } = require("../controllers/appointmentController");

const router = express.Router();

router.route("/register").post(Register);

router.route("/login").post(Login);

router.route("/forgotpassword").post(forgottenPassword);

router
  .route("/:id")
  .get(getPatientById)
  .patch(updatePatientById)
  .delete(Protect, restrict("admin"), deletePatientById);

router
  .route("/bookappointment")
  .post(Protect, restrict("patient"), bookAppointment);

module.exports = router;

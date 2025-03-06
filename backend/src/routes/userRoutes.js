const express = require("express");

const {
  Register,
  Login,
  forgottenPassword,
  resetPassword,
} = require("../auth/authentications");

const { Protect } = require("../middleware/protect");
const { restrict } = require("../middleware/restrict");

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

router.route("/resetpassword/:token").patch(resetPassword);

router
  .route("/:id")
  .get(getPatientById)
  .patch(updatePatientById)
  .delete(Protect, restrict("admin"), deletePatientById);

router
  .route("/bookappointment")
  .post(Protect, restrict("patient"), bookAppointment);

module.exports = router;

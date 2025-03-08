const express = require("express");

const {
  Register,
  Login,
  forgottenPassword,
  resetPassword,
  updatePassword,
  Logout,
} = require("../auth/authentications");

const { Protect } = require("../middleware/protect");
const { restrict } = require("../middleware/restrict");

const {
  getPatientById,
  deletePatientById,
} = require("../controllers/patientsController");

const { bookAppointment } = require("../controllers/appointmentController");

const router = express.Router();

router.route("/register").post(Register);

router.route("/login").post(Login);

router.route("/forgotpassword").post(forgottenPassword);

router.route("/resetpassword/:token").patch(resetPassword);

router.route("/updatepassword").patch(Protect, updatePassword);

router.route("/logout").post(Protect, Logout);

router
  .route("/:id")
  .get(getPatientById)
  .delete(Protect, restrict("admin"), deletePatientById);

router
  .route("/bookappointment")
  .post(Protect, restrict("patient"), bookAppointment);

module.exports = router;

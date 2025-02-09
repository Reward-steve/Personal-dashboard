const express = require("express");
const { Register, Login } = require("../controllers/authController");
const {
  getAllPatients,
  createPatient,
  getPatientById,
  updatePatientById,
  deletePatientById,
} = require("../controllers/patientsController");

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);

router.route("/").post(createPatient).get(getAllPatients);

router
  .route("/:id")
  .get(getPatientById)
  .put(updatePatientById)
  .delete(deletePatientById);

module.exports = router;

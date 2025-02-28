const express = require("express");

const { restrict } = require("../middleware/restrict");
const { getPatientNotification } = require("../controllers/notifyController");

const {
  getAllPatients,
  updatePatientById,
  deletePatientById,
} = require("../controllers/patientsController");
const { Protect } = require("../controllers/authController");

const router = express.Router();

router.route("/").get(Protect, getAllPatients);

router.route("/notification").get(getPatientNotification);

router
  .route("/:id")
  .patch(updatePatientById)
  .delete(Protect, restrict("admin"), deletePatientById);

module.exports = router;

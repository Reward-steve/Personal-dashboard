const express = require("express");

const { getPatientNotification } = require("../controllers/notifyController");

const {
  getAllPatients,
  updatePatientById,
  deletePatientById,
} = require("../controllers/patientsController");

const { Protect } = require("../middleware/protect");
const { restrict } = require("../middleware/restrict");

const router = express.Router();

router.route("/").get(Protect, getAllPatients);

router.route("/notification").get(getPatientNotification);

router
  .route("/:id")
  .patch(updatePatientById)
  .delete(Protect, restrict("admin"), deletePatientById);

module.exports = router;

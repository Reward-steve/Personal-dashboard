const express = require("express");

const { getPatientNotification } = require("../controllers/Notification");

const {
  getAllPatients,
  updatePatientById,
  deletePatientById,
  getPatientById,
} = require("../controllers/Patient");

const { Protect } = require("../middleware/protect");
const { restrict } = require("../middleware/restrict");

const router = express.Router();

router.route("/").get(Protect, getAllPatients);

router.route("/notification").get(getPatientNotification);

router
  .route("/:id")
  .get(getPatientById)
  .put(updatePatientById)
  .delete(Protect, restrict("admin"), deletePatientById);

module.exports = router;

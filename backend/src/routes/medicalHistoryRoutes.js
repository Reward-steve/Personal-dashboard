const express = require("express");
const router = express.Router();
const {
  createMedicalRecord,
  getMedicalRecordsByPatient,
  getMedicalRecordsByDoctor,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord,
} = require("../controllers/medicalHistoryController");

// ✅ Create a new medical history record
router.route("/").post(createMedicalRecord);

// ✅ Get all medical records for a specific patient
router.route("/patient/:patientId").get(getMedicalRecordsByPatient);

// ✅ Get all medical records for a specific doctor
router.route("/doctor/:doctorId").get(getMedicalRecordsByDoctor);

// ✅ Get, update, or delete a specific medical history record by ID
router
  .route("/:id")
  .get(getMedicalRecordById)
  .put(updateMedicalRecord)
  .delete(deleteMedicalRecord);

module.exports = router;

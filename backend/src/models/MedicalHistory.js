const mongoose = require("mongoose");

const medicalHistorySchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  diagnosis: {
    type: String,
    required: true,
  },
  treatments: [String],
  medications: [String],
  visitDate: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MedicalHistory = mongoose.model("MedicalHistory", medicalHistorySchema);
module.exports = MedicalHistory;

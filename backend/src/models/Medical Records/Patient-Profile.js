const PatientProfileSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  AppointmentHistory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  PrescriptionHistory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Prescription",
    required: true,
  },
  MedicalHistory: {
    type: mongoose.Schema.Type.ObjectId,
    ref: "MedicalHistory",
  },

  LastCheckIn: { type: String, required: true },
  Dept: { type: String, required: true },
  PatientNr: { type: String, required: true },
});
module.exports = mongoose.model("Prescription", PatientProfileSchema);

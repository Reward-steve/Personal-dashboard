const DiagnosisSchema = new mongoose.Schema({
  DoctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  PatientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  symptoms: String,
  note: String,
});
module.exports = mongoose.model("Diagnosis", DiagnosisSchema);

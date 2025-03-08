const PrescriptionSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  medicine: { type: String, required: true },
  dosage: { type: String, required: true },
});
module.exports = mongoose.model("Prescription", PrescriptionSchema);

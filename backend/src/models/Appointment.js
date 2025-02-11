const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
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
  appointmentDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Canceled"],
    default: "Scheduled",
  },
  timeSlot: {
    type: String,
    default: "Morning",
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;

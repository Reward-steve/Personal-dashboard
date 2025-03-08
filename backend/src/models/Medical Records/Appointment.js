const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  bookAppointment: {
    type: Boolean,
    default: false,
  },
  department: {
    type: String,
    enum: [
      "General Department",
      "Surgical Departments",
      "Medical Departments",
      "Emergency",
      "Intensive-Care Departments",
      "Pediatric Departments",
      "Obstetrics",
      "Gynecology (OB-GYN)",
      "Mental Health",
      "Neurology",
      "Oncology (Cancer Treatment)",
      "Infectious Diseases",
      "Radiology & Imaging",
      "Pathology & Laboratory Medicine",
      "Physical Medicine & Rehabilitation",
      "Ophthalmology (Eye Care)",
      "Urology",
      "Otolaryngology (ENT - Ear, Nose, Throat)",
    ],
    default: "General Department",
  },
  status: {
    type: String,
    enum: ["Pending", "Scheduled", "Completed", "Canceled"],
    default: "Pending",
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;

const mongoose = require("mongoose");
const User = require("./User");

const patientSchema = new mongoose.Schema({
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  age: { type: Number, required: true },
  phone: String,
  address: {
    city: String,
    country: String,
  },
  emergencyContact: {
    name: String,
    phone: String,
  },
  insuranceId: { type: mongoose.Schema.Types.ObjectId, ref: "Insurance" },
  patientID: {
    type: Number,
  },
  medicalHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MedicalHistory",
    },
  ],
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  prescriptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prescription",
    },
  ],
});

const Patient = User.discriminator("Patient", patientSchema);
module.exports = Patient;

const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  experience: {
    type: Number, // Number of years
    required: true,
  },
  qualifications: [String], // List of degrees/certifications
  availability: {
    days: [String], // ["Monday", "Wednesday", "Friday"]
    timeSlots: [String], // ["10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"]
  },
  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
  ],
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  salary: {
    amount: Number,
    currency: {
      type: String,
      default: "USD",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;

const mongoose = require("mongoose");
const User = require("./User");

const doctorSchema = new mongoose.Schema({
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
});

const Doctor = User.discriminator("Doctor", doctorSchema);
module.exports = Doctor;

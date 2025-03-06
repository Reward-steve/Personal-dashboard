const mongoose = require("mongoose");

const {
  PreSave,
  createPasswordResetToken,
  changedPasswordAfter,
} = require("../utils/SchemaMethods");

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
  password: {
    type: String,
    required: [true, "A password is required"],
    minlength: [8, "A password must have more than or equal to 8 characters"],
    maxlength: [60, "A password must have less than or equal to 60 characters"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "A password confirmation is required"],
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
  role: String,
  passwordChangedAt: Date,
  passwordResetToken: String,
  resetTokenExp: Date,
});

doctorSchema.pre(/^find/, function (next) {
  this.populate("patients"); // Auto-populate patients whenever you query doctors
  next();
});

doctorSchema.pre("save", PreSave);
doctorSchema.methods.changedPasswordAfter = changedPasswordAfter;
doctorSchema.methods.createPasswordResetToken = createPasswordResetToken;

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;

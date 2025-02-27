const mongoose = require("mongoose");
const validate = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

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
    required: true,
    minlength: 6,
    select: false,
  },

  confirmPassword: {
    type: String,
    default: this.password,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordResetToken: String,
  resetTokenExp: Date,
});

doctorSchema.pre(/^find/, function (next) {
  this.populate("patients"); // Auto-populate patients whenever you query doctors
  next();
});

doctorSchema.pre("save", async function (next) {
  // only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 10);

  // delete passwordConfirm field
  this.confirmPassword = undefined;
  next();
});

doctorSchema.methods.changedPasswordAfter = function (timestamp) {
  if (this.createdAt) {
    const createdAt = parseInt(this.createdAt.getTime() / 1000, 10);
    return createdAt > timestamp;
  }
};

doctorSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("shake256")
    .update(resetToken)
    .digest("hex");

  this.resetTokenExp = Date.now() + 10 * 60 * 1000;

  console.log("doctor:", { resetToken });

  return resetToken;
};

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;

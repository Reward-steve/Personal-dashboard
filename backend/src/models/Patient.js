const mongoose = require("mongoose");
const validate = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const patientSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  phone: String,
  email: {
    type: String,
    // required: true,
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
    // required: [true, "Please confirm passord"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "This Password {{value}} do not match",
    },
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
  },
  emergencyContact: {
    name: String,
    relation: String,
    phone: String,
  },
  medicalHistory: {
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    allergies: [String],
    pastDiseases: [String],
    chronicConditions: [String],
    medications: [String],
    vaccinations: [String],
  },
  // ✅ Instead of embedding doctor visits, store references to MedicalHistory
  medicalRecords: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MedicalHistory",
    },
  ],
  doctors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
  ],
  labTests: [
    {
      testName: String,
      testDate: {
        type: Date,
        default: Date.now,
      },
      result: String,
      labTechnicianId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LabTechnician",
      },
    },
  ],
  billingInfo: {
    insuranceProvider: String,
    policyNumber: String,
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Unpaid"],
      default: "Pending",
    },
  },
  admissionDetails: {
    admitted: {
      type: Boolean,
      default: false,
    },
    roomNumber: String,
    admittedOn: Date,
    dischargedOn: Date,
  },
  role: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordChangedAt: Date,
  patientID: {
    type: Number,
  },
  passwordResetToken: String,
  resetTokenExp: Date,
});

patientSchema.pre("save", async function (next) {
  // only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 10);

  // delete passwordConfirm field
  this.confirmPassword = undefined;
  next();
});

// check if password has been changed
patientSchema.methods.changedPasswordAfter = function (timestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return timestamp < changedTimestamp;
  }
};

patientSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("shake256")
    .update(resetToken)
    .digest("hex");

  this.resetTokenExp = Date.now() + 10 * 60 * 1000;

  console.log("patient:", { resetToken });
  return resetToken;
};

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;

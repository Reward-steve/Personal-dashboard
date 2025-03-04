const mongoose = require("mongoose");
const {
  PreSave,
  changedPasswordAfter,
  createPasswordResetToken,
} = require("../utils/SchemaMethods");

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
    required: [true, "A password is required"],
    minlength: [8, "A password must have more than or equal to 8 characters"],
    maxlength: [60, "A password must have less than or equal to 60 characters"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "A password confirmation is required"],
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

patientSchema.pre("save", PreSave);
patientSchema.methods.changedPasswordAfter = changedPasswordAfter;
patientSchema.methods.createPasswordResetToken = createPasswordResetToken;

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;

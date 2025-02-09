const mongoose = require("mongoose");

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
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Indexing for better performance
// patientSchema.index({ phone: 1, email: 1 });

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;

const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of birth is required. Date formate: YYYY-MM-DD"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  contactInfo: {
    phone: {
      type: String,
      required: [true, "Phone number is required. Format: +123-456-7890"],
    },
    email: {
      type: String,
      required: [true, "Email is required. Format: example@example.com"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
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
  doctorVisits: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
      },
      diagnosis: String,
      treatment: String,
      prescription: [String],
      notes: String,
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

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;

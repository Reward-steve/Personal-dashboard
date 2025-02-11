const MedicalHistory = require("../models/MedicalHistory");
const Patient = require("../models/Patient");
const catchAsync = require("../utils/catchAsync");
const handleNoResult = require("../utils/handleNoResult");
const handleNotFound = require("../utils/handleNotFound");

exports.getAllMedicalRecord = catchAsync(async (req, res, next) => {
  const medicalRecords = await MedicalHistory.find({});
  handleNoResult(medicalRecords, "No medical records found", next);
  res.status(200).json({
    status: "success",
    result: medicalRecords.length,
    data: { medicalRecords },
  });
});

// ✅ Create a new medical record
exports.createMedicalRecord = catchAsync(async (req, res, next) => {
  // Extract patientId from the request body
  const { patientId, doctorId, diagnosis, treatments, medications, notes } =
    req.body;

  // Check if patient exists
  const patient = await Patient.findById(patientId);
  handleNotFound(patient, "Patient not found", next);

  // Create and save the medical history record
  const newRecord = await MedicalHistory.create({
    patientId,
    doctorId,
    diagnosis,
    treatments,
    medications,
    notes,
  });

  // Add the record reference to the patient
  patient.medicalRecords.push(newRecord._id);
  await patient.save();

  res.status(201).json({
    status: "success",
    message: "Medical record created successfully",
    data: {
      newRecord,
    },
  });
});

// ✅ Get all medical records for a specific patient
exports.getMedicalRecordsByPatient = catchAsync(async (req, res, next) => {
  const { patientId } = req.params;

  const records = await MedicalHistory.find({ patientId }).populate(
    "doctorId",
    "fullName"
  );

  handleNoResult(records, "No medical records found for this patient", next);

  res.status(200).json({
    status: "success",
    message: "Medical records retrieved successfully",
    result: records.length,
    data: { records },
  });
});

// ✅ Get all medical records created by a specific doctor
exports.getMedicalRecordsByDoctor = catchAsync(async (req, res, next) => {
  const { doctorId } = req.params;

  const records = await MedicalHistory.find({ doctorId }).populate(
    "patientId",
    "fullName"
  );

  handleNoResult(records, "No medical records found for this doctor", next);

  res.status(200).json({
    status: "success",
    message: "Medical records retrieved successfully",
    result: records.length,
    data: { records },
  });
});

// ✅ Get a single medical history record by ID
exports.getMedicalRecordById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const record = await MedicalHistory.findById(id)
    .populate("patientId", "fullName")
    .populate("doctorId", "fullName");

  if (record === null) {
    return res.status(404).json({
      status: "error",
      message: "Invalid ID provided",
    });
  }

  handleNotFound(record, "Medical record not found", next);

  res.status(200).json({
    status: "success",
    message: "Medical record retrieved successfully",
    data: { record },
  });
});

// ✅ Update a medical record
exports.updateMedicalRecord = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const updatedRecord = await MedicalHistory.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  handleNotFound(updatedRecord, "Medical record not found", next);

  res.status(200).json({
    status: "success",
    message: "Medical record updated successfully",
    updatedRecord,
  });
});

// ✅ Delete a medical record
exports.deleteMedicalRecord = catchAsync(async (req, res) => {
  const { id } = req.params;

  const record = await MedicalHistory.findByIdAndDelete(id);

  handleNotFound(record, "Medical record not found", next);

  // Remove the record reference from the patient's document
  await Patient.findByIdAndUpdate(record.patientId, {
    $pull: { medicalRecords: id },
  });

  res.status(204).json({
    status: "success",
    message: "Medical record deleted successfully",
  });
});

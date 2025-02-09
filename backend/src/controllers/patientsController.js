const Patient = require("../models/Patient");
const catchAsync = require("../utils/catchAsync");
const handleNotFound = require("../utils/handleNotFound");
const handleNoResult = require("../utils/handleNoResult");

exports.getAllPatients = catchAsync(async (req, res, next) => {
  const patients = await Patient.find({});
  handleNoResult(patients, "No patients found", next);

  res.status(200).json({
    status: "success",
    result: patients.length,
    data: { patients },
  });
});

exports.createPatient = catchAsync(async (req, res) => {
  cosole.log("Request.body:", req.body);

  const newPatient = await Patient.create(req.body);

  res.status(201).json({
    status: "success",
    message: "New patient created successfully",
    data: { newPatient },
  });
});

exports.getPatientById = catchAsync(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id);
  handleNotFound(patient, `No patient with ID ${req.params.id} found`, next);

  res.status(200).json({
    status: "success",
    data: { patient },
  });
});

exports.updatePatientById = catchAsync(async (req, res, next) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  handleNotFound(patient, `No patient with ID ${req.params.id} found`, next);

  res.status(200).json({
    status: "success",
    message: "Patient updated successfully",
    data: { patient },
  });
});

exports.deletePatientById = catchAsync(async (req, res, next) => {
  const patient = await Patient.findByIdAndDelete(req.params.id);
  handleNotFound(patient, `No patient with ID ${req.params.id} found`, next);

  res.status(204).json({
    status: "success",
    message: "Patient deleted successfully",
  });
});

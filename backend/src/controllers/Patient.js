const Patient = require("../models/Patient");

const {
  catchAsync,
  handleNoResult,
  handleNotFound,
} = require("../utils/reusableFunctions");

exports.getAllPatients = catchAsync(async (req, res, next) => {
  const patients = await Patient.find({});
  handleNoResult(patients, "No patients found", next);

  res.status(200).json({
    status: "success",
    result: patients.length,
    data: {
      patients,
    },
  });
});

exports.createPatient = catchAsync(async (req, res) => {
  const newPatient = await Patient.create(req.body);

  res.status(201).json({
    status: "success",
    message: "New patient created successfully",
    data: { newPatient },
  });
});

exports.getPatientById = catchAsync(async (req, res, next) => {
  const { patientID } = req.body;
  const patient = await Patient.findOne({ patientID });
  handleNotFound(patient, `No patient with ID ${patientID} found`, next);

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
    patient,
  });
});

exports.deletePatientById = catchAsync(async (req, res, next) => {
  const patient = await Patient.find(req.params.id);
  handleNotFound(patient, `No patient with ID ${req.params.id} found`, next);

  res.status(204).json({
    status: "success",
    message: "Patient deleted successfully",
  });
});

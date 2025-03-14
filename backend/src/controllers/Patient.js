const Patient = require("../models/UserModels/Patient");

const {
  catchAsync,
  handleNoResult,
  handleNotFound,
  findAndUpdate,
  sendResponse,
} = require("../Utils/reusableFunctions");

exports.getAllPatients = catchAsync(async (req, res, next) => {
  const patients = await Patient.find();

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

  sendResponse(
    res,
    201,
    "success",
    "New patient created successfully",
    newPatient
  );
});

exports.getPatientById = catchAsync(async (req, res, next) => {
  const { patientID } = req.body;
  const patient = await Patient.findOne({ patientID });
  handleNotFound(patient, `No patient with ID ${patientID} found`, next);

  sendResponse(res, 200, "success", "patient retrieved successfully", patient);
});

exports.updatePatientById = catchAsync(async (req, res, next) => {
  const { id } = req.params.id;

  const patient = await findAndUpdate(Patient, id, req.body);

  handleNotFound(patient, `No patient with ID ${req.params.id} found`, next);

  sendResponse(res, 200, "success", "Patient updated successfully", patient);
});

exports.deletePatientById = catchAsync(async (req, res, next) => {
  const patient = await Patient.find(req.params.id);
  handleNotFound(patient, `No patient with ID ${req.params.id} found`, next);

  sendResponse(res, 204, "success", "Patient deleted successfully");
});

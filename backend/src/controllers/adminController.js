const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const handleNoResult = require("../utils/handleNoResult");
const handleNotFound = require("../utils/handleNotFound");

exports.getDoctersAndPatients = catchAsync(async (req, res, next) => {
  const doctor = await User.find({ role: "doctor" });
  const patient = await User.find({ role: "patient" });

  handleNoResult(doctor, "No doctors found", next);
  handleNoResult(patient, "No patients found", next);

  res.status(200).json({
    status: "success",
    message: "Doctors and patients retrieved successfully",
    results: {
      doctors: doctor.length,
      patients: patient.length,
    },
    data: {
      doctors: doctor,
      patients: patient,
    },
  });
});

exports.deleteDoctorsAndPatientsById = catchAsync(async (req, res, next) => {
  const doctor = await User.findByIdAndDelete(req.params.id);
  const patient = await User.findByIdAndDelete(req.params.id);

  handleNotFound(doctor, `Doctor not found with id of ${req.params.id} `, next);
  handleNotFound(
    patient,
    `Patient not found with id of ${req.params.id} `,
    next
  );

  res.status(204).json({
    status: "success",
    message: doctor
      ? "Doctor deleted successfully"
      : "Patient deleted successfully",
  });
});

exports.updateDoctorAndPatientById = catchAsync(async (req, res, next) => {
  const doctor = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  const patient = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  handleNotFound(doctor, `Doctor not found with id of ${req.params.id} `, next);
  handleNotFound(
    patient,
    `Patient not found with id of ${req.params.id} `,
    next
  );
  res.status(200).json({
    status: "success",
    message: doctor
      ? "Doctor updated successfully"
      : "Patient updated successfully",
    data: {
      updatedDoctor: doctor ? doctor : null,
      updatedPatient: patient ? patient : null,
    },
  });
});

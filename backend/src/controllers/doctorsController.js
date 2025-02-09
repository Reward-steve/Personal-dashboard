const Doctor = require("../models/Doctor.js");
const catchAsync = require("../utils/catchAsync");
const handleNotFound = require("../utils/handleNotFound");
const handleNoResult = require("../utils/handleNoResult");

exports.getAllDoctors = catchAsync(async (req, res, next) => {
  const doctors = await Doctor.find({});

  if (doctors.length === 0) {
    return handleNoResult(res, "No doctors found");
  }

  res.status(200).json({
    status: "success",
    result: doctors.length,
    data: { doctors },
  });
});

exports.getDoctorById = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);
  handleNotFound(doctor, `No doctor with ID ${req.params.id} found.`);

  res.status(200).json({
    status: "success",
    data: { doctor },
  });
});

exports.getAllDoctorsBySpecialization = catchAsync(async (req, res, next) => {
  const doctors = await Doctor.find({
    specialization: req.params.specialization,
  });

  if (doctors.length === 0) {
    return handleNoResult(res, "No doctors found with this specialization");
  }

  res.status(200).json({
    status: "success",
    result: doctors.length,
    data: { doctors },
  });
});

exports.createDoctor = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Doctor created successfully",
    data: { doctor },
  });
});

exports.updateDoctorById = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  handleNotFound(doctor, `No doctor with ID ${req.params.id} found.`);

  res.status(200).json({
    status: "success",
    message: "Doctor updated successfully",
    data: { doctor },
  });
});

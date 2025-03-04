const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Admin = require("../models/Admin");

const { catchAsync } = require("../utils/reusableFunctions");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.find({});
  const patient = await Patient.find({});
  const admin = await Admin.find({});

  res.status(200).json({
    status: "success",
    message: "Doctors and patients retrieved successfully",
    results: {
      doctors: doctor.length,
      patients: patient.length,
      admins: admin.length,
      allSignedIn: (doctor.length + patient.length + admin.length) * 1,
    },
    data: {
      doctors: doctor.length === 0 ? "No doctor found" : doctor,
      patients: patient.length === 0 ? "No patient found" : patient,
      admin: admin.length === 0 ? "No admin found" : admin,
    },
  });
});

exports.deleteAllUsers = catchAsync(async (req, res, next) => {
  const user =
    (await Doctor.find()) || (await Patient.find()) || (await Admin.find());
});

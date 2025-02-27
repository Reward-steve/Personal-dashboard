const User = require("../models/User");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Admin = require("../models/Admin");
const catchAsync = require("../utils/catchAsync");
const handleNoResult = require("../utils/handleNoResult");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const user = await User.find({});
  const doctor = await Doctor.find({});
  const patient = await Patient.find({});
  const admin = await Admin.find({});

  res.status(200).json({
    status: "success",
    message: "Doctors and patients retrieved successfully",
    results: {
      doctors: doctor.length,
      patients: patient.length,
      users: user.length,
      admins: admin.length,
      allSignedIn:
        (doctor.length + patient.length + user.length + admin.length) * 1,
    },
    data: {
      doctors: doctor.length === 0 ? "No doctor found" : doctor,
      patients: patient.length === 0 ? "No patient found" : patient,
      user: user.length === 0 ? "No user found" : user,
      admin: admin.length === 0 ? "No admin found" : admin,
    },
  });
});

exports.createAdmin = catchAsync(async (req, res, next) => {
  const newAdmin = await Admin.create(req.body);

  res.status(201).json({
    status: "success",
    message: "New admin created successfully",
    newAdmin,
  });
});

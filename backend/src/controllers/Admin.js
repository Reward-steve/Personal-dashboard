const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const User = require("../models/User");

const { catchAsync } = require("../utils/reusableFunctions");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.find({});
  const patient = await Patient.find({});
  const user = await User.find({});

  res.status(200).json({
    status: "success",
    message: "Doctors and patients retrieved successfully",
    results: {
      doctors: doctor.length,
      patients: patient.length,
      users: user.length,
      allSignedIn: (doctor.length + patient.length + user.length) * 1,
    },
    data: {
      doctors: doctor.length === 0 ? "No doctor found" : doctor,
      patients: patient.length === 0 ? "No patient found" : patient,
      user: user.length === 0 ? "No user found" : user,
    },
  });
});

exports.deleteAllUsers = catchAsync(async (req, res, next) => {
  const users =
    (await Doctor.find()) || (await Patient.find()) || (await User.find());

  users.delete();
  users.save();
  res.stat;
});

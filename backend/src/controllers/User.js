const User = require("../models/UserModels/User");
const Admin = require("../models/UserModels/Admin");
const Doctor = require("../models/UserModels/Doctor");
const LabTechnician = require("../models/UserModels/LabTechnician");
const Pharmacist = require("../models/UserModels/Pharmacist");
const Nurse = require("../models/UserModels/Nurse");
const Patient = require("../models/UserModels/Patient");

const {
  catchAsync,
  handleNotFound,
  handleNoResult,
  findAndUpdate,
} = require("../Utils/reusableFunctions");

//GET USER BY ID
const getUserById = catchAsync(async (req, res, next) => {
  const { userId } = req.params.id;

  const user =
    (await User.findById({ userId })) ||
    (await Admin.findById({ userId })) ||
    (await Doctor.findById({ userId })) ||
    (await LabTechnician.findById({ userId })) ||
    (await Pharmacist.findById({ userId })) ||
    (await Nurse.findById({ userId })) ||
    (await Patient.findById({ userId }));

  handleNoResult(user, "No users found", next);

  res.status(200).json({
    status: "success",
    result: user.length,
    data: { users: user },
  });
});

//UPDATE USER BY ID
const updateUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params.id;
  const user =
    (await findAndUpdate(User, id, req.body)) ||
    (await findAndUpdate(Admin, id, req.body)) ||
    (await findAndUpdate(Doctor, id, req.body)) ||
    (await findAndUpdate(LabTechnician, id, req.body)) ||
    (await findAndUpdate(Pharmacist, id, req.body)) ||
    (await findAndUpdate(Nurse, id, req.body)) ||
    (await findAndUpdate(Patient, id, req.body));

  handleNotFound(user, `No user with ID ${req.params.id} found`, next);

  res.status(201).json({
    status: "success",
    user,
  });
});

//DELETE USER BY ID
const deleteUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params.id;
  const user =
    (await User.findByIdAndDelete(id)) ||
    (await Admin.findByIdAndDelete(id)) ||
    (await Doctor.findByIdAndDelete(id)) ||
    (await LabTechnician.findByIdAndDelete(id)) ||
    (await Pharmacist.findByIdAndDelete(id)) ||
    (await Nurse.findByIdAndDelete(id)) ||
    (await Patient.findByIdAndDelete(id));

  handleNotFound(user, `No user with ID ${id} found`, next);

  res.status(204).json({
    status: "success",
    message: "user deleted successfully",
  });
});

module.exports = {
  getUserById,
  updateUserById,
  deleteUserById,
};

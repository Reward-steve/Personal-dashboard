const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const handleNoResult = require("../utils/handleNoResult");
const handleNotFound = require("../utils/handleNotFound");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const user = await User.find();

  handleNoResult(user, "No users found", next);

  res.status(200).json({
    status: "success",
    result: user.length,
    data: { users: user },
  });
});

exports.updateUserById = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  handleNotFound(user, `No user with ID ${req.params.id} found`, next);
  console.log(user);

  res.status(201).json({
    status: "success",
    user,
  });
});

exports.deleteUserById = catchAsync(async (req, res, next) => {
  const user = User.findByIdAndDelete(req.params.id);

  handleNotFound(user, `No user with ID ${req.params.id} found`, next);

  res.status(204).json({
    status: "success",
    message: "user deleted successfully",
  });
});

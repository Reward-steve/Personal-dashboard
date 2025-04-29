const User = require("../models/UserModels/User");

const {
  catchAsync,
  handleNotFound,
  handleNoResult,
} = require("../Utils/reusableFunctions");

//GET USER BY ID
const getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById({ id });
  handleNoResult(user, "No users found", next);

  res.status(200).json({
    status: "success",
    result: user.length,
    user,
  });
});

//UPDATE USER BY ID
const updateUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: false,
  });

  handleNotFound(user, `No user with ID ${req.params.id} found`, next);

  res.status(201).json({
    status: "success",
    user,
  });
});

//DELETE USER BY ID
const deleteUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

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

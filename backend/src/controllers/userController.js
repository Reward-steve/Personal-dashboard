const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const handleNoResult = require("../utils/handleNoResult");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const user = await User.find();

  handleNoResult(user, "No users found", next);

  res.status(200).json({
    status: "success",
    result: user.length,
    data: { users: user },
  });
});

const User = require("../models/User.js");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const SignToken = require("../utils/SignToken.js");

exports.Register = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  const token = SignToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
});

exports.Login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.find({ email: email }).select("+password");

  // check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // check if user exit and password is correct
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError("Incorect Email or Password", 401));
  }

  //send token to client if OK
  const token = SignToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

// exports.protect = catchAsync(async (req, res, next) => {
//   //get token and check if it exist
//   if (req.header.authorization) {
//     console.log(req.header.authorization);
//   }
// });

const { promisify } = require("node:util");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");
const SignToken = require("../utils/SignToken.js");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/User.js");
const Admin = require("../models/Admin.js");
const Doctor = require("../models/Doctor.js");
const Patient = require("../models/Patient.js");

exports.Register = catchAsync(async (req, res, next) => {
  const { fullName, email, password, role, phone, specialization, department } =
    req.body;

  // check if email already exists in the database. with an array of Promise
  // If found, return an error message. Otherwise, continue with registration.

  const existingUser = await Promise.all([
    User.findOne({ email }),
    Patient.findOne({ email }),
    Doctor.findOne({ email }),
    Admin.findOne({ email }),
  ]);

  if (existingUser.some((user) => user)) {
    return next(new AppError("Email already in use", 400));
  }

  // Save new user in the database. According to the role, save additional user details.
  let newUser;

  if (role === "user") {
    newUser = await User.create({
      fullName,
      email,
      password,
      role,
    });
  } else if (role === "patient") {
    newUser = await Patient.create({
      fullName,
      email,
      password,
      phone,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      address: req.body.address,
      emergencyContact: req.body.emergencyContact,
      role,
    });
  } else if (role === "doctor") {
    newUser = await Doctor.create({
      fullName,
      email,
      password,
      phone,
      specialization,
      department,
      experience: req.body.experience,
      qualifications: req.body.qualifications,
      availability: req.body.availability,
      salary: req.body.salary,
      role,
    });
  } else if (role === "admin") {
    newUser = await Admin.create({
      fullName,
      email,
      password,
      role,
    });
  } else return next(new AppError("Invalid role specified", 400));

  // Generate and send JWT token to the client.
  const token = SignToken(newUser._id);

  // return success response once registration is completed.
  res.status(201).json({
    status: "success",
    message: "Registration successful",
    token,
    data: {
      newUser,
      role: newUser.role,
    },
  });
});

exports.Login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // Check all role-based collections for user
  const user =
    (await User.findOne({ email: email }).select("+password")) ||
    (await Patient.findOne({ email: email }).select("+password")) ||
    (await Doctor.findOne({ email: email }).select("+password")) ||
    (await Admin.findOne({ email: email }).select("+password"));

  // check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log(password, user.password);

  if (!user || !isMatch) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // Generate and send JWT token to the client.
  const token = SignToken(user._id);

  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  // Extract token from Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in. Please login to get access", 401)
    );
  }

  // verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Find user in any role-based collection
  const currentUser =
    (await User.findById(decoded.id)) ||
    (await Patient.findById(decoded.id)) ||
    (await Doctor.findById(decoded.id)) ||
    (await Admin.findById(decoded.id));

  if (!currentUser) {
    next(new AppError("The User belonging to this token does not exist", 401));
  }
  // check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    next(
      new AppError("User recently changed password. Please Login again", 401)
    );
  }

  // grant access to protected route
  req.user = currentUser;
});

exports.restrict = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(
        new AppError("You do not have permission to access this route", 403)
      );
    }
    next();
  };
};

// exports.forgotPassword = catchAsync(async (req, res, next) => {
//   // get user based on posted email
//   const user = await User.findOne({ email: req.body.email });

//   if (!user) {
//     return next(new AppError("There is no email with user address.", 404));
//   }
//   // generate random reset token

//   const resetToken = user.createPasswordResetToken();
//   await user.save({ validateBeforeSave: false });
//   // send it to user's email

//   // const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
//   res.status(200).json({
//     status: "success",
//     resetToken,
//   });
// });

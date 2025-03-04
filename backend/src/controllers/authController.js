const { promisify } = require("node:util");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const SignToken = require("../utils/SignToken.js");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/User.js");
const Admin = require("../models/Admin.js");
const Doctor = require("../models/Doctor.js");
const Patient = require("../models/Patient.js");
const handleNotFound = require("../utils/handleNotFound.js");

exports.Register = catchAsync(async (req, res, next) => {
  const {
    fullName,
    email,
    password,
    role = "patient", //default role
    phone,
    specialization,
    department,
  } = req.body;

  // check if email already exists in the database.
  const existingUser = await Promise.all([
    Patient.findOne({ email }),
    Doctor.findOne({ email }),
    Admin.findOne({ email }),
  ]);

  if (existingUser.some((user) => user)) {
    return next(new AppError("Email already in use", 400));
  }

  // Save new user in the database. According to the role, save additional user details.
  let newUser;
  if (role === "patient") {
    const patientId = await Patient.find(); // create patient ID
    newUser = await Patient.create({
      fullName,
      email,
      password,
      phone,
      patientID: (patientId.length + 1) * 1, // set patient ID
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
  } else {
    next();
  }

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

  // check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // Check all role-based collections for user
  const user =
    (await Patient.findOne({ email }).select("+password")) ||
    (await Doctor.findOne({ email }).select("+password")) ||
    (await Admin.findOne({ email }).select("+password"));

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch || !user) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // Generate and send JWT token to the client.
  const token = SignToken(user._id);

  res.status(200).json({
    status: "success",
    token,
  });
});

//Protected middleware to allow access to only authorized users
exports.Protect = catchAsync(async (req, res, next) => {
  let token;
  // Extract token from Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //check if token is found
  if (!token) {
    return next(
      new AppError("You are not logged in. Please login to get access", 401)
    );
  }

  // verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Find user in any role-based collection
  const currentUser =
    (await Patient.findById(decoded.id)) ||
    (await Doctor.findById(decoded.id)) ||
    (await Admin.findById(decoded.id));

  if (!currentUser)
    return next(
      new AppError("The User belonging to this token does not exist", 401)
    );

  console.log(currentUser.changedPasswordAfter(decoded.iat));
  // check if user changed password after token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please login again", 401)
    );
  }

  // grant access to protected route
  req.user = currentUser;
  next();
});

exports.forgottenPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  !email ? next(new AppError("Please provide an email address")) : email;

  const user =
    (await Doctor.findOne({ email })) ||
    (await Patient.findOne({ email })) ||
    (await Admin.findOne({ email }));

  //check if user still exist
  handleNotFound(user, `No user found with email: ${email}`, next);

  //generate reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    resetToken,
  });

  //generate reset token
});

// exports.Logout = catchAsync(async (req, res, next) => {
//   const currentUser  = await Patient.findOne
// });

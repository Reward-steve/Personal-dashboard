const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin.js");
const Doctor = require("../models/Doctor.js");
const Patient = require("../models/Patient.js");

const {
  AppError,
  catchAsync,
  hashedToken,
  handleNotFound,
  CreateSendToken,
  currentUser,
} = require("../utils/reusableFunctions.js");

const sendEmail = require("../mail/sendEmail.js");
const emailCard = require("../template/emailCard.js");

//REGISTER OR SIGNUP
const Register = catchAsync(async (req, res, next) => {
  const {
    fullName,
    email,
    password,
    confirmPassword,
    role = "patient", //default role
    phone,
    specialization,
    department,
  } = req.body;

  // check if email already exists in the database.
  const existingUser = await Promise.all([
    Admin.findOne({ email }),
    Doctor.findOne({ email }),
    Patient.findOne({ email }),
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
      confirmPassword,
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
      confirmPassword,
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
      confirmPassword,
      role,
    });
  } else {
    next();
  }

  // Generate and send JWT token to the client.
  CreateSendToken(newUser, 201, res);
});

//LOGIN OR SIGNIN
const Login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // Check all role-based collections for user
  const user =
    (await Admin.findOne({ email }).select("+password")) ||
    (await Doctor.findOne({ email }).select("+password")) ||
    (await Patient.findOne({ email }).select("+password"));

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch || !user) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // Generate and send JWT token to the client.
  CreateSendToken(user, 200, res);
});

//FORGOTTEN PASSWORD
const forgottenPassword = catchAsync(async (req, res, next) => {
  //get user based on POSTED email
  const { email } = req.body;

  !email ? next(new AppError("Please provide an email address")) : email;

  const user =
    (await Doctor.findOne({ email })) ||
    (await Patient.findOne({ email })) ||
    (await Admin.findOne({ email }));

  //check if user still exist
  handleNotFound(user, `No user found with email: ${email} found`, next);

  //generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //send it to users email

  const userName = user.fullName;
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/users/resetpassword/${resetToken}`;
  const subject = "Your password reset token is (Valid for 10 mins)";

  try {
    await sendEmail({
      email,
      subject,
      html: emailCard(resetURL, userName, subject),
    });

    res.status(200).json({
      status: "success",
      message: "email successfully sent to user",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.resetTokenExp = undefined;

    return next(
      new AppError("There was an error sending email, Try again later !", 500)
    );
  }
});

//RESET PASSWORD
const resetPassword = catchAsync(async (req, res, next) => {
  //Get user based on the token
  const encryptedToken = hashedToken(req.params.token);

  const user =
    (await currentUser(Admin, encryptedToken, { $gt: Date.now() })) ||
    (await currentUser(Doctor, encryptedToken, { $gt: Date.now() })) ||
    (await currentUser(Patient, encryptedToken, { $gt: Date.now() }));

  //If token has not expired and user is found, set new password
  if (!user) {
    return next(new AppError("Invalid Token, Token has expired", 400));
  }

  //update changedPasswordAt property for user
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.resetTokenExp = undefined;
  user.passwordResetToken = undefined;
  await user.save();

  //Login user, send JWT
  CreateSendToken(user, 200, res);
});

// const Logout = catchAsync(async (req, res, next) => {
//   const currentUser  = await Patient.findOne
// });

module.exports = {
  Register,
  Login,
  forgottenPassword,
  resetPassword,
};

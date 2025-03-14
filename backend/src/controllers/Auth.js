const User = require("../models/UserModels/User");
const Admin = require("../models/UserModels/Admin");
const Doctor = require("../models/UserModels/Doctor");
const LabTechnician = require("../models/UserModels/LabTechnician");
const Pharmacist = require("../models/UserModels/Pharmacist");
const Nurse = require("../models/UserModels/Nurse");
const Patient = require("../models/UserModels/Patient");

const {
  AppError,
  catchAsync,
  hashedToken,
  handleNotFound,
  CreateSendToken,
  currentUser,
} = require("../Utils/reusableFunctions.js");

const sendEmail = require("../mail/sendEmail.js");
const emailCard = require("../template/emailCard.js");

//REGISTER OR SIGNUP
const Register = catchAsync(async (req, res, next) => {
  const {
    name,
    email,
    password,
    role = "patient", //default role
    phone,
    specialization,
    department,
  } = req.body;

  // check if email already exists in the database.
  const existingUser = await Promise.all([
    User.findOne({ email }),
    Admin.findOne({ email }),
    Doctor.findOne({ email }),
    LabTechnician.findOne({ email }),
    Pharmacist.findOne({ email }),
    Nurse.findOne({ email }),
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
      name,
      email,
      password,
      phone,
      patientID: (patientId.length + 1) * 1, // set patient ID
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      address: req.body.address,
      age: req.body.age,
      emergencyContact: req.body.emergencyContact,
      role,
    });
  } else if (role === "doctor") {
    newUser = await Doctor.create({
      name,
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
  } else if (role === "labtechnician") {
    newUser = await LabTechnician.create({
      name,
      email,
      password,
      department,
      qualifications: req.body.qualifications,
      role,
    });
  } else if (role === "pharmacist") {
    newUser = await Pharmacist.create({
      name,
      email,
      password,
      licenseNumber,
      qualifications: req.body.qualifications,
      role,
    });
  } else if (role === "nurse") {
    newUser = await Nurse.create({
      name,
      email,
      password,
      department,
      qualifications: req.body.qualifications,
      shift: req.body.shift,
      role,
    });
  } else if (role === "admin") {
    newUser = await Admin.create({
      name,
      email,
      password,
      role,
    });
  } else {
    return next();
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
    (await User.findOne({ email }).select("+password")) ||
    (await Admin.findOne({ email }).select("+password")) ||
    (await Doctor.findOne({ email }).select("+password")) ||
    (await Nurse.findOne({ email }).select("+password")) ||
    (await Patient.findOne({ email }).select("+password")) ||
    (await LabTechnician.findOne({ email }).select("+password")) ||
    (await Pharmacist.findOne({ email }).select("+password"));

  const isMatch = await user.comparePassword(password, user.password);

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
    (await User.findOne({ email }).select("+password")) ||
    (await Admin.findOne({ email }).select("+password")) ||
    (await Doctor.findOne({ email }).select("+password")) ||
    (await Nurse.findOne({ email }).select("+password")) ||
    (await Patient.findOne({ email }).select("+password")) ||
    (await LabTechnician.findOne({ email }).select("+password")) ||
    (await Pharmacist.findOne({ email }).select("+password"));

  //check if user still exist
  handleNotFound(user, `No user found with email: ${email} found`, next);

  //generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //send it to users email

  const userName = user.name;
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
    (await currentUser(User, encryptedToken, { $gt: Date.now() })) ||
    (await currentUser(Admin, encryptedToken, { $gt: Date.now() })) ||
    (await currentUser(Doctor, encryptedToken, { $gt: Date.now() })) ||
    (await currentUser(Nurse, encryptedToken, { $gt: Date.now() })) ||
    (await currentUser(Patient, encryptedToken, { $gt: Date.now() })) ||
    (await currentUser(LabTechnician, encryptedToken, { $gt: Date.now() })) ||
    (await currentUser(Pharmacist, encryptedToken, { $gt: Date.now() }));

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

const updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, password, confirmPassword } = req.body;

  //get user id
  const { id } = req.user.id;

  if (!currentPassword || !password || !confirmPassword) {
    return next(new AppError("All fields are require", 500));
  }

  //get user from collection
  const user =
    (await User.findById({ id }).select("+password")) ||
    (await Admin.findById({ id }).select("+password")) ||
    (await Doctor.findById({ id }).select("+password")) ||
    (await Nurse.findById({ id }).select("+password")) ||
    (await Patient.findById({ id }).select("+password")) ||
    (await LabTechnician.findById({ id }).select("+password")) ||
    (await Pharmacist.findById({ id }).select("+password"));

  //check if currentPassword is correct
  const isMatch = await user.comparePassword(currentPassword, user.password);

  if (!user || !isMatch) {
    return next(new AppError("Your current password is wrong.", 400));
  }

  user.password = password;
  user.confirmPassword = confirmPassword;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "password updated successfully",
  });
});

const Logout = catchAsync(async (req, res, next) => {
  //get user id
  const { id } = req.user.id;

  const currentUser =
    (await User.findById({ id }).select("+password")) ||
    (await Admin.findById({ id }).select("+password")) ||
    (await Doctor.findById({ id }).select("+password")) ||
    (await Nurse.findById({ id }).select("+password")) ||
    (await Patient.findById({ id }).select("+password")) ||
    (await LabTechnician.findById({ id }).select("+password")) ||
    (await Pharmacist.findById({ id }).select("+password"));

  if (!currentUser) {
    next(new AppError("User not found", 404));
  }

  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });

  res.status(200).json({
    status: "success",
    message: "successfully logged out",
  });
});

module.exports = {
  Register,
  Login,
  forgottenPassword,
  resetPassword,
  updatePassword,
  Logout,
};

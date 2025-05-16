const User = require("../models/UserModels/User");
const jwt = require("jsonwebtoken");

const {
  AppError,
  catchAsync,
  hashedToken,
  handleNotFound,
  CreateSendToken,
  sendResponse,
  SignToken,
} = require("../Utils/reusableFunctions.js");

const {
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require("../mail/sendEmail.js");

const {
  findByEmail,
  findUserById,
  createRoleSpecificDetails,
} = require("../Utils/roleAuth.js");

//REGISTER OR SIGNUP
const Register = catchAsync(async (req, res, next) => {
  const {
    firstname,
    lastname,
    username,
    email,
    password,
    role = "Patient", //default role
    ...rest
  } = req.body;

  // check if email already exists in the database.
  const existingUser = await findByEmail(email);

  if (existingUser) {
    return next(new AppError("Email already in use", 400));
  }

  // Create new User
  const newUser = await createRoleSpecificDetails(
    role,
    firstname,
    lastname,
    username,
    email,
    password,
    rest
  );

  await sendVerificationEmail(newUser, email);

  res.status(201).json({
    status: "success",
    message: "Registration successfull, Please verify your email address",
  });
});

//VERIFY USER ACCOUNT
const verifyEmail = catchAsync(async (req, res, next) => {
  const { token } = req.params;

  if (!token) {
    return next(new AppError("Invalid or missing token", 400));
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  // Find user by ID from token payload
  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new AppError("User no longer exists", 404));
  }

  if (user.isVerified) {
    return res.status(200).json({
      status: "success",
      message: "Email already verified. You can now log in.",
    });
  }

  // Mark email as verified
  user.isVerified = true;
  await user.save({ validateBeforeSave: false });

  // Optional: Automatically log them in after verification
  CreateSendToken(user, res);
});

//CHECK-AUTH
const checkAuth = catchAsync(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new AppError("Invalid or missing token", 400));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({
      user: decoded,
    });
  } catch (err) {
    return next(new AppError("Invalid Token", 400));
  }
});
//LOGIN OR SIGNIN
const Login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password exist
  if (!email || !password) {
    return next(new AppError("Email and password are required", 400));
  }

  //find user by email
  const user = await findByEmail(email);

  if (!user) {
    return next(new AppError("Incorrect email or password", 401));
  }

  //compare user password
  const isMatch = await user.comparePassword(password, user.password);

  if (!isMatch) {
    return next(new AppError("Incorrect email or password", 401));
  }

  if (!user.isVerified) {
    return next(new AppError("Please verify your email address"));
  }

  CreateSendToken(user, res);
});

//FORGOTTEN PASSWORD
const forgottenPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Please provide an email address", 400));
  }

  const user = await findByEmail(email);
  handleNotFound(user, `No user found with email: ${email}`, next);

  // Generate reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  await sendResetPasswordEmail(resetToken, user.username, email);
  res.status(200).json({
    status: "success",
    message: "Email successfully sent to user",
  });
});

//RESET PASSWORD
const resetPassword = catchAsync(async (req, res, next) => {
  const encryptedToken = hashedToken(req.params.token);

  const user = await User.findOne({
    passwordResetToken: encryptedToken,
  });

  if (!user) {
    return next(new AppError("Invalid Token, Token has expired", 400));
  }
  // update changedPasswordAt property for user
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.tokenExp = undefined;
  await user.save();
  CreateSendToken(user, res);
});

const updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, password } = req.body;
  //get user id
  const { id } = req.user.id;

  if (!currentPassword || !password) {
    return next(new AppError("All fields are require", 500));
  }

  //get user from collection
  const user = await findUserById(id);

  const isMatch = await user.comparePassword(currentPassword, user.password);

  if (!user || !isMatch) {
    return next(new AppError("Your current password is wrong.", 400));
  }

  user.password = password;
  await user.save();

  sendResponse(res, 200, "success", "password updated successfully", user);
});

const Logout = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const currentUser = await findUserById(id);

  if (!currentUser) {
    next(new AppError("User not found", 404));
  }

  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });

  sendResponse(res, 200, "success", "successfully logged out");
});

module.exports = {
  Register,
  Login,
  checkAuth,
  verifyEmail,
  forgottenPassword,
  resetPassword,
  updatePassword,
  Logout,
};

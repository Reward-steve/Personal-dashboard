const User = require("../models/UserModels/User");

const {
  AppError,
  catchAsync,
  hashedToken,
  handleNotFound,
  CreateSendToken,
  sendResponse,
} = require("../Utils/reusableFunctions.js");

const sendEmail = require("../mail/sendEmail.js");
const emailCard = require("../template/emailCard.js");

const {
  findByEmail,
  findUserById,
  createRoleSpecificDetails,
} = require("../Utils/roleAuth.js");

//REGISTER OR SIGNUP
const Register = catchAsync(async (req, res, next) => {
  const {
    name,
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
    name,
    email,
    password,
    rest
  );

  CreateSendToken(newUser, 201, res);
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

  CreateSendToken(user, 200, res);
});

//FORGOTTEN PASSWORD
const forgottenPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  !email ? next(new AppError("Please provide an email address")) : email;

  const user = await findByEmail(email);

  //check if user still exist
  handleNotFound(user, `No user found with email: ${email} found`, next);

  //generate the random reset token
  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  //send it to users email

  const userName = user.name;
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetpassword/${resetToken}`;
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
    user.tokenExp = undefined;

    return next(
      new AppError("There was an error sending email, Try again later !", 500)
    );
  }
});

//RESET PASSWORD
const resetPassword = catchAsync(async (req, res, next) => {
  const encryptedToken = hashedToken(req.params.token);

  const user = await User.findOne({ passwordResetToken: encryptedToken });

  if (!user) {
    return next(new AppError("Invalid Token, Token has expired", 400));
  }

  //update changedPasswordAt property for user
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.tokenExp = undefined;
  await user.save();

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
  const { id } = req.user.id;

  const currentUser = await findUserById(id);

  if (!currentUser) {
    next(new AppError("User not found", 404));
  }

  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });

  sendResponse(res, 200, "success", "successfully loged out");
});

module.exports = {
  Register,
  Login,
  forgottenPassword,
  resetPassword,
  updatePassword,
  Logout,
};

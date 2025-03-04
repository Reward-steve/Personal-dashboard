const { promisify } = require("node:util");
const jwt = require("jsonwebtoken");

const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Admin = require("../models/Admin");

const { AppError, catchAsync } = require("../utils/reusableFunctions.js");

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

const { AppError } = require("../utils/reusableFunctions");

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new AppError("Access Denied, Admins Only", 403));
  }
  next();
};

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

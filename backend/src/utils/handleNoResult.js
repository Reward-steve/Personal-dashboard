const AppError = require("../utils/AppError");

module.exports = (results, message, next) => {
  if (results.length === 0) {
    return next(new AppError(message, 404));
  }
};

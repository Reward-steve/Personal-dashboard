const AppError = require("./AppError");

module.exports = (data, message, next) => {
  if (!data) {
    return next(new AppError(message, 404));
  }
};

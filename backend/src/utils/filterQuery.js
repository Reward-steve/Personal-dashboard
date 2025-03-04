const AppError = require("../utils/AppError");
const Appointment = require("../models/Appointment");

module.exports = filterQuery = async (res, status) => {
  if (status) {
    const sort = await Appointment.find({ status });

    res.status(200).json({
      result: sort.length,
      status: "success",
      sort,
    });
  } else {
    return next(new AppError(`Invalid query request ${status}`));
  }
};

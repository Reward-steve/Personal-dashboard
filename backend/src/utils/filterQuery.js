const Appointment = require("../models/Appointment");

module.exports = filterQuery = async (req, res, status, next) => {
  //check if status exist
  if (!status) {
    return next();
  }

  if (req.query.sort === status) {
    const sort = await Appointment.find({ status: status });

    res.status(200).json({
      result: sort.length,
      status: "success",
      sort,
    });
  }
};

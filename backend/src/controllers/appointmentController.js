const Appointment = require("../models/Appointment");
const Notification = require("../models/Notification");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const handleNotFound = require("../utils/handleNotFound");
const handleNoResult = require("../utils/handleNoResult");
const fetchAppointments = require("../utils/fetchAppointments");
const filterQuery = require("../utils/filterQuery");

//book an appointment
exports.bookAppointment = catchAsync(async (req, res) => {
  const { bookAppointment, department } = req.body;
  const patientId = req.user._id;

  const appointment = await Appointment.create({
    patientId: patientId,
    bookAppointment,
    department,
  });

  if (!appointment) {
    return next(new AppError("Appointment not booked", 400));
  }

  //notify patient
  await Notification.create({
    user: patientId,
    message:
      "Your appointment request is pending, you will receive a notification when it is scheduled",
  });

  res.status(200).json({
    status: "success",
    message: "Appointment booked",
  });
});

//get all appointments
exports.getAllAppointments = catchAsync(async (req, res, next) => {
  const appointments = await Appointment.find();
  handleNoResult(appointments, "No appointments found", next);

  res.status(200).json({
    status: "success",
    result: appointments.length,
    data: { appointments },
  });
});

//Schedule appointments
exports.sheduleAppointment = catchAsync(async (req, res, next) => {
  const { patientId } = req.body;
  const user = await Appointment.findOne({ patientId });

  if (!user || user.status !== "Pending") {
    return next(new AppError("No Pending appointment found"));
  }

  user.status = "Scheduled";
  user.save();

  // Send notification
  await Notification.create({
    user: user._id,
    message: `Your appointment request has been approved! Your appointment is now ${user.status}.`,
    isRead: true,
  });

  res.status(200).json({
    status: "success",
    message: "Patient Appointment was scheduled",
  });
});

//cancle appointment
exports.cancleAppointment = catchAsync(async (req, res, next) => {
  const { patientId } = req.body;
  const user = await Appointment.find();

  // if(!user || user.status)
});

exports.queryBySort = catchAsync(async (req, res, next) => {
  const sortBy = req.query.sort;
  if (!sortBy) {
    return next();
  }
  await filterQuery(res, sortBy);
});

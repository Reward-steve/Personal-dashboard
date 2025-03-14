const Appointment = require("../models/Records/Appointment");
const Notification = require("../models/Security/Notification");

const {
  AppError,
  catchAsync,
  handleNoResult,
  sendResponse,
} = require("../Utils/reusableFunctions");

const filterQuery = require("../Utils/filterQuery");

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

  sendResponse(res, 200, "Appointment booked", appointment);
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
exports.scheduleAppointment = catchAsync(async (req, res, next) => {
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

  sendResponse(res, 200, "Appointment scheduled", user);
});

//Complete appointments
exports.completeAppointment = catchAsync(async (req, res, next) => {
  const { patientId } = req.body;
  const user = await Appointment.findOne({ patientId });

  if (!user || user.status !== "Scheduled") {
    return next(new AppError("No Scheduled appointment found"));
  }

  user.status = "Completed";
  user.save();

  // Send notification
  await Notification.create({
    user: user._id,
    message: `Your appointment request has been completed!`,
    isRead: true,
  });

  sendResponse(res, 200, "Appointment completed", user);
});

//cancle appointment
exports.cancleAppointment = catchAsync(async (req, res, next) => {
  const { patientId } = req.body;
  const user = await Appointment.find({ patientId });

  if (!user || user.status) {
    return next(new AppError("No appointment found"));
  }

  user.status = "Canceled";
  user.save();

  // Send notification
  await Notification.create({
    user: user._id,
    message: `Your appointment request has been canceled!`,
    isRead: true,
  });

  sendResponse(res, 200, "Appointment canceled", user);
});

exports.queryBySort = catchAsync(async (req, res, next) => {
  const status = req.query.sort;

  if (
    status === "Pending" ||
    status === "Scheduled" ||
    status === "Completed" ||
    status === "Canceled"
  ) {
    await filterQuery(req, res, status, next);
  }

  return next(new AppError(`Invalid query request ${status}`, 404));
});

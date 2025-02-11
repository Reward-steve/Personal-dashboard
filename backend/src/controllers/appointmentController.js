const Appointment = require("../models/Appointment");
const catchAsync = require("../utils/catchAsync");
const handleNotFound = require("../utils/handleNotFound");
const handleNoResult = require("../utils/handleNoResult");
const fetchAppointments = require("../utils/fetchAppointments");

exports.bookAppointment = catchAsync(async (req, res) => {
  const { doctorId, patientId, appointmentDate, timeSlot } = req.body;
  const appointment = await Appointment.create({
    doctorId,
    patientId,
    appointmentDate,
    timeSlot,
  });

  res.status(201).json({
    status: "success",
    message: "Appointment booked successfully",
    data: { appointment },
  });
});

exports.getAllAppointments = catchAsync(async (req, res, next) => {
  const appointments = await Appointment.find();
  handleNoResult(appointments, "No appointments found", next);

  res.status(200).json({
    status: "success",
    result: appointments.length,
    data: { appointments },
  });
});

exports.getAppointmentById = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);
  handleNotFound(
    appointment,
    `No appointment with ID ${req.params.id} found`,
    next
  );

  res.status(200).json({
    status: "success",
    data: { appointment },
  });
});

exports.updateAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  handleNotFound(
    appointment,
    `No appointment with ID ${req.params.id} found`,
    next
  );

  res.status(200).json({
    status: "success",
    message: "Appointment updated successfully",
    data: { appointment },
  });
});

exports.deleteAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);
  handleNotFound(
    appointment,
    `No appointment with ID ${req.params.id} found`,
    next
  );

  res.status(204).json({
    status: "success",
    message: "Appointment deleted successfully",
  });
});

// Reuse fetchAppointments for patient & doctor queries
exports.getPatientAppointments = catchAsync((req, res, next) => {
  return fetchAppointments(
    { patientId: req.params.patientId },
    res,
    next,
    "No appointments found for this patient"
  );
});

exports.getDoctorAppointments = catchAsync((req, res, next) => {
  return fetchAppointments(
    { doctorId: req.params.doctorId },
    res,
    next,
    "No appointments found for this doctor"
  );
});

exports.getDoctorAppointmentsByFilter = catchAsync((req, res, next) => {
  const { doctorId, appointmentDate, timeSlot } = req.params;
  const query = { doctorId };
  if (appointmentDate) query.appointmentDate = appointmentDate;
  if (timeSlot) query.timeSlot = timeSlot;

  return fetchAppointments(
    query,
    res,
    next,
    "No matching appointments found for this doctor"
  );
});

exports.getPatientAppointmentsByFilter = catchAsync((req, res, next) => {
  const { patientId, date, timeSlot } = req.params;
  const query = { patientId };
  if (date) query.date = date;
  if (timeSlot) query.timeSlot = timeSlot;

  return fetchAppointments(
    query,
    res,
    next,
    "No matching appointments found for this patient"
  );
});

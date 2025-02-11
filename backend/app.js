const express = require("express");
const AppError = require("./src/utils/AppError.js");
const usersRoutes = require("./src/routes/userRoutes.js");
const patientsRouter = require("./src/routes/patientRoutes.js");
const doctorsRouter = require("./src/routes/doctorRoutes.js");
const appointmentRouter = require("./src/routes/appointmentRoutes.js");
const adminRouter = require("./src/routes/adminRoutes.js");
const medicalHistoryRouter = require("./src/routes/medicalHistoryRoutes.js");

const app = express();
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/patients", patientsRouter);
app.use("/api/doctors", doctorsRouter);
app.use("/api/appoointments", appointmentRouter);
app.use("/api/admin", adminRouter);
app.use("/api/medical-history", medicalHistoryRouter);
app.all("*", (req, res, next) => {
  next(new AppError("Invalid route", 404));
});

app.use((err, req, res, next) => {
  console.error("ERROR:", err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;

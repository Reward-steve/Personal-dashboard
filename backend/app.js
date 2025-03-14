const express = require("express");
const cors = require("cors");
const { AppError } = require("./src/Utils/reusableFunctions.js");
const Auth = require("./src/Routes/Auth.js");
const Patient = require("./src/Routes/Patient.js");
const Doctor = require("./src/Routes/Doctor.js");
const Lab = require("./src/Routes/Lab.js");
const Appointment = require("./src/Routes/Appointment.js");
const Admin = require("./src/Routes/Admin.js");
const MedicalRecord = require("./src/Routes/MedicalRecord.js");
const Billing = require("./src/Routes/Billing.js");
const Pharmacy = require("./src/Routes/Pharmacy.js");
const errorHandler = require("./src/middleware/errorHandler.js");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    // methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

app.use("/auth", Auth);
app.use("/admin", Admin);
app.use("/patients", Patient);
app.use("/doctors", Doctor);
// app.use("/pharmacy", Pharmacy);
// app.use("/lab-tests", Lab);
// app.use("/billing", Billing);
app.use("/records", MedicalRecord);
app.use("/appointments", Appointment);

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on server`, 404));
});

app.use(errorHandler);
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

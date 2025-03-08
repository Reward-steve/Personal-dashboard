const express = require("express");
const cors = require("cors");
const { AppError } = require("./src/utils/reusableFunctions.js");
const authRouter = require("./src/routes/authRoute.js");
const patientsRouter = require("./src/routes/patientRoutes.js");
const doctorsRouter = require("./src/routes/doctorRoutes.js");
const appointmentRouter = require("./src/routes/appointmentRoutes.js");
const adminRouter = require("./src/routes/adminRoutes.js");
const medicalHistoryRouter = require("./src/routes/medicalHistoryRoutes.js");
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

app.use("/api/auth", authRouter);
app.use("/api/patients", patientsRouter);
app.use("/api/doctors", doctorsRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/admin", adminRouter);
app.use("/api/medical-history", medicalHistoryRouter);

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

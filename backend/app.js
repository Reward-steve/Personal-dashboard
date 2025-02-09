const express = require("express");
const patientsRouter = require("./src/routes/patientRoutes.js");
const doctorsRouter = require("./src/routes/doctorRoutes.js");
const appointmentRouter = require("./src/routes/appointmentRoutes.js");
const adminRouter = require("./src/routes/adminRoutes.js");
const medicalHistoryRouter = require("./src/routes/medicalHistoryRoutes.js");

const app = express();
app.use(express.json());

app.use("/api/patients", patientsRouter);
app.use("/api/doctors", doctorsRouter);
app.use("/api/appoointments", appointmentRouter);
app.use("/api/admin", adminRouter);
app.use("/api/medical-history", medicalHistoryRouter); // ✅ Register the new route
module.exports = app;

const express = require("express");
const patientsRouter = require("./src/routes/patientRoutes.js");
const doctorsRouter = require("./src/routes/doctorRoutes.js");
const app = express();
app.use(express.json());

app.use("/api/v1/patients", patientsRouter);
app.use("/api/v1/doctors", doctorsRouter);
module.exports = app;

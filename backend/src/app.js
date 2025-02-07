const express = require("express");
const patientsRouter = require("./routes/patientsRouter");
const doctorsRouter = require("./routes/doctorsRoute");

const app = express();
app.use(express.json());

app.use("/api/v1/patients", patientsRouter);
app.use("/api/v1/doctors", doctorsRouter);
module.exports = app;

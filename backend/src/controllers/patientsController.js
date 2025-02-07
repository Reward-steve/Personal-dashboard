const Patient = require("../models/Patient.js");

exports.getAllPatients = async (req, res, next) => {
  try {
    const patient = await Patient.find({});

    if (patient.length === 0) {
      return res.status(200).json({
        status: "successful",
        result: 0,
        message: "No patients found",
      });
    }

    res.status(200).json({
      status: "successful",
      result: patient.length,
      data: {
        patient,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Server error",
      error: err.message,
    });
  }
};
exports.createnewPatient = async (req, res, next) => {
  try {
    const newPatient = await Patient.create(req.body);

    res.status(201).json({
      status: "successful",
      message: "New patient created successfully",
      data: {
        newPatient,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "unable to create patient",
      error: err.message,
    });
  }
};

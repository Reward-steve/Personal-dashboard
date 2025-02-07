const Doctor = require("../models/doctorModels");

exports.creatnewDoctor = async (req, res, next) => {
  const {
    fullName,
    email,
    phone,
    specialization,
    department,
    experience,
    qualifications,
    days,
    timeSlots,
    salary,
  } = req.body;
  const newDoctor = await Doctor.find({
    fullName,
    email,
    phone,
    specialization,
    department,
    experience,
    qualifications,
    days,
    timeSlots,
    salary,
  });
  newDoctor.save();
  try {
    const result = newDoctor.length;
    if (result) {
      res.status(200).json({
        status: "success",
        result,
        message: "No doctor found",
      });

      res.status(200).json({
        status: "success",
        result,
        data: {
          newDoctor,
        },
      });
    }
  } catch (err) {
    res.status(505).json({
      status: "failed",
      message: "server error",
      error: err.message,
    });
  }
  next();
};

exports.getAllDoctors = async (req, res, next) => {
  try {
    const doctor = await new Doctor.find({});
    if (doctor.length === 0) {
      return res.status(200).json({
        status: "success",
        result: doctor.length,
        message: "No doctors found",
      });
    }
  } catch (err) {
    res.status(505).json({
      status: "failed",
      message: "server error",
      error: err.message,
    });
  }
  next();
};

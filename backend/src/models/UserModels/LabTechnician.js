const mongoose = require("mongoose");

const labTechnicianSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("LabTechnician", labTechnicianSchema);

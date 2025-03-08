const mongoose = require("mongoose");
const User = require("./User");

const NurseSchema = new mongoose.Schema({
  department: { type: String, required: true },
  shift: { type: String, required: true },
});

const Nurse = User.discriminator("Nurse", NurseSchema);
module.exports = Nurse;

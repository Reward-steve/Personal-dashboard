const mongoose = require("mongoose");
const User = require("./User");

const adminSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["Super Admin", "HOD", "Receptionist"],
    required: true,
  },
  workSchedules: [
    {
      day: {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        required: true,
      },
    },
  ],
  timeSlots: [
    {
      startTime: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
          },
          message: (props) => `${props.value} is not a valid time format!`,
        },
      },
      endTime: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
          },
          message: (props) => `${props.value} is not a valid time format!`,
        },
      },
    },
  ],
  permissions: [
    {
      type: String,
      enum: [
        "manage_users",
        "manage_rooms",
        "manage_appointments",
        "view_reports",
      ],
    },
  ],
});

const Admin = User.discriminator("Admin", adminSchema);
module.exports = Admin;

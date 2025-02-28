const mongoose = require("mongoose");
const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  message: String,
  isRead: { type: Boolean, default: false },
});

module.exports = mongoose.model("Notification", NotificationSchema);

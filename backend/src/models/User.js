const mongoose = require("mongoose");

const {
  PreSave,
  createPasswordResetToken,
  changedPasswordAfter,
} = require("../utils/SchemaMethods");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "A password is required"],
    minlength: [8, "A password must have more than or equal to 8 characters"],
    maxlength: [60, "A password must have less than or equal to 60 characters"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "A password confirmation is required"],
  },
  role: {
    type: String,
    lowercase: true,
    enum: [
      "patient",
      "nurse",
      "lab technician",
      "receptionist",
      "doctor",
      "admin",
    ],
    default: "patient",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  resetTokenExp: Date,
});

userSchema.pre("save", PreSave);

userSchema.methods.changedPasswordAfter = changedPasswordAfter(timestamp);

userSchema.methods.createPasswordResetToken = createPasswordResetToken();

const User = mongoose.model("User", userSchema);
module.exports = User;

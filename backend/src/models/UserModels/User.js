const mongoose = require("mongoose");

const {
  PreSave,
  createPasswordResetToken,
  changedPasswordAfter,
  comparePassword,
} = require("../../Utils/SchemaMethods");

const userSchema = new mongoose.Schema({
  name: {
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
  profilePicture: { type: String },
  role: {
    type: String,
    enum: [
      "Admin",
      "Doctor",
      "Patient",
      "Nurse",
      "Labtechnician",
      "Pharmacist",
    ],
    default: "Patient",
  },

  passwordChangedAt: Date,
  passwordResetToken: String,
  tokenExp: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", PreSave);
userSchema.methods.changedPasswordAfter = changedPasswordAfter;
userSchema.methods.createPasswordResetToken = createPasswordResetToken;
userSchema.methods.comparePassword = comparePassword;

const User = mongoose.model("User", userSchema);
module.exports = User;

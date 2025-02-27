const crypto = require("crypto");
const mongoose = require("mongoose");
const validate = require("validator");
const bcrypt = require("bcryptjs");

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
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  confirmPassword: {
    type: String,
    validate: function (value) {
      return value === this.password;
    },
    message: "This Password {{value}} do not match",
  },

  role: {
    type: String,
    enum: ["patient", "staff", "doctor", "admin"],
    default: "patient",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordChangedAt: Date.now(),
  passwordResetToken: String,
  resetTokenExp: Date,
});

// hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  // only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 10);

  // delete passwordConfirm field
  this.confirmPassword = undefined;
  next();
});

// check if password has been changed
userSchema.methods.changedPasswordAfter = function (timestamp) {
  if (this.createdAt) {
    const createdAt = parseInt(this.createdAt.getTime() / 1000, 10);
    return createdAt < timestamp;
  }
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetTokenExp = Date.now() + 10 * 60 * 1000;
  console.log("user:", { resetToken });

  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;

const mongoose = require("mongoose");
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
  },
  role: {
    type: String,
    enum: ["patient", "doctor", "admin", "user"],
    required: true,
    lowercase: true,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  // only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 10);

  // delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// check if password has been changed
userSchema.methods.changedPasswordAfter = function (timestamp) {
  if (this.createdAt) {
    const createdAt = parseInt(this.createdAt.getTime() / 1000, 10);
    return createdAt > timestamp;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;

const mongoose = require("mongoose");
const validate = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const adminSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    confirmPassword: {
      type: String,
      // required: [true, "Please confirm passord"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "This Password {{value}} do not match",
      },
    },
    role: String,
    passwordResetToken: String,
    resetTokenExp: Date,
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  // only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 10);

  // delete passwordConfirm field
  this.confirmPassword = undefined;
  next();
});

adminSchema.methods.changedPasswordAfter = function (timestamp) {
  if (this.createdAt) {
    const createdAt = parseInt(this.createdAt.getTime() / 1000, 10);
    return createdAt > timestamp;
  }
};

adminSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(10).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetTokenExp = Date.now() + 10 * 60 * 1000;
  console.log("admin:", { resetToken });
  return resetToken;
};

module.exports = mongoose.model("Admin", adminSchema);

const mongoose = require("mongoose");
const {
  PreSave,
  changedPasswordAfter,
  createPasswordResetToken,
} = require("../utils/SchemaMethods");

const adminSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: {
      type: String,
      required: [true, "A password is required"],
      minlength: [8, "A password must have more than or equal to 8 characters"],
      maxlength: [
        60,
        "A password must have less than or equal to 60 characters",
      ],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "A password confirmation is required"],
    },
    passwordChangedAt: Date,
    role: String,
    passwordResetToken: String,
    resetTokenExp: Date,
  },

  { timestamps: true }
);

adminSchema.pre("save", PreSave);
adminSchema.methods.changedPasswordAfter = changedPasswordAfter;
adminSchema.methods.createPasswordResetToken = createPasswordResetToken;

module.exports = mongoose.model("Admin", adminSchema);

const PharmacistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  licenseNumber: { type: String, required: true },
});
module.exports = mongoose.model("Pharmacist", PharmacistSchema);

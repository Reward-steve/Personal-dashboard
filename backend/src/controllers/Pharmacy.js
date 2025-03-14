const Order = require("../models/Pharmacy/Order");
const Medicine = require("../models/Pharmacy/Medicine");
const {
  catchAsync,
  handleNoResult,
  handleNotFound,
} = require("../Utils/reusableFunctions");
const Notification = require("../models/Security/Notification");

// ✅ Order medicine
exports.orderMedicine = catchAsync(async (req, res, next) => {
  const { patientId, medicines } = req.body;

  const newOrder = await Order.create({
    patientId,
    medicines,
  });

  handleNotFound(newOrder, "Medicine order failed", next);

  await Notification.create({
    user: patientId,
    message: "Your medicine order has been placed successfully",
    isRead: true,
  });

  res.status(201).json({
    status: "success",
    message: "Medicine order placed successfully",
    data: { newOrder },
  });
});

// ✅ Get available medicines
exports.getAvailableMedicines = catchAsync(async (req, res, next) => {
  const medicines = await Medicine.find({});
  handleNoResult(medicines, "No medicines found", next);
  res.status(200).json({
    status: "success",
    result: medicines.length,
    data: { medicines },
  });
});

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    items: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        dosage: {
          type: String,
        },
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Processed", "Completed", "Canceled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

/*

Example Usage
Creating an Order: When a doctor prescribes medications or medical supplies for a patient, a new order document is created and saved in the database.
Retrieving Orders: The application can query the Order collection to retrieve all orders for a specific patient or prescribed by a specific doctor.
Updating Order Status: The application can update the status of an order (e.g., from "Pending" to "Processed" or "Completed").


*/

const Invoice = require("../models/Billing/Invoice");
const Payment = require("../models/Billing/Payment");
const Patient = require("../models/UserModels/Patient");

const {
  catchAsync,
  handleNotFound,
  sendResponse,
} = require("../Utils/reusableFunctions");

// Create a new invoice
const createInvoice = catchAsync(async (req, res, next) => {
  const { patientId, invoiceId, amountPaid, paymentMethod } = req.body;

  const invoice = await Invoice.findById(invoiceId);
  handleNotFound(invoice, "Invoice not found", next);

  const newPayment = await Payment.create({
    patientId,
    invoiceId,
    amountPaid,
    paymentMethod,
  });

  // Update the invoice status to "Paid if the amount paid is equal to the total amount"
  amountPaid >= invoice.totalAmount ? (invoice.status = "Paid") : "Pending";
  await invoice.save();

  sendResponse(
    res,
    201,
    "Payment created successfully and invoice status updated",
    newPayment
  );
});

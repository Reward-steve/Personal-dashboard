const Notification = require("../models/Security/Notification");

const { AppError, catchAsync } = require("../Utils/reusableFunctions");

exports.getPatientNotification = catchAsync(async (req, res, next) => {
  const { patientId } = req.body;
  const notification = await Notification.find({ user: patientId });

  let message;
  for (let i = 0; i < notification.length; i++) {
    message = notification[i].message;
  }

  if (!notification) {
    next(
      new AppError(
        `No Notification found for patient with id ${patientId}`,
        404
      )
    );
  }
  res.status(200).json({
    status: "success",
    Notifications: notification.length,
    message: [message],
  });
});

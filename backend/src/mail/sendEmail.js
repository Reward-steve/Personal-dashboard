const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  //create a transporter
  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 1025,
    secure: false,
  });

  //Define the email options
  const mailOptions = {
    from: "rewardstadmin01@medical.com",
    to: options.email,
    subject: options.subject,
    html: options.html,
  };
  //send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

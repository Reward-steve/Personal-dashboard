const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "localhost", // MailDev runs locally
  port: 1025, // MailDev SMTP port
  secure: false, // No TLS
});

module.exports = transporter;

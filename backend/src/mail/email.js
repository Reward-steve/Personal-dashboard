const transporter = require("./mailer");

app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const mailOptions = {
      from: "admin@yourapp.com", // Fake sender
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

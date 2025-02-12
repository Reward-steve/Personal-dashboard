const mongoose = require("mongoose");
require("dotenv").config({
  path: ".env",
});
const app = require("./app");
const PORT = process.env.PORT;

// const DB = process.env.DATABASE.replace(
//   /db_password/g,
//   process.env.DB_PASSWORD
// );

// mongoose
//   .connect(DB)
//   .then(() => console.log("✅ Database connected successfully"))
//   .catch((err) => {
//     console.error("❌ Database connection failed", err.message);
//   });
console.log(process.env.LOCAL_DB);

mongoose
  .connect(process.env.LOCAL_DB)
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((err) => {
    console.error("❌ Database connection failed", err);
  });
app.listen(PORT, () => {
  console.log(`🚀 Listening to server on port ${PORT}... `);
});

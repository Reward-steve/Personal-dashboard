const express = require("express");

const {
  Register,
  Login,
  forgottenPassword,
  resetPassword,
  updatePassword,
  Logout,
} = require("../controllers/Auth");

const {
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/User");

const { Protect } = require("../middleware/protect");
const { restrict } = require("../middleware/adminAuth");

const router = express.Router();

router.route("/register").post(Register);

router.route("/login").post(Login);

router.route("/forgotpassword").post(forgottenPassword);

router.route("/resetpassword/:token").patch(resetPassword);

router.route("/updatepassword").patch(Protect, updatePassword);

router.route("/logout").post(Protect, Logout);

router
  .route("/user/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(Protect, restrict("admin"), deleteUserById);

module.exports = router;

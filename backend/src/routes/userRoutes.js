const express = require("express");

const { Register, Login } = require("../controllers/authController");
const { getAllUsers } = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(Register);

router.route("/login").post(Login);

router.route("/").get(getAllUsers);

module.exports = router;

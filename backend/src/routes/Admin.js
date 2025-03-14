const express = require("express");
const { getAllUsers } = require("../controllers/Admin");

const { deleteAllUsers } = require("../controllers/Admin");

const { Register } = require("../controllers/Auth");

const router = express.Router();

router.route("/users").get(getAllUsers);

router.route("/register/user").post(Register);

router.route("/delete").delete(deleteAllUsers);

module.exports = router;

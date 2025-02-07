const express = require("express");

const router = express.Router();

router.route("/users").get();

router.route("/users/:id").delete();

router.route("/appointments").get();

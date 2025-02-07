const express = require("express");

const router = express.Router();

router.route("/book").post();

router.route("/:id").get().put().delete();

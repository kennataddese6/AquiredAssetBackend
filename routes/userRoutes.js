const express = require("express");
const router = express.Router();
const { login } = require("../controllers/userController");
const { validator } = require("../middleware/validator");

router.route("/").post(validator, login);

module.exports = router;

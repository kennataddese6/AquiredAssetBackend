const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { login, getMe } = require("../controllers/userController");
const { validator } = require("../middleware/validator");

router.route("/login").post(validator, login);
router.route("/me").get(protect, validator, getMe);

module.exports = router;

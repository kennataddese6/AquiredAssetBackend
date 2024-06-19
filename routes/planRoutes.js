const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { createPlan } = require("../controllers/planController");
const { validator } = require("../middleware/validator");

router.route("/").post(protect, validator, createPlan);

module.exports = router;

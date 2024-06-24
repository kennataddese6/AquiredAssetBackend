const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createPlan,
  getPlans,
  getPlan,
} = require("../controllers/planController");
const { validator } = require("../middleware/validator");

router.route("/:Id").get(getPlan);
router.route("/").post(protect, validator, createPlan).get(protect, getPlans);

module.exports = router;

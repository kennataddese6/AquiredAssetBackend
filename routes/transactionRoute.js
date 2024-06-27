const express = require("express");
const router = express.Router();
const { validator } = require("../middleware/validator");
const { protect } = require("../middleware/authMiddleware");
const { secure } = require("../middleware/secureChannel");

const {
  createTransaction,
  getTransactions,
} = require("../controllers/transactionController");

router
  .route("/")
  .post(validator, secure, createTransaction)
  .get(protect, getTransactions);

module.exports = router;

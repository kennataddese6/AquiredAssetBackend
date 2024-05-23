const express = require("express");
const router = express.Router();
const { validator } = require("../middleware/validator");
const { protect } = require("../middleware/authMiddleware");

const {
  createTransaction,
  getTransactions,
} = require("../controllers/transactionController");

router
  .route("/")
  .post(validator, createTransaction)
  .get(protect, getTransactions);

module.exports = router;

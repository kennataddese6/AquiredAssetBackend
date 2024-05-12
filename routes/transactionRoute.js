const express = require("express");
const router = express.Router();
const { validator } = require("../middleware/validator");

const {
  createTransaction,
  getTransactions,
} = require("../controllers/transactionController");

router.route("/").post(validator, createTransaction).get(getTransactions);

module.exports = router;

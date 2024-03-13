const Transaction = require("../models/transactionModel");
const asyncHandler = require("express-async-handler");

const createTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.create({
    PropertyId: req.body.ProperyId,
    TransactionCategory: req.body.TransactionCategory,
    TransactionType: req.body.TransactionType,
    TransactionDate: req.body.TransactionDate,
    TransactionValue: req.body.TransactionValue,
  });
  if (transaction) {
    console.log(transaction);
  } else {
    console.log("There is something wrong");
  }
});

module.exports = {
  createTransaction,
};

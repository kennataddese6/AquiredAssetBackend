const Transaction = require("../models/transactionModel");
const Property = require("../models/propertyModel");
const asyncHandler = require("express-async-handler");

const createTransaction = asyncHandler(async (req, res) => {
  if (req.body.RenewalStartDate && req.body.RenewalEndDate) {
    const property = await Property.findOne({ _id: req.body.PropertyId });
    if (property) {
      const newInsuranceRenewal = {
        RenewalStartDate: req.body.RenewalStartDate,
        RenewalEndDate: req.body.RenewalEndDate,
      };
      property.InsuranceRenewal.push(newInsuranceRenewal);
      await property.save();
    }
  }
  const transaction = await Transaction.create({
    PropertyId: req.body.ProperyId,
    TransactionCategory: req.body.TransactionCategory,
    TransactionType: req.body.TransactionType,
    TransactionDate: req.body.TransactionDate,
    TransactionValue: req.body.TransactionValue,
  });
  if (transaction) {
    res.status(200).json(transaction);
  } else {
    res.status(400).json("This is a bad request");
  }
});
const getTransactions = asyncHandler(async (req, res) => {
  const transaction = await Transaction.find();
  if (transaction) {
    res.status(200).json(transaction);
  } else {
    res.status(400).json("This is a bad request");
  }
});

module.exports = {
  createTransaction,
  getTransactions,
};

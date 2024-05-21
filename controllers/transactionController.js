const Transaction = require("../models/transactionModel");
const Property = require("../models/propertyModel");
const asyncHandler = require("express-async-handler");

const createTransaction = asyncHandler(async (req, res) => {
  const property = Property.findOnd({ _id: req.body.ProperyId });
  if (!property) {
    return res.status(404).json("Property not found!");
  }
  if (req.body.RenewalStartDate && req.body.RenewalEndDate) {
    const property = await Property.findOne({ _id: req.body.PropertyId });
    if (property) {
      const newInsuranceRenewal = {
        RenewalStartDate: req.body.RenewalStartDate,
        RenewalEndDate: req.body.RenewalEndDate,
      };
      const insuranceRenewal = property.InsuranceRenewal;
      const allInsurance = [...insuranceRenewal, newInsuranceRenewal];
      property.InsuranceRenewal = allInsurance;
      await property.save();
    }
  }
  const transaction = await Transaction.create({
    PropertyId: req.body.ProperyId,
    BranchName: property.BranchName,
    DistrictName: property.DistrictName,
    TransactionId: req.body.TransactionId,
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

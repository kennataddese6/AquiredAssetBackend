const Transaction = require("../models/transactionModel");
const Property = require("../models/propertyModel");
const asyncHandler = require("express-async-handler");

const createTransaction = asyncHandler(async (req, res) => {
  const property = await Property.findOne({ _id: req.body.PropertyId });
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
    PropertyId: req.body.PropertyId,
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

const getPropertyTransactions = asyncHandler(async (req, res) => {
  if (!req.body.Id) {
    return res.status(400).json({ message: "This is a bad request" });
  }
  const transaction = await Transaction.find({ PropertyId: req.body.Id });
  if (transaction) {
    res.status(200).json(transaction);
  } else {
    res.status(400).json("This is a bad request");
  }
});
const getBranchTransactions = asyncHandler(async (req, res) => {
  const transaction = await Transaction.find({
    BranchName: req.body.BranchName,
  });
  if (transaction) {
    res.status(200).json(transaction);
  } else {
    res.status(400).json("This is a bad request");
  }
});
const getDistrictTransactions = asyncHandler(async (req, res) => {
  const transaction = await Transaction.find({
    DistrictName: req.body.DistrictName,
  });
  if (transaction) {
    res.status(200).json(transaction);
  } else {
    res.status(400).json("This is a bad request");
  }
});

module.exports = {
  createTransaction,
  getTransactions,
  getPropertyTransactions,
  getBranchTransactions,
  getDistrictTransactions,
};

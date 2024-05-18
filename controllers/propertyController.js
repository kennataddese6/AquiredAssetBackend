const Property = require("../models/propertyModel");
const asyncHandler = require("express-async-handler");
const Document = require("../models/documentModel");
const transactionInfo = require("../transactionInfo.json");

const registerProperty = asyncHandler(async (req, res) => {
  const propertyData = { ...req.body };
  if (
    propertyData.InsuranceRenewal &&
    !Array.isArray(propertyData.InsuranceRenewal)
  ) {
    propertyData.InsuranceRenewal = [propertyData.InsuranceRenewal];
  }
  const property = await Property.create(propertyData);
  if (property) {
    res.status(200).json(property);
  } else {
    res.status(400);
  }
});

const getAllProperty = asyncHandler(async (req, res) => {
  const property = await Property.find();
  if (property) {
    res.status(200).json(property);
  } else {
    res.status(400);
  }
});

const getBranchProperty = asyncHandler(async (req, res) => {
  const { BranchName } = req.params;
  if (!BranchName) {
    return res.status(400);
  }
  const property = await Property.find({ BranchName: BranchName });
  if (property) {
    res.status(200).json(property);
  } else {
    res.status(400);
  }
});

const getDistrictProperty = asyncHandler(async (req, res) => {
  const { DistrictName } = req.params;
  const property = await Property.find({
    DistrictName: DistrictName,
  });
  if (property) {
    res.status(200).json(property);
  } else {
    res.status(400);
  }
});

const getProperty = asyncHandler(async (req, res) => {
  const { Id } = req.params;
  if (!Id) {
    return res.status(400);
  }
  const property = await Property.findOne({ _id: Id });
  if (property) {
    const PropertyInfo = {
      property: property,
      transactionFormat: transactionInfo[property.PropertyType],
    };
    res.status(200).json(PropertyInfo);
  } else {
    res.status(404).json("Property not found!");
  }
});

const disposeProperty = asyncHandler(async (req, res) => {
  const result = await Property.findOneAndUpdate(
    { _id: req.body.Id },
    { $set: { Disposed: true } }
  );
  if (result.modifiedCount) {
    res.status(200).json("Operation successful");
  } else {
    res.status(400).json("Something went wrong");
  }
});
const uploadDocument = asyncHandler(async (req, res) => {
  const document = await Document.create({
    PropertyId: req.body.PropertyId,
    DocumentType: req.body.DocumentType,
    RefNo: req.body.RefNo,
    Date: req.body.Date,
    OriginalName: req.file.originalname,
    Encoding: req.file.encoding,
    MimeType: req.file.mimetype,
    Destination: req.file.destination,
    FileName: req.file.filename,
    Path: req.file.path,
    Size: req.file.size,
  });
  if (document) {
    res.status(200).json(document);
  } else {
    res.status(400).json("Something went wrong");
  }
});

module.exports = {
  registerProperty,
  getAllProperty,
  uploadDocument,
  disposeProperty,
  getProperty,
  getBranchProperty,
  getDistrictProperty,
};

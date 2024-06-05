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
  const property = await Property.create({
    ...propertyData,
    BranchName: req.user.BranchName,
    DistrictName: req.user.DistrictName,
    Region: req.user.Region,
  });
  if (property) {
    res.status(200).json(property);
  } else {
    res.status(400);
  }
});
const addReEstimation = asyncHandler(async (req, res) => {
  console.log(req.body);
  const property = await Property.findOne({ _id: req.body.PropertyId });
  if (property) {
    const existingReEstimations = property.ReEstimation;
    const newReEstimation = {
      EstimationDate: req.body.EstimationDate,
      EstimationValue: req.body.EstimationValue,
    };
    const totalReEstimation = [...existingReEstimations, newReEstimation];
    property.ReEstimation = totalReEstimation;
    await property.save();
    res.status(200).json({ message: "Success" });
  } else {
    res.status(404).json({ message: "Property not found" });
  }
});
const getReEstimations = asyncHandler(async (req, res) => {
  const property = await Property.findOne({ _id: req.params.Id });
  if (property) {
    const ReEstimations = property.ReEstimation;
    console.log(ReEstimations);

    res.status(200).json(ReEstimations);
  } else {
    res.status(404).json({ message: "Property not found" });
  }
});
const getAllProperty = asyncHandler(async (req, res) => {
  let property;
  if (req.user?.role === "District") {
    property = await Property.find({ DistrictName: req.user?.DistrictName });
  } else if (req.user?.role === "Branch") {
    property = await Property.find({ BranchName: req.user?.BranchName });
  } else if (req.user?.role === "Region") {
    property = await Property.find({ Region: req.user?.Region });
  } else {
    property = await Property.find();
  }
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

const updateProperty = asyncHandler(async (req, res) => {
  const result = await Property.findOneAndUpdate(
    { _id: req.params.Id },
    { $set: req.body }
  );
  if (result.modifiedCount) {
    res.status(200).json("Operation successful");
  } else {
    res.status(400).json("Something went wrong");
  }
});
const uploadDocument = asyncHandler(async (req, res) => {
  const document = await Document.create({
    ...req.body,
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
const getDocument = asyncHandler(async (req, res) => {
  const document = await Document.find({ PropertyId: req.params.Id });
  if (document) {
    res.status(200).json(document);
  } else {
    res.status(400).json("Something went wrong");
  }
});
const getDocuments = asyncHandler(async (req, res) => {
  const document = await Document.find();
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
  updateProperty,
  getProperty,
  getBranchProperty,
  getDistrictProperty,
  getDocument,
  getDocuments,
  addReEstimation,
  getReEstimations,
};

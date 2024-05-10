const Property = require("../models/propertyModel");
const asyncHandler = require("express-async-handler");
const Document = require("../models/documentModel");
const transactionInfo = require("../transactionInfo.json");
const registerProperty = asyncHandler(async (req, res) => {
  const property = await Property.create({
    PropertyType: req.body.PropertyType,
    CollateralType: req.body.CollateralType,
    LHCNumber: req.body.LHCNumber,
    ChassisNumber: req.body.ChassisNumber,
    EngineNumber: req.body.EngineNumber,
    ManufactureYear: req.body.ManufactureYear,
    ModelNumber: req.body.ModelNumber,
    SerialNumber: req.body.SerialNumber,
    UniqueParcelNumber: req.body.UniqueParcelNumber,
    ParcelArea: req.body.ParcelArea,
    OwnerBorrowerName: req.body.OwnerBorrowerName,
    AddressInBank: req.body.AddressInBank,
    AcquisitionDate: req.body.AcquisitionDate,
    AcquisitionValue: req.body.AcquisitionValue,
    PrincipaleAcquistion: req.body.PrincipaleAcquistion,
    InterestAcquisition: req.body.InterestAcquisition,
    FurnitureList: req.body.FurnitureList,
    Disposed: req.body.Disposed,
    Disposal: req.body.Disposal,
    ReEstimation: req.body.ReEstimation,
    InsuranceRenewal: req.body.InsuranceRenewal,
    PropertyAddress: req.body.PropertyAddress,
    BranchName: req.body.BranchName,
    DistrictName: req.body.DistrictName,
  });
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

const getProperty = asyncHandler(async (req, res) => {
  const property = await Property.findOne({ _id: req.query.Id });
  if (property) {
    const PropertyInfo = {
      property: property,
      transactionFormat: transactionInfo[property.PropertyType],
    };
    res.status(200).json(PropertyInfo);
  } else {
    res.status(400);
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
};

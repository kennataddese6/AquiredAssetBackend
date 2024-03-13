const Property = require("../models/propertyModel");
const asyncHandler = require("express-async-handler");

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
    Document: req.body.Document,
  });
  if (property) {
    res.status(200).json(property);
  } else {
    res.status(400);
  }
});

module.exports = {
  registerProperty,
};

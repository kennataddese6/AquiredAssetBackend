const mongoose = require("mongoose");
const DisposalSchema = new mongoose.Schema({
  DisposalType: {
    type: String,
    // required: [true, "Please add a Postpone value"],
  },
  IncomeGenerated: {
    type: String,
    // required: [true, "Please add an IncomeGenereated"],
  },
});
const EstimationSchema = new mongoose.Schema({
  EstimationDate: {
    type: Date,
    // required: [true, "Please add a Estimation Date"],
  },
  EstimationValue: {
    type: String,
    // required: [true, "Please add a Estimation value"],
  },
});
const InsuranceRenewalSchema = new mongoose.Schema({
  RenewalStartDate: {
    type: Date,
    // required: [true, "Please add an Insurance Renewal Start Date"],
  },
  RenewalEndDate: {
    type: Date,
    // required: [true, "Please add an Insurance Renewal End Date"],
  },
});

const AddressSchema = new mongoose.Schema({
  Region: {
    type: String,
    // required: [true, "Please add a Region"],
  },
  CityAdmin: {
    type: String,
    // required: [true, "Please add a CIty Admin"],
  },
  Zone: {
    type: String,
    // required: [true, "Please add a Zone"],
  },
  City: {
    type: String,
    // required: [true, "Please add a CIty"],
  },
  SubCity: {
    type: String,
    // required: [true, "Please add a SubCity"],
  },
  Woreda: {
    type: String,
    // required: [true, "Please add a Woreda"],
  },
  Kebele: {
    type: String,
    // required: [true, "Please add a Kebele"],
  },
  HouseNo: {
    type: String,
    // required: [true, "Please add a House Number"],
  },
});
const PropertySchema = mongoose.Schema(
  {
    PropertyType: {
      type: String,
      // required: [true, "Please add a Property type"],
    },
    Quarter: {
      type: Number,
      // required: [true, "Please add a Property type"],
    },
    Region: {
      type: String,
      // required: [true, "Please add a Branch Name"],
    },
    BranchName: {
      type: String,
      // required: [true, "Please add a Branch Name"],
    },
    DistrictName: {
      type: String,
      // required: [true, "Please add a District Name"],
    },
    CollateralType: {
      type: String,
      // required: [true, "Please add a CollateralType"],
    },
    CollateralCategory: {
      type: String,
      // required: [true, "Please add a CollateralType"],
    },
    LHCNumber: {
      type: String,
      // required: [true, "Please add an LHC Number"],
    },
    ChassisNumber: {
      type: String,
      // required: [true, "Please add a Chassis Number"],
    },
    EngineNumber: {
      type: String,
      // required: [true, "Please add Engine Number"],
    },
    ManufactureYear: {
      type: String,
      // required: [true, "Please add a Manufacture Year"],
    },
    ModelNumber: {
      type: String,
      // required: [true, "Please add a Model Number"],
    },
    SerialNumber: {
      type: String,
      // required: [true, "Please add a Serial Number"],
    },
    UniqueParcelNumber: {
      type: Number,
      // required: [true, "Please add a Unique Parcel Number"],
    },
    ParcelArea: {
      type: Number,
      // required: [true, "Please add a Parcel Area"],
    },
    OwnerBorrowerName: {
      type: String,
      // required: [true, "Please add an Owner/Borrower Name"],
    },
    AddressInBank: {
      type: String,
      // required: [true, "Please add an Address In Bank"],
    },
    AcquisitionDate: {
      type: Date,
      // required: [true, "Please add a Acquisition Date"],
    },
    AcquisitionValue: {
      type: Number,
      // required: [true, "Please add an Acquisition Value"],
    },
    PrincipaleAcquistion: {
      type: String,
      // required: [true, "Please add a Principale Acquistion"],
    },
    InterestAcquisition: {
      type: String,
      // required: [true, "Please add an Interest Acquisition"],
    },
    FurnitureList: {
      type: [Object],
      // required: [true, "Please add a  Furniture List"],
    },
    Remark: {
      type: String,
    },
    Disposed: {
      type: Boolean,
      // required: [true, "Please add a Disposal Status"],
    },
    Status: {
      type: String,
      default: "Active",
      // required: [true, "Please add a Disposal Status"],
    },

    Disposal: {
      type: DisposalSchema,
      // required: [true, "Please add a Disposal"],
    },
    ReEstimation: {
      type: [EstimationSchema],
      default: [],
      // required: [true, "Please add a Re-estimation"],
    },
    InsuranceRenewal: {
      type: [InsuranceRenewalSchema],
      // required: [true, "Please add Insurance Renewal"],
    },
    PropertyAddress: {
      type: AddressSchema,
      // required: [true, "Please add a Property Address"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property", PropertySchema);

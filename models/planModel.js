const mongoose = require("mongoose");

const PlanSchema = mongoose.Schema(
  {
    PropertyId: {
      type: String,
      require: [true, "Please add a Property Id"],
    },
    Type: {
      type: String,
      require: String,
    },
    Region: {
      type: String,
      require: [true, "Please add a Region"],
    },
    BranchName: {
      type: String,
      require: [true, "Please add a Property Branch Name"],
    },
    DistrictName: {
      type: String,
      require: [true, "Please add a Property District Name"],
    },
    Quarter: {
      type: Number,
      require: [true, "Please a Quarter"],
    },
    DisposedType: {
      type: String,
    },
    Year: {
      type: Number,
      require: [true, "Please add a year"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Plan", PlanSchema);

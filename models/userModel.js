const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    cn: {
      type: String,
    },
    mail: {
      type: String,
    },
    role: {
      type: String,
    },
    employeeID: {
      type: String,
    },
    BranchName: {
      type: String,
    },
    DistrictName: {
      type: String,
    },
    Region: {
      type: String,
    },
    secretKey: {
      type: String,
      default: process.env.SECRET_KEY,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

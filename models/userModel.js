const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    UserName: {
      type: String,
    },
    Mail: {
      type: String,
    },
    Role: {
      type: String,
    },
    EmployeeID: {
      type: String,
    },
    Title: {
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
    Status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

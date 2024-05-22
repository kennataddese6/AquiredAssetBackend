const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    mail: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
    },
    BranchName: {
      type: String,
    },
    DistrictName: {
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

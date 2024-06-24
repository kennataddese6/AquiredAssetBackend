const mongoose = require("mongoose");

const authSchema = mongoose.Schema(
  {
    userName: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Auth", authSchema);

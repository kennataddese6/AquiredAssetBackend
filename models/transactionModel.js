const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema(
  {
    PropertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      require: [true, "Please add a Property Id"],
    },
    BranchName: {
      type: String,
      require: [true, "Please add a Property Branch Name"],
    },
    DistrictName: {
      type: String,
      require: [true, "Please add a Property District Name"],
    },
    TransactionId: {
      type: String,
      // require: [true, "please add a Transaction Id"],
    },
    TransactionCategory: {
      type: String,
      require: [true, "please add a Transaction Category"],
    },
    TransactionType: {
      type: String,
      require: [true, "please add a Transaction type"],
    },
    TransactionDate: {
      type: Date,
      require: [true, "please add a Transaction Date"],
    },
    TransactionValue: {
      type: Number,
      require: [true, "please add a Transaction Value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", TransactionSchema);

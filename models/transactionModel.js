const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema(
  {
    PropertyId: {
      type: String,
      require: [true, "Please add a Property Id"],
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

const mongoose = require("mongoose");

const AuctionSchema = mongoose.Schema({
  PropertyId: {
    type: String,
    require: [true, "Please add a Property Id"],
  },
  Region: {
    type: String,
    // require: [true, "Please add a Property Id"],
  },
  DistrictName: {
    type: String,
    // require: [true, "Please add a Property Id"],
  },
  BranchName: {
    type: String,
    // require: [true, "Please add a Property Id"],
  },
  AuctionMinimalPrice: {
    type: Number,
    require: [true, "Please add an Auction minimal price"],
  },
  AuctionSubmissionDate: {
    type: Date,
    require: [true, "Please add an Auction Submission date"],
  },
  AuctionOpeningDate: {
    type: Date,
    require: [true, "Please add an Auction opening date"],
  },
  AuctionResult: {
    type: String,
    // require: [true, "Please add an Auction Result"],
  },
  AuctionSellPrice: {
    type: Number,
    // require: [true, "Please add an Auction Sell Price"],
  },
  Vat: {
    type: String,
    // require: [true, "Please add an Auction Loss value"],
  },
});

module.exports = mongoose.model("Auction", AuctionSchema);

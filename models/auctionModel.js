const mongoose = require("mongoose");
const AuctionSchema = mongoose.Schema({
  PropertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
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
  MinimalPrice: {
    type: Number,
    require: [true, "Please add an Auction minimal price"],
  },
  SubmissionDate: {
    type: Date,
    require: [true, "Please add an Auction Submission date"],
  },
  OpeningDate: {
    type: Date,
    require: [true, "Please add an Auction opening date"],
  },
  Status: {
    type: String,
    default: "Open",
    // require: [true, "Please add an Auction Result"],
  },
  SoldPrice: {
    type: Number,
    // require: [true, "Please add an Auction Sell Price"],
  },
  Vat: {
    type: String,
    // require: [true, "Please add an Auction Loss value"],
  },
});

module.exports = mongoose.model("Auction", AuctionSchema);

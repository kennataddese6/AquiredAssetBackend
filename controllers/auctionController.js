const Auction = require("../models/auctionModel");
const asyncHandler = require("express-async-handler");

const createAuction = asyncHandler(async (req, res) => {
  const auction = await Auction.create({
    PropertyId: req.body.PropertyId,
    AuctionMinimalPrice: req.body.AuctionMinimalPrice,
    AuctionSubmissionDate: req.body.AuctionSubmissionDate,
    AuctionOpeningDate: req.body.AuctionOpeningDate,
    AuctionResult: req.body.AuctionResult,
    AuctionSellPrice: req.body.AuctionSellPrice,
    AuctionProfitValue: req.body.AuctionProfitValue,
    AuctionLossValue: req.body.AuctionLossValue,
    Region: req.user.Region,
    DistrictName: req.user.DistrictName,
    BranchName: req.user.BranchName,
  });
  if (auction) {
    res.status(200).json(auction);
  } else {
    res.status(400);
  }
});
const getAllAuctions = asyncHandler(async (req, res) => {
  let auction;
  if (req.user.role === "District") {
    auction = await Auction.find({ DistrictName: req.user.DistrictName });
  } else if (req.user.role === "Branch") {
    auction = await Auction.find({ BranchName: req.user.BranchName });
  } else if (req.user.role === "Region") {
    auction = await Auction.find({ Region: req.user.Region });
  } else {
    auction = await Auction.find();
  }
  if (auction) {
    res.status(200).json(auction);
  } else {
    res.status(400);
  }
});
const getAuctions = asyncHandler(async (req, res) => {
  const auction = await Auction.find({ PropertyId: req.params.Id });
  if (auction) {
    res.status(200).json(auction);
  } else {
    res.status(400);
  }
});

module.exports = {
  createAuction,
  getAllAuctions,
  getAuctions,
};

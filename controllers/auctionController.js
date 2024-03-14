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
  });
  if (auction) {
    res.status(200).json(auction);
  } else {
    res.status(400);
  }
});
const getAllAuctions = asyncHandler(async (req, res) => {
  const auction = await Auction.find();
  if (auction) {
    res.status(200).json(auction);
  } else {
    res.status(400);
  }
});

module.exports = {
  createAuction,
  getAllAuctions,
};

const Auction = require("../models/auctionModel");
const asyncHandler = require("express-async-handler");

const createAuction = asyncHandler(async (req, res) => {
  const auction = await Auction.create({
    ...req.body,
    Region: req?.user?.Region,
    DistrictName: req?.user?.DistrictName,
    BranchName: req?.user?.BranchName,
  });
  if (auction) {
    res.status(200).json(auction);
  } else {
    res.status(400);
  }
});
const getAllAuctions = asyncHandler(async (req, res) => {
  let auction;
  if (req.user.Role === "District") {
    auction = await Auction.find({ DistrictName: req.user.DistrictName });
  } else if (req.user.Role === "Branch") {
    auction = await Auction.find({ BranchName: req.user.BranchName });
  } else if (req.user.Role === "Region") {
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
const updateAuction = asyncHandler(async (req, res) => {
  try {
    const updatedAuction = await Auction.findByIdAndUpdate(
      req.params.Id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json(updatedAuction);
  } catch (error) {
    console.error("Error updating auction:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = {
  createAuction,
  getAllAuctions,
  getAuctions,
  updateAuction,
};

const asyncHandler = require("express-async-handler");
const Plan = require("../models/planModel");

const createPlan = asyncHandler(async (req, res) => {
  const plan = await Plan.create({
    ...req.body,
    BranchName: req.user.BranchName,
    DistrictName: req.user.DistrictName,
    Region: req.user.Region,
  });
  if (plan) {
    res.status(200).json({ message: "Plan created" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
});

module.exports = {
  createPlan,
};

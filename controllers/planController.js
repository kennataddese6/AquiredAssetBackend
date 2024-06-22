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

const getPlan = asyncHandler(async (req, res) => {
  const plan = await Plan.find({ PropertyId: req.params.Id });
  if (plan) {
    res.status(200).json(plan);
  } else {
    res.status(400).json({ message: "Not found" });
  }
});
const getPlans = asyncHandler(async (req, res) => {
  let plans;
  if (req.user?.role === "District") {
    plans = await Plan.find({ DistrictName: req.user?.DistrictName });
  } else if (req.user?.role === "Branch") {
    plans = await Plan.find({ BranchName: req.user?.BranchName });
  } else if (req.user?.role === "Region") {
    plans = await Plan.find({ Region: req.user?.Region });
  } else {
    plans = await Plan.find();
  }
  if (plans) {
    res.status(200).json(plans);
  } else {
    res.status(400);
  }
});

module.exports = {
  createPlan,
  getPlans,
  getPlan,
};

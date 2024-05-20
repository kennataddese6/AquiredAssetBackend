const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const ad = require("../config/ad");

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json("Not authorized");
    return;
  }
  const secret = process.env.JWT_SECRET || "ThisIsAVerySillyKeyToDo";
  const decoded = jwt.verify(token, secret);
  const mail = decoded.mail;
  if (!mail) {
    res.status(404).json("Something went wrong");
    return;
  }
  ad.findUser({ attributes: ["*"] }, mail, (err, user) => {
    if (user) {
      const BranchName = user.department;
      const DistrictName = user.company;
      req.body.BranchName = BranchName;
      req.body.DistrictName = DistrictName;
      req.params.BranchName = BranchName;
      req.params.DistrictName = DistrictName;
      if (DistrictName.includes("District Facilities Management Support")) {
        req.body.view = "District";
      }
      next();
    } else {
      res.status(400).json("User not found");
    }
  });
});

module.exports = { protect };

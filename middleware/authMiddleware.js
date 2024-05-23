const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const ad = require("../config/ad");
const User = require("../models/userModel");
const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json("Not authorized");
    return;
  }
  const secret = process.env.JWT_SECRET || "ThisIsAVerySillyKeyToDo";

  try {
    const decoded = jwt.verify(token, secret);
    const mail = decoded.mail;
    if (!mail) {
      res.status(404).json("Something went wrong");
      return;
    }
    const localUser = await User.findOne({
      mail: { $regex: new RegExp("^" + mail + "$", "i") },
    });
    if (localUser) {
      req.body.role = localUser.role;
    }
    ad.findUser({ attributes: ["*"] }, mail, (err, user) => {
      if (user) {
        const BranchName = user.department;
        const DistrictName = user.company;
        req.body.BranchName = BranchName;
        req.body.DistrictName = DistrictName;
        req.params.BranchName = BranchName;
        req.params.DistrictName = DistrictName;

        next();
      } else {
        res.status(400).json("User not found");
      }
    });
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json("Token has expired. Please log in again.");
    } else if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).json("Token is invalid. Please log in again.");
    }
  }
});

module.exports = { protect };

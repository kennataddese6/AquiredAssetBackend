const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json("Not authorized");
    return;
  }
  const secret = process.env.JWT_SECRET;
  try {
    req.user = await User.findOne({
      Mail: {
        $regex: new RegExp("^" + jwt.verify(token, secret).Mail + "$", "i"),
      },
    });
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json("Token has expired. Please log in again.");
    } else if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).json("Token is invalid. Please log in again.");
    }
  }
});

module.exports = { protect };

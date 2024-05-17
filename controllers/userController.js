const ad = require("../config/ad");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const generateToken = (mail) =>
  jwt.sign({ mail }, process.env.JWT_SECRET || "ThisIsAVerySillyKeyToDo", {
    expiresIn: "30d",
    // expiresIn: 1,
    // expiresIn: "10s",
  });

const login = asyncHandler(async (req, res) => {
  try {
    const { mail, password } = req.body;
    ad.findUser({ attributes: ["*"] }, mail, (err, user) => {
      if (user) {
        ad.authenticate(user?.mail, password, async (err, auth) => {
          if (auth) {
            res.cookie("token", generateToken(mail));
            res.status(200).json(user);
          } else {
            res.status(400).json("Incorrect username or password");
          }
        });
      } else {
        res.status(400).json("User not found");
      }
    });
  } catch (error) {
    console.log(error);
  }
});
const getMe = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies.token;
    const secret = process.env.JWT_SECRET || "ThisIsAVerySillyKeyToDo";
    const decoded = jwt.verify(token, secret);

    // Extract the mail
    const mail = decoded.mail;
    ad.findUser({ attributes: ["*"] }, mail, (err, user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(400).json("User not found");
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  login,
  getMe,
};

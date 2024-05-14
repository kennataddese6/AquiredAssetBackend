const ad = require("../config/ad");
const asyncHandler = require("express-async-handler");

const login = asyncHandler(async (req, res) => {
  try {
    const { mail, password } = req.body;
    ad.findUser({ attributes: ["*"] }, mail, (err, user) => {
      if (user) {
        ad.authenticate(user?.mail, password, async (err, auth) => {
          if (auth) {
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

module.exports = {
  login,
};

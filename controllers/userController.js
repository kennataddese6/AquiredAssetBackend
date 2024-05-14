const ad = require("../config/ad");
const asyncHandler = require("express-async-handler");

const login = asyncHandler(async (req, res) => {
  try {
    const { mail, password } = req.body;
    ad.findUser({ attributes: ["*"] }, mail, (err, user) => {
      if (err) {
        res.status(500).json({ message: "Error retrieving user data" });
        return;
      }
      if (user) {
        ad.authenticate(mail, password, async (err, auth) => {
          if (err) {
            throw new Error(err);
          }
          if (!auth) {
            throw new Error("Incorrect username or password");
          } else if (user) {
            res.status(200).json(user);
          }
        });
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = {
  login,
};

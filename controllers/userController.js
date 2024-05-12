const ad = require("../config/ad");
const asyncHandler = require("express-async-handler");

const login = asyncHandler(async (req, res) => {
  try {
    const { mail, password } = req.body;
    ad.findUser(mail, (err, user) => {
      if (err) {
        return err;
      }
      ad.authenticate(mail, password, async (err, auth) => {
        if (err) {
          console.log("error");
          return err;
        }
        if (auth) {
          console.log("This is user", user, auth);
          res.status(200).json(user);
        } else {
          return "Invalid email or password";
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = {
  login,
};

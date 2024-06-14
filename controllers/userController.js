const ad = require("../config/ad");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const generateToken = (mail) =>
  jwt.sign({ mail }, process.env.JWT_SECRET || "ThisIsAVerySillyKeyToDo", {
    expiresIn: "7d",
  });

const createUser = asyncHandler(async (req, res) => {
  const userExist = await User.findOne({ mail: req.body.mail });
  if (userExist) {
    return res.status(400).json({ message: "User already exist" });
  }
  const createdUser = await User.create(req.body);
  if (createdUser) {
    res.status(200).json({ message: "User Created" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { mail } = req.body;
  const user = await User.findOne({ mail: mail });
  if (user) {
    const deletedUser = await User.deleteOne({ mail: mail });
    if (deletedUser.deletedCount > 0) {
      res.status(200).json({ message: "user deleted successfully" });
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } else {
    res.status(404).json({ message: "user not found" });
  }
});
const updateUser = asyncHandler(async (req, res) => {
  const { Id } = req.params;
  const user = await User.findOne({ Id: _id });
  if (user) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: Id },
      { $set: req.body }
    );
    if (updatedUser) {
      res.status(200).json({ message: "user deleted successfully" });
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await User.findOne({
      mail: { $regex: new RegExp("^" + mail + "$", "i") },
    });
    if (user) {
      ad.authenticate(
        user.mail + process.env.DOMAIN,
        password,
        async (err, auth) => {
          if (auth) {
            res.cookie("token", generateToken(mail), {
              domain: "vgf59b03-5000.uks1.devtunnels.ms",
              sameSite: "None",
              path: "/",
              secure: true,
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            });

            res.status(200).json(user);
          } else {
            res.status(400).json("Incorrect username or password");
          }
        }
      );
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
  }
});
const getMe = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  const secret = process.env.JWT_SECRET || "ThisIsAVerySillyKeyToDo";
  const decoded = jwt.verify(token, secret);
  const mail = decoded.mail;
  const user = await User.findOne({
    mail: { $regex: new RegExp("^" + mail + "$", "i") },
  });
  if (user) {
    res.status(200).json(user);
  } else {
    res.sendStatus(400);
  }
});

const findUser = asyncHandler(async (req, res) => {
  ad.findUser({ attributes: ["*"] }, req.query.mail, (err, user) => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json("User not found");
    }
  });
});

const logout = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("token", {
      domain: "vgf59b03-5000.uks1.devtunnels.ms",
      sameSite: "None",
      path: "/",
      secure: true,
    });
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out" });
  }
});

module.exports = {
  login,
  getMe,
  findUser,
  logout,
  createUser,
  updateUser,
  deleteUser,
  getUsers,
};

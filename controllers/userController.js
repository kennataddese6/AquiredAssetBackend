const ad = require("../config/ad");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { json } = require("express");

const generateToken = (mail) =>
  jwt.sign({ mail }, process.env.JWT_SECRET || "ThisIsAVerySillyKeyToDo", {
    expiresIn: "1h",
  });

const createUser = asyncHandler(async (req, res) => {
  const { mail, role, employeeId, cn, BranchName, DistrictName } = req.body;
  const userExist = await User.findOne({ mail: mail });
  if (userExist) {
    return res.status(400).json({ message: "User already exist" });
  }
  ad.findUser({ attributes: ["*"] }, mail, async (err, user) => {
    if (user) {
      const createdUser = await User.create({
        mail,
        role,
        employeeId,
        cn,
        BranchName,
        DistrictName,
      });
      if (createdUser) {
        res.status(200).json({ message: "User Created" });
      } else {
        res.status(400).json({ message: "Something went wrong" });
      }
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { mail, role } = req.body;
  const user = await User.findOne({ mail: mail });
  if (user) {
    const updatedUser = await User.findOneAndUpdate(
      { mail: mail },
      { $set: { role: role } },
      { new: true }
    );
    if (updatedUser) {
      res.status(200).json({ message: "user updated successfully" });
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } else {
    res.status(404).json({ message: "user not found" });
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

const login = asyncHandler(async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await User.findOne({ mail: mail });
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
  const user = await User.findOne({ mail: mail });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
  }
});

const findUser = asyncHandler(async (req, res) => {
  ad.findUser({ attributes: ["*"] }, req.query.mail, (err, user) => {
    if (user) {
      console.log(
        user.department.includes("District Facilities Management Support")
      );
      res.status(200).json(user);
    } else {
      res.status(400).json("User not found");
    }
  });
});

const logout = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.error(error);
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

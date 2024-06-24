const asyncHandler = require("express-async-handler");
const Auth = require("../models/authModel");
const bcrypt = require("bcrypt");

const secure = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.setHeader("WWW-Authenticate", "Basic");
    return res.status(401).send("Authentication required.");
  }

  try {
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    const [userName, password] = credentials.split(":");

    if (!userName || !password) {
      return res.status(401).json({ message: "Provide Credentials" });
    }

    const user = await Auth.findOne({ userName });
    if (user && (await bcrypt.compare(password, user.password))) {
      next();
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { secure };

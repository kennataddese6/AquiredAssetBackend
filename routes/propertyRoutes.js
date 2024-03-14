const express = require("express");
const router = express.Router();

const {
  registerProperty,
  getAllProperty,
} = require("../controllers/propertyController");

router.route("/").post(registerProperty).get(getAllProperty);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  registerProperty,
  getAllProperty,
} = require("../controllers/propertyController");

router.post("/", registerProperty).get(getAllProperty);

module.exports = router;

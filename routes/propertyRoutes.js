const express = require("express");
const router = express.Router();

const { registerProperty } = require("../controllers/propertyController");
router.post("/", registerProperty);

module.exports = router;

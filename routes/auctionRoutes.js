const express = require("express");
const router = express.Router();

const {
  createAuction,
  getAllAuctions,
} = require("../controllers/auctionController");

router.route("/").post(createAuction).get(getAllAuctions);

module.exports = router;

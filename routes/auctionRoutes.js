const express = require("express");
const router = express.Router();

const {
  createAuction,
  getAllAuctions,
} = require("../controllers/auctionController");

router.post("/", createAuction);
router.get("/", getAllAuctions);

module.exports = router;

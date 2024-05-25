const express = require("express");
const router = express.Router();

const {
  createAuction,
  getAllAuctions,
  getAuctions,
} = require("../controllers/auctionController");

router.get("/:Id", getAuctions);
router.route("/").post(createAuction).get(getAllAuctions);

module.exports = router;

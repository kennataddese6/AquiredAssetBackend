const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createAuction,
  getAllAuctions,
  getAuctions,
  updateAuction,
} = require("../controllers/auctionController");

router.route("/:Id").get(protect, getAuctions).patch(protect, updateAuction);
router.route("/").post(protect, createAuction).get(protect, getAllAuctions);

module.exports = router;

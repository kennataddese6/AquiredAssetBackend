const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createAuction,
  getAllAuctions,
  getAuctions,
} = require("../controllers/auctionController");

router.get("/:Id", getAuctions);
router.route("/").post(createAuction).get(protect, getAllAuctions);

module.exports = router;

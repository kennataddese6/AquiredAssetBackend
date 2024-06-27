const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { validator } = require("../middleware/validator");
const {
  createAuction,
  getAllAuctions,
  getAuctions,
  updateAuction,
} = require("../controllers/auctionController");

router
  .route("/:Id")
  .get(protect, getAuctions)
  .patch(validator, protect, updateAuction);
router
  .route("/")
  .post(validator, protect, createAuction)
  .get(protect, getAllAuctions);

module.exports = router;

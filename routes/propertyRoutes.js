const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { validator } = require("../middleware/validator");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "../uploads");
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
const {
  registerProperty,
  getAllProperty,
  uploadDocument,
  getProperty,
  disposeProperty,
  getBranchProperty,
  getDistrictProperty,
} = require("../controllers/propertyController");

router.route("/").post(validator, registerProperty).get(getAllProperty);
router.route("/dispose").post(validator, disposeProperty);
router.route("/branch/:BranchName").get(validator, getBranchProperty);
router.route("/district/:DistrictName").get(validator, getDistrictProperty);
router.route("/:Id").get(validator, getProperty);
router.post("/document", upload.single("file"), validator, uploadDocument);
module.exports = router;

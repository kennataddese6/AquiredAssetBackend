const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { validator } = require("../middleware/validator");
const { protect } = require("../middleware/authMiddleware");
const { secure } = require("../middleware/secureChannel");
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

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

const {
  registerProperty,
  getAllProperty,
  uploadDocument,
  getProperty,
  updateProperty,
  getBranchProperty,
  getDistrictProperty,
  getDocument,
  getDocuments,
  addReEstimation,
  getReEstimations,
} = require("../controllers/propertyController");

router
  .route("/")
  .post(validator, protect, registerProperty)
  .get(protect, getAllProperty);
router.route("/:Id").patch(validator, updateProperty);
router.route("/re-estimation/").post(validator, addReEstimation);
router.route("/re-estimation/:Id").get(getReEstimations);
router.route("/branch/").get(validator, protect, getBranchProperty);
router.route("/district/").get(validator, protect, getDistrictProperty);
router.route("/:Id([0-9a-fA-F]{24})").get(secure, validator, getProperty);
router.post("/document", upload.single("file"), validator, uploadDocument);
router.get("/document", getDocuments);
router.get("/document/:Id", getDocument);
module.exports = router;

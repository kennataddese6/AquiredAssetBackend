const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
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
} = require("../controllers/propertyController");

router.route("/").post(registerProperty).get(getProperty);
router.route("/all").get(getAllProperty);
router.route("/dispose").post(disposeProperty);

router.post("/document", upload.single("file"), uploadDocument);
module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "C://Users/KennaTaddese.CBE/Documents");
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
} = require("../controllers/propertyController");

router.route("/").post(registerProperty).get(getAllProperty);

router.post("/document", upload.single("file"), uploadDocument);
module.exports = router;

const mongoose = require("mongoose");

const DocumentSchema = mongoose.Schema({
  PropertyId: {
    type: String,
    require: [true, "Please add a Property Id"],
  },
  OriginalName: {
    type: String,
    require: [true, "Please add an Original Name"],
  },
  Encoding: {
    type: String,
    require: [true, "Please add an Encoding"],
  },
  MimeType: {
    type: String,
    require: [true, "Please add an Mime Type"],
  },
  Destination: {
    type: String,
    require: [true, "Please add a Destination"],
  },
  FileName: {
    type: String,
    require: [true, "Please add an File Name"],
  },
  Path: {
    type: String,
    require: [true, "Please add a Path"],
  },
  Size: {
    type: Number,
    require: [true, "Please add a size"],
  },
  DocumentType: {
    type: String,
    // required: [true, "Please add a Document type"],
  },
  RefNo: {
    type: String,
    // required: [true, "Please add a Reference Number"],
  },
  Date: {
    type: Date,
    // required: [true, "Please add a Date"],
  },
});

module.exports = mongoose.model("Document", DocumentSchema);

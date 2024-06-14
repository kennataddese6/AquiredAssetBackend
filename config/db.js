const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const MONGO_URI =
      "mongodb+srv://Kenna:Welcome2cbe@cluster0.jdtosny.mongodb.net/aquiredAsset";
    const conn = await mongoose.connect(MONGO_URI, {
      family: 4,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;

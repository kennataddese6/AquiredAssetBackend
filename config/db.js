const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const MONGO_URI =
      "mongodb+srv://Kenna:Welcome2cbe@cluster0.jdtosny.mongodb.net/aquiredAsset";
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;

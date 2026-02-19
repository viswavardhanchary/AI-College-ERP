const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

const DBConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected!");
  }catch(e) {
    console.log("Error in MongoDB Connection!" + e);
  }
}

module.exports = DBConnection;
const mongoose = require("mongoose");
require("dotenv").config();

async function ConnectDatabase() {
  try {
    await mongoose.connect(process.env.DB_URI);
    
  } catch (error) {
    console.log(error);
  }
}

module.exports = ConnectDatabase;

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;
const leadRoutes = require("./routes/leadsRoutes");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();
const app = express();

// middlewares
app.use(express.json());

async function ConnectDatabase(){
  await mongoose.connect('')
}

// routes
app.use(leadRoutes);

app.use(errorHandler); // error handling middleware

app.listen(PORT, () => {
  console.log(`the app is running at port ${PORT} `);
});

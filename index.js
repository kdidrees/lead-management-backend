const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;
const leadRoutes = require("./routes/leadsRoutes");
const errorHandler = require("./middlewares/errorHandler");
const ConnectDatabase = require("./config/db");

dotenv.config();

// connecting the database
ConnectDatabase();

const app = express();

// middlewares
app.use(express.json());

// routes
app.use("/api", leadRoutes);

app.use(errorHandler); // error handling middleware

app.listen(PORT, () => {
  console.log(` server is running at port ${PORT} `);
});

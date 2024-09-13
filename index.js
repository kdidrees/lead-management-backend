const express = require("express");
const dotenv = require("dotenv");
const ConnectDatabase = require("./config/db");
const leadRoutes = require("./routes/dealsRoutes");
const pipelineRoutes = require("./routes/pipelineRoutes");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
ConnectDatabase()
  .then(() => {
    console.log("db connected ");
    // Import and execute the seeding script
    require("./utils/seedPipeline");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

// Routes
app.use("/api/deals", leadRoutes);
app.use("/api/pipelines", pipelineRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

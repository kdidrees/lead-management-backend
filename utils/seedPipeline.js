const mongoose = require("mongoose");
const pipelineModel = require("../models/pipelineSchema");
const ConnectDatabase = require("../config/db"); 
const defaultStages = [
  { name: "Qualified", order: 1 },
  { name: "Contact Made", order: 2 },
  { name: "Demo Scheduled", order: 3 },
  { name: "Proposal Made", order: 4 },
  { name: "Negotiations Started", order: 5 },
  { name: "Won", order: 6 },
  { name: "Lost", order: 7 },
];

const seedPipeline = async () => {
  try {
    const existingPipeline = await pipelineModel.findOne();
    if (!existingPipeline) {
      // Create and save the default pipeline
      const pipeline = new pipelineModel({ stages: defaultStages });
      await pipeline.save();
      console.log("Default pipeline created successfully.");
    } else {
      console.log("Default pipeline already exists.");
    }
  } catch (error) {
    console.error("Error seeding pipeline:", error);
  }
};

seedPipeline();
